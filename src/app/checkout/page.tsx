
"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Landmark, Truck, Upload, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { RESTAURANTS, isRestaurantOpen } from '@/lib/restaurants'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAuth, useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart()
  const { user } = useUser()
  const db = useFirestore()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [loading, setLoading] = useState(false)
  const [closedRestaurants, setClosedRestaurants] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user?.displayName && !formData.fullName) {
      setFormData(prev => ({ ...prev, fullName: user.displayName || '' }))
    }
  }, [user, formData.fullName])

  useEffect(() => {
    const closed = items
      .map(item => RESTAURANTS.find(r => r.id === item.restaurantId))
      .filter(r => r && !isRestaurantOpen(r.hours))
      .map(r => r!.name)
    
    setClosedRestaurants(Array.from(new Set(closed)))
  }, [items])

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to place an order.",
      })
      router.push('/login')
      return
    }

    if (closedRestaurants.length > 0) {
      toast({
        variant: "destructive",
        title: "Cannot Place Order",
        description: `The following restaurants are currently closed: ${closedRestaurants.join(', ')}. Please remove items from these restaurants to continue.`,
      })
      return
    }

    setLoading(true)
    
    const orderData = {
      userId: user.uid,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        restaurantId: item.restaurantId,
        imageUrl: item.imageUrl
      })),
      totalAmount: totalAmount + 50,
      status: 'Preparing',
      paymentMethod: paymentMethod,
      deliveryAddress: formData.address,
      customerName: formData.fullName,
      customerPhone: formData.phone,
      createdAt: serverTimestamp()
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders')
    
    addDoc(ordersRef, orderData)
      .then(() => {
        clearCart()
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been received. Redirecting to status page...",
        })
        router.push('/orders')
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: ordersRef.path,
          operation: 'create',
          requestResourceData: orderData,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: "destructive",
          title: "Order Failed",
          description: "Could not save your order. Please try again.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const isOrderBlocked = closedRestaurants.length > 0 || items.length === 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-headline font-bold mb-8">Checkout</h1>
        
        {closedRestaurants.length > 0 && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              Some restaurants in your cart are now closed: <strong>{closedRestaurants.join(', ')}</strong>. You cannot place an order until these items are removed.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span>
                Delivery Address
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Juan Dela Cruz" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="0917XXXXXXX" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Detailed Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Bldg/Street, Barangay, City" 
                    required 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
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

                <Button type="submit" className="w-full h-12 text-lg" disabled={loading || isOrderBlocked}>
                  {loading ? 'Processing...' : isOrderBlocked ? 'Ordering Blocked' : 'Place Order'}
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
