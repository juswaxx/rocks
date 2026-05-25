
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

const MOCK_ORDERS = [
  {
    id: 'ORD-12345',
    date: 'Oct 24, 2023',
    status: 'Preparing',
    paymentStatus: 'Paid',
    total: 350,
    items: ['Pork Sisig x1', 'Halo-Halo x1']
  },
  {
    id: 'ORD-12340',
    date: 'Oct 20, 2023',
    status: 'Completed',
    paymentStatus: 'Paid',
    total: 1250,
    items: ['Whole Lechon (Kg) x2', 'Soft Drinks x4']
  },
  {
    id: 'ORD-12290',
    date: 'Oct 15, 2023',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    total: 220,
    items: ['Lechon Kawali x1']
  }
]

export default function OrdersPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Preparing': return <Clock className="h-5 w-5 text-yellow-500" />
      case 'Completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'Cancelled': return <XCircle className="h-5 w-5 text-red-500" />
      default: return <Package className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-headline font-bold mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <Card key={order.id} className="hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-full">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{order.id}</span>
                        <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'outline'} className={order.status === 'Preparing' ? 'border-yellow-500 text-yellow-600' : ''}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.date} • {order.items.length} items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                    <span className="text-lg font-bold text-primary">₱{order.total}</span>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Order Summary:</p>
                  <p className="text-sm">{order.items.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
