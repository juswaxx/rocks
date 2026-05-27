"use client"

import { collectionGroup, orderBy, query } from 'firebase/firestore'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Clock, CreditCard, PackageCheck, ReceiptText, Store, TrendingUp, Users } from 'lucide-react'
import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase'
import { ADMIN_EMAIL, DEMO_ADMIN_ORDERS, DEMO_ADMIN_USERS, AdminOrder, getRestaurantName, peso } from '@/lib/admin-demo'
import { RESTAURANTS } from '@/lib/restaurants'

function normalizeOrder(order: any): AdminOrder {
  return {
    ...order,
    createdAt: order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt || Date.now()),
  }
}

export default function AdminDashboard() {
  const db = useFirestore()
  const ordersQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collectionGroup(db, 'orders'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data } = useCollection<any>(ordersQuery)
  const orders = (data?.length ? data.map(normalizeOrder) : DEMO_ADMIN_ORDERS)

  const activeOrders = orders.filter((order) => !['Completed', 'Cancelled'].includes(order.status))
  const pendingPayments = orders.filter((order) => order.paymentMethod !== 'cod' && order.status === 'Pending').length
  const revenue = orders.filter((order) => order.status !== 'Cancelled').reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
  const customers = new Set(orders.map((order) => order.userId)).size || DEMO_ADMIN_USERS.length - 1

  const chartData = ['Pending', 'Preparing', 'Out for Delivery', 'Completed'].map((status) => ({
    status,
    orders: orders.filter((order) => order.status === status).length,
  }))

  const topRestaurants = RESTAURANTS.map((restaurant) => {
    const restaurantOrders = orders.filter((order) => order.items?.some((item) => item.restaurantId === restaurant.id))
    return {
      ...restaurant,
      orderCount: restaurantOrders.length,
      revenue: restaurantOrders.reduce((sum, order) => {
        const subtotal = order.items
          ?.filter((item) => item.restaurantId === restaurant.id)
          .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0) || 0
        return sum + subtotal
      }, 0),
    }
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 4)

  const stats = [
    { label: 'Today Revenue', value: peso(revenue), note: 'Across accepted orders', icon: TrendingUp },
    { label: 'Active Orders', value: activeOrders.length.toString(), note: 'Kitchen and delivery queue', icon: Clock },
    { label: 'Payment Checks', value: pendingPayments.toString(), note: 'GCash/bank proofs to verify', icon: CreditCard },
    { label: 'Customers', value: customers.toString(), note: 'Ordering accounts', icon: Users },
  ]

  return (
    <AdminShell>
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 rounded-md">Signed in as {ADMIN_EMAIL}</Badge>
          <h1 className="text-3xl font-black tracking-tight">Restaurant Ordering Control Center</h1>
          <p className="mt-2 text-muted-foreground">Monitor orders, payments, kitchen load, and restaurant performance.</p>
        </div>
        <Button asChild className="rounded-lg">
          <a href="/admin/orders">
            <ReceiptText className="mr-2 h-4 w-4" />
            Manage Orders
          </a>
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-lg">
            <CardContent className="p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-black">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Order Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ChartContainer config={{ orders: { label: 'Orders', color: 'hsl(var(--primary))' } }}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="status" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} />
                  <Bar dataKey="orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Kitchen Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="truncate font-bold">#{order.id.toString().slice(0, 8)} - {order.customerName}</p>
                  <p className="truncate text-xs text-muted-foreground">{getRestaurantName(order.items?.[0]?.restaurantId)}</p>
                </div>
                <Badge className="shrink-0">{order.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-lg">
        <CardHeader>
          <CardTitle>Top Restaurant Branches</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="rounded-lg border p-4">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Store className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{restaurant.location}</span>
              </div>
              <h3 className="font-black">{restaurant.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{restaurant.orderCount} orders</p>
              <p className="mt-3 text-xl font-black">{peso(restaurant.revenue)}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-lg border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <PackageCheck className="h-5 w-5 text-primary" />
            <p className="font-bold">Use the Orders page to verify payment proofs and update delivery status.</p>
          </div>
          <Button asChild variant="outline" className="rounded-lg bg-background">
            <a href="/admin/orders">Open Orders</a>
          </Button>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
