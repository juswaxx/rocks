
"use client"

import { Navbar } from '@/components/navbar'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Info, Bike, Receipt, CreditCard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart()

  const DELIVERY_FEE = 50

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-primary/5 rounded-[3rem] p-16 mb-8 animate-in zoom-in duration-700">
            <ShoppingBag className="h-24 w-24 text-primary opacity-40" />
          </div>
          <h2 className="text-4xl font-headline font-black mb-4">Your basket is empty</h2>
          <p className="text-muted-foreground mb-12 text-center max-w-sm text-lg leading-relaxed">It seems you haven't discovered any Cebuano delicacies yet. Let's fix that!</p>
          <Link href="/restaurants">
            <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold shadow-2xl shadow-primary/30">Start Exploring</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex items-center gap-6 mb-12">
          <Link href="/restaurants">
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-white shadow-soft hover:bg-primary/10 hover:text-primary transition-all">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-5xl font-headline font-black italic">My Basket</h1>
            <p className="text-muted-foreground font-medium">Review your Cebuano feast</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-soft rounded-[2.5rem] bg-card p-2 group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative h-32 w-32 rounded-[1.5rem] overflow-hidden shrink-0 shadow-lg">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-1 truncate">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">Item #PRD-{item.id.slice(0, 4).toUpperCase()}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                       <span className="text-2xl font-black text-primary">₱{item.price}</span>
                       <Badge variant="outline" className="rounded-full px-3">In Stock</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center text-lg font-black">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all shrink-0" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            <Link href="/restaurants" className="flex items-center justify-center h-20 border-2 border-dashed border-muted rounded-[2rem] text-muted-foreground font-bold hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all">
              + Add more delicious items
            </Link>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-soft rounded-[3rem] sticky top-28 bg-card overflow-hidden">
              <div className="p-10">
                <h3 className="text-3xl font-headline font-black mb-8 italic">Order Summary</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-muted">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium"><Receipt className="h-4 w-4" /> Subtotal</span>
                    <span className="font-bold text-lg">₱{totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-muted">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium"><Bike className="h-4 w-4" /> Delivery Fee</span>
                    <span className="font-bold text-green-600">₱{DELIVERY_FEE}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-6">
                    <span className="text-xl font-bold">Total Payable</span>
                    <span className="text-4xl font-black text-primary italic">₱{totalAmount + DELIVERY_FEE}</span>
                  </div>
                </div>
                
                <div className="mt-10 p-5 bg-primary/5 rounded-3xl flex gap-4 border border-primary/10">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">By continuing, you're supporting local Cebuano riders and small businesses.</p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-10 rounded-[1.5rem] h-16 text-xl font-bold shadow-2xl shadow-primary/30 group" size="lg">
                    Checkout Order <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
