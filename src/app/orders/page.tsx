
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, Clock, CheckCircle2, XCircle, ShoppingBag, MapPin, Receipt, Calendar } from 'lucide-react'
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
      case 'Preparing': return <Clock className="h-6 w-6 text-yellow-500" />
      case 'Completed': return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case 'Cancelled': return <XCircle className="h-6 w-6 text-red-500" />
      default: return <Package className="h-6 w-6 text-primary" />
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
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-5xl font-headline font-black italic mb-12">My Orders</h1>
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse rounded-[2.5rem] border-none shadow-soft">
                <CardContent className="h-48 p-10" />
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
        <main className="container mx-auto px-4 py-32 text-center">
          <div className="bg-muted rounded-[3rem] p-16 max-w-md mx-auto">
             <ShoppingBag className="h-20 w-20 text-muted-foreground opacity-30 mx-auto mb-8" />
             <h2 className="text-3xl font-bold mb-6">Login to see your history</h2>
             <Link href="/login">
               <Button size="lg" className="rounded-2xl px-12 h-14 text-lg font-bold">Login Now</Button>
             </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
           <h1 className="text-5xl font-headline font-black italic mb-2">Order History</h1>
           <p className="text-muted-foreground font-medium">Relive your favorite Cebuano moments</p>
        </div>
        
        {orders && orders.length > 0 ? (
          <div className="space-y-10">
            {orders.map((order) => (
              <Card key={order.id} className="border-none shadow-soft hover:shadow-2xl transition-all duration-500 group overflow-hidden rounded-[3rem] bg-card">
                <CardContent className="p-0">
                  <div className="p-10">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-8 mb-10">
                      <div className="flex items-start gap-6">
                        <div className="p-5 bg-primary/10 rounded-[1.5rem] shrink-0">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-4 mb-2">
                            <span className="text-2xl font-black font-mono tracking-tighter uppercase italic">Order #{order.id.substring(0, 6)}</span>
                            <Badge className={cn(
                              "px-4 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest",
                              order.status === 'Completed' ? 'bg-green-500' : 
                              order.status === 'Cancelled' ? 'bg-destructive' : 'bg-yellow-500'
                            )}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" /> {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Total Paid</p>
                        <p className="text-4xl font-black text-primary italic">₱{order.totalAmount}</p>
                        <Badge variant="outline" className="mt-2 rounded-full border-muted text-muted-foreground font-bold">{order.paymentMethod.toUpperCase()}</Badge>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-8 rounded-[2rem] space-y-4">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center font-black text-primary border shadow-sm">{item.quantity}x</div>
                            <span className="font-bold text-foreground">{item.name}</span>
                          </div>
                          <span className="font-black text-foreground/60">₱{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-start gap-4 text-sm text-muted-foreground bg-primary/5 p-6 rounded-[1.5rem] border border-primary/5">
                      <MapPin className="h-5 w-5 shrink-0 text-primary/60" />
                      <div>
                         <p className="font-bold text-foreground/80 mb-1 uppercase text-[10px] tracking-widest">Delivery Address</p>
                         <p className="font-medium">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-foreground text-background p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                       <span className="text-xs font-black uppercase tracking-widest opacity-80">Track Status</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto text-primary font-black uppercase tracking-widest text-[10px] hover:no-underline group p-0">
                      Receipt Details <ChevronRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-[4rem] border border-dashed border-muted shadow-soft">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-8 opacity-20" />
            <h3 className="text-3xl font-headline font-black mb-4 italic">No Feasts Found</h3>
            <p className="text-muted-foreground mb-12 text-lg max-w-sm mx-auto leading-relaxed">Your history is looking a bit empty. Cebu's best lechon is just a few clicks away!</p>
            <Link href="/restaurants">
              <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold shadow-2xl shadow-primary/30">Start Ordering</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
