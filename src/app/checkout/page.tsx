
"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Landmark, Truck, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulating order processing
    setTimeout(() => {
      clearCart()
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been received. Redirecting to status page...",
      })
      router.push('/orders')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-headline font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Details */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span>
                Delivery Address
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Juan Dela Cruz" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="0917XXXXXXX" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Detailed Address</Label>
                  <Input id="address" placeholder="Bldg/Street, Barangay, City" required />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h3>
              <RadioGroup defaultValue="cod" onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-4">
                <div>
                  <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                  <Label
                    htmlFor="cod"
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-bold">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive your food</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="gcash" id="gcash" className="peer sr-only" />
                  <Label
                    htmlFor="gcash"
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-bold">GCash</p>
                        <p className="text-xs text-muted-foreground">Fast and secure mobile payment</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                  <Label
                    htmlFor="bank"
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-bold">Bank Transfer</p>
                        <p className="text-xs text-muted-foreground">BPI, BDO, or UnionBank</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod !== 'cod' && (
                <div className="mt-6 p-6 border-2 border-dashed rounded-xl bg-muted/20 space-y-4">
                  <div className="text-center">
                    <p className="font-bold text-sm mb-1 uppercase text-muted-foreground">Send payment to:</p>
                    <p className="text-xl font-bold">{paymentMethod === 'gcash' ? 'GCash: 0917 123 4567' : 'BPI: 1234 5678 90'}</p>
                    <p className="text-sm font-medium">Account Name: Puff N&apos; Plate Resto</p>
                  </div>
                  <div className="grid gap-2">
                    <Label>Upload Screenshot Proof</Label>
                    <div className="border border-input rounded-md p-4 bg-background flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Click to upload image</span>
                      <Input type="file" className="hidden" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ref">Reference Number</Label>
                    <Input id="ref" placeholder="Enter Ref #" />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex gap-2">
                        <span className="font-bold">{item.quantity}x</span>
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">₱{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>₱50</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total Amount</span>
                    <span className="text-primary">₱{totalAmount + 50}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  By placing your order, you agree to Puff N&apos; Plate&apos;s Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
}
