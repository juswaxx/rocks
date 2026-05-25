
"use client"

import { Navbar } from '@/components/navbar'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart()

  const DELIVERY_FEE = 50

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-primary/5 rounded-full p-10 mb-6">
            <ShoppingBag className="h-20 w-20 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your basket is empty</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-xs">Looks like you haven't added any of Cebu's delicious food to your order yet.</p>
          <Link href="/restaurants">
            <Button size="lg" className="rounded-xl px-10 h-12 font-bold">Browse Restaurants</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/restaurants">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white shadow-sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-headline font-bold">My Basket</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{item.name}</h3>
                    <p className="text-primary font-bold">₱{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 p-1.5 rounded-lg">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Link href="/restaurants" className="block text-center p-4 border-2 border-dashed rounded-xl text-primary font-bold hover:bg-primary/5 transition-colors">
              + Add more items
            </Link>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₱{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium text-green-600">₱{DELIVERY_FEE}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-baseline">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₱{totalAmount + DELIVERY_FEE}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-primary/5 rounded-lg flex gap-3">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground">Order includes a small fee to support our local Cebuano delivery partners.</p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-8 rounded-xl h-14 text-lg font-bold shadow-lg" size="lg">Checkout Order</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
