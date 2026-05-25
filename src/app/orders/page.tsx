
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, Clock, CheckCircle2, XCircle, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { format } from 'date-fns'

export default function OrdersPage() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()

  const ordersQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'orders'),
      orderBy('createdAt', 'desc')
    );
  }, [db, user]);

  const { data: orders, loading: ordersLoading } = useCollection<any>(ordersQuery);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Preparing': return <Clock className="h-5 w-5 text-yellow-500" />
      case 'Completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'Cancelled': return <XCircle className="h-5 w-5 text-red-500" />
      default: return <Package className="h-5 w-5 text-primary" />
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return format(date, 'MMM dd, yyyy');
  };

  if (userLoading || ordersLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl font-headline font-bold mb-8">My Orders</h1>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-32 p-6" />
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your orders</h2>
          <Link href="/login">
            <Button>Login Now</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-headline font-bold mb-8">My Orders</h1>
        
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:border-primary transition-colors group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-full">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">{order.id.substring(0, 8).toUpperCase()}</span>
                          <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'outline'} className={order.status === 'Preparing' ? 'border-yellow-500 text-yellow-600' : ''}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)} • {order.items?.length || 0} items
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                      <span className="text-lg font-bold text-primary">₱{order.totalAmount}</span>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Order Summary:</p>
                    <p className="text-sm">
                      {order.items?.map((it: any) => `${it.name} x${it.quantity}`).join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-8">Time to taste the best of Cebu!</p>
            <Link href="/restaurants">
              <Button>Explore Restaurants</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
