
"use client"

import { use } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import { toast } from '@/hooks/use-toast'

const MENU_ITEMS = [
  { id: '1', name: 'Pork Sisig', description: 'Chopped pork ears and jowls with calamansi and chili.', price: 180, category: 'Main', image: 'https://picsum.photos/seed/sisig/400/300' },
  { id: '2', name: 'Lechon Kawali', description: 'Deep-fried crispy pork belly served with liver sauce.', price: 220, category: 'Main', image: 'https://picsum.photos/seed/lechon/400/300' },
  { id: '3', name: 'Chicken Inasal', description: 'Bacolod-style grilled chicken marinated in citrus and herbs.', price: 165, category: 'Main', image: 'https://picsum.photos/seed/inasal/400/300' },
  { id: '4', name: 'Halo-Halo', description: 'The ultimate Filipino shaved ice sundae.', price: 95, category: 'Dessert', image: 'https://picsum.photos/seed/halohalo/400/300' },
  { id: '5', name: 'Lumpia Shanghai', description: 'Crispy spring rolls filled with savory meat.', price: 120, category: 'Appetizer', image: 'https://picsum.photos/seed/lumpia/400/300' },
]

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()

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
      <div className="relative h-[300px] w-full">
        <Image 
          src="https://picsum.photos/seed/restaurant1/1200/600" 
          alt="Restaurant Banner" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">Cebu Lechon House</h1>
            <p className="text-lg opacity-90 max-w-2xl">Serving the crispest lechon and traditional Cebuano flavors since 1995.</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="md:w-64 space-y-4">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-primary">All Items</Button>
              <Button variant="ghost" className="justify-start">Main Dishes</Button>
              <Button variant="ghost" className="justify-start">Desserts</Button>
              <Button variant="ghost" className="justify-start">Drinks</Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MENU_ITEMS.map((item) => (
                <Card key={item.id} className="overflow-hidden flex h-40 group">
                  <div className="relative w-40 h-full shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <span className="text-primary font-bold">₱{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2" 
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add to Cart
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
