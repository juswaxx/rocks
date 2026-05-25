
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, Clock, CheckCircle2, XCircle, ShoppingBag, MapPin } from 'lucide-react'
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
    return format(date, 'MMM dd, yyyy • h:mm a');
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
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-headline font-bold mb-8">My Orders</h1>
        
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold font-mono tracking-tight text-lg">#{order.id.substring(0, 6).toUpperCase()}</span>
                            <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'outline'} className={order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₱{order.totalAmount}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="space-y-3 py-4 border-y border-dashed">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="flex gap-2">
                            <span className="font-bold text-primary">{item.quantity}x</span>
                            <span className="text-muted-foreground">{item.name}</span>
                          </span>
                          <span className="font-medium">₱{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                      <p>{order.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-primary uppercase">Track your delivery</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-muted shadow-sm">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-8 text-sm max-w-xs mx-auto">Hungry? Discover the best flavors of Cebu and your history will appear here.</p>
            <Link href="/restaurants">
              <Button className="rounded-xl px-8 font-bold">Explore Restaurants</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
