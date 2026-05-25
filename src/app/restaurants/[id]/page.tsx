
"use client"

import { use, useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, ShoppingCart, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import { toast } from '@/hooks/use-toast'

const MENU_ITEMS = [
  { id: '1', name: 'Cebu Lechon (1/4 kg)', description: 'The famous Cebuano roasted pig, known for its extra crispy skin and flavorful meat.', price: 250, category: 'Lechon', image: 'https://picsum.photos/seed/lechon/400/300' },
  { id: '2', name: 'Ginabot (Crispy Chicharon)', description: 'Deep-fried pork mesentery, a Cebuano pungko-pungko favorite.', price: 45, category: 'Street Food', image: 'https://picsum.photos/seed/ginabot/400/300' },
  { id: '3', name: 'Puso (Hanging Rice)', description: 'Rice boiled in a diamond-shaped casing of woven coconut leaves.', price: 10, category: 'Sides', image: 'https://picsum.photos/seed/puso/400/300' },
  { id: '4', name: 'Ngohiong', description: 'Cebu\'s unique take on the spring roll, battered and deep-fried.', price: 15, category: 'Appetizer', image: 'https://picsum.photos/seed/ngohiong/400/300' },
  { id: '5', name: 'Mango Float', description: 'Layered dessert with Cebu\'s famous sweet mangoes, cream, and graham crackers.', price: 120, category: 'Dessert', image: 'https://picsum.photos/seed/mangofloat/400/300' },
]

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  // Mock operating hours for the demo
  const operatingHours = { open: '10:00', close: '22:00' }

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date()
      const manilaTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(now)

      const [currentHour, currentMin] = manilaTime.split(':').map(Number)
      const currentTimeInMinutes = currentHour * 60 + currentMin

      const [openHour, openMin] = operatingHours.open.split(':').map(Number)
      const [closeHour, closeMin] = operatingHours.close.split(':').map(Number)

      const openInMins = openHour * 60 + openMin
      const closeInMins = closeHour * 60 + closeMin

      if (closeInMins < openInMins) {
        setIsOpen(currentTimeInMinutes >= openInMins || currentTimeInMinutes < closeInMins)
      } else {
        setIsOpen(currentTimeInMinutes >= openInMins && currentTimeInMinutes < closeInMins)
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = (item: any) => {
    addItem({
      id: Math.random().toString(36).substr(2, 9),
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.image,
      restaurantId: id
    })
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your shopping cart.`
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Restaurant Banner */}
      <div className="relative h-[350px] w-full">
        <Image 
          src="https://picsum.photos/seed/ceburesto/1200/600" 
          alt="Restaurant Banner" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary hover:bg-primary text-white">Highly Rated</Badge>
              {isOpen !== null && (
                <Badge variant={isOpen ? 'default' : 'destructive'} className={isOpen ? 'bg-green-600' : ''}>
                  {isOpen ? 'Open Now' : 'Closed'}
                </Badge>
              )}
              <span className="text-sm flex items-center gap-1 opacity-80"><MapPin className="h-3 w-3" /> Cebu City, Philippines</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">Authentic Cebuano Flavors</h1>
            <div className="flex items-center gap-2 opacity-90 text-sm mb-4">
              <Clock className="h-4 w-4" />
              <span>Hours (Manila Time): {operatingHours.open} - {operatingHours.close}</span>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">Serving traditional recipes passed down through generations in the heart of Cebu.</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="md:w-64 space-y-4">
            <div className="bg-muted/50 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-lg mb-4">Menu Categories</h3>
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="justify-start text-primary bg-primary/10">Full Menu</Button>
                <Button variant="ghost" className="justify-start">Signature Lechon</Button>
                <Button variant="ghost" className="justify-start">Street Food Corner</Button>
                <Button variant="ghost" className="justify-start">Cebuano Desserts</Button>
                <Button variant="ghost" className="justify-start">Local Refreshments</Button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MENU_ITEMS.map((item) => (
                <Card key={item.id} className="overflow-hidden flex h-44 group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="relative w-40 h-full shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <span className="text-primary font-bold">₱{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2" 
                      onClick={() => handleAddToCart(item)}
                      disabled={isOpen === false}
                    >
                      <Plus className="h-4 w-4 mr-2" /> {isOpen === false ? 'Closed' : 'Add to Order'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
