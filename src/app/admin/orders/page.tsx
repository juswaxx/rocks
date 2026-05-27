"use client"

import { useEffect, useState } from 'react'
import { collectionGroup, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { Calendar, CreditCard, MapPin, Phone, Search, Store, User } from 'lucide-react'
import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useFirestore } from '@/firebase'
import { AdminOrder, AdminOrderStatus, DEMO_ADMIN_ORDERS, getRestaurantName, peso } from '@/lib/admin-demo'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const STATUSES: AdminOrderStatus[] = ['Pending', 'Preparing', 'Out for Delivery', 'Completed', 'Cancelled']

const statusStyle: Record<AdminOrderStatus, string> = {
  Pending: 'bg-amber-500',
  Preparing: 'bg-blue-500',
  'Out for Delivery': 'bg-violet-500',
  Completed: 'bg-green-600',
  Cancelled: 'bg-destructive',
}

type OrderWithRef = AdminOrder & { ref?: any }

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function AdminOrdersPage() {
  const db = useFirestore()
  const { toast } = useToast()
  const [orders, setOrders] = useState<OrderWithRef[]>(DEMO_ADMIN_ORDERS)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!db) return

    const ordersQuery = query(collectionGroup(db, 'orders'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const liveOrders = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            ...data,
            id: doc.id,
            ref: doc.ref,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now()),
          } as OrderWithRef
        })

        if (liveOrders.length > 0) {
          setOrders(liveOrders)
        }
        setLoading(false)
      },
      () => {
        setOrders(DEMO_ADMIN_ORDERS)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [db])

  const updateStatus = async (order: OrderWithRef, status: AdminOrderStatus) => {
    setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status } : item))

    if (!order.ref) {
      toast({ title: 'Demo order updated', description: 'Connect live Firebase orders to persist this change.' })
      return
    }

    try {
      await updateDoc(order.ref, { status })
      toast({ title: 'Order updated', description: `Order #${order.id.slice(0, 8)} is now ${status}.` })
    } catch {
      toast({ variant: 'destructive', title: 'Update failed', description: 'Firestore did not allow this status change.' })
    }
  }

  const filteredOrders = orders.filter((order) => {
    const haystack = `${order.id} ${order.customerName} ${order.customerPhone} ${order.deliveryAddress}`.toLowerCase()
    const matchesSearch = haystack.includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminShell>
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Order Management</h1>
        <p className="mt-2 text-muted-foreground">Verify payments, dispatch kitchen prep, and update delivery statuses.</p>
      </header>

      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by order, customer, phone, or address" className="h-11 rounded-lg pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading live orders...</p>}

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="rounded-lg">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black">Order #{order.id.toString().slice(0, 8)}</h2>
                    <Badge className={cn('border-none text-white', statusStyle[order.status])}>{order.status}</Badge>
                    <Badge variant="outline">{order.paymentMethod?.toUpperCase()}</Badge>
                  </div>
                  <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> {order.customerName}</span>
                    <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {order.customerPhone}</span>
                    <span className="flex items-center gap-2 md:col-span-2"><MapPin className="h-4 w-4" /> {order.deliveryAddress}</span>
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(order.createdAt)}</span>
                    <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> {order.paymentProofName || 'No proof required'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row xl:flex-col xl:items-end">
                  <p className="text-2xl font-black text-primary">{peso(order.totalAmount)}</p>
                  <Select value={order.status} onValueChange={(value) => updateStatus(order, value as AdminOrderStatus)}>
                    <SelectTrigger className="h-10 w-full rounded-lg sm:w-[190px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {order.items?.map((item, index) => (
                  <div key={`${order.id}-${index}`} className="rounded-lg border bg-muted/20 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold">{item.quantity}x {item.name}</p>
                        <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <Store className="h-3 w-3" />
                          {getRestaurantName(item.restaurantId)}
                        </p>
                      </div>
                      <span className="shrink-0 font-bold">{peso(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {order.paymentProofUrl && (
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-lg">
                  <a href={order.paymentProofUrl} target="_blank" rel="noreferrer">Open Payment Proof</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  )
}
