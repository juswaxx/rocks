
"use client"

import { use, useState, useEffect, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, MapPin, Clock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/hooks/use-toast'
import { RESTAURANTS, isRestaurantOpen, format12h, MenuItem } from '@/lib/restaurants'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const restaurant = useMemo(() => RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0], [id])
  
  const categories = useMemo(() => {
    const cats = new Set(restaurant.menu.map(item => item.category))
    return Array.from(cats)
  }, [restaurant])

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return restaurant.menu
    return restaurant.menu.filter(item => item.category === selectedCategory)
  }, [selectedCategory, restaurant])

  useEffect(() => {
    const checkStatus = () => {
      setIsOpen(isRestaurantOpen(restaurant.hours))
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [restaurant.hours])

  const handleOpenItem = (item: MenuItem) => {
    if (isOpen === false) {
      toast({
        variant: "destructive",
        title: "Ordering Closed",
        description: "This restaurant is currently closed. You can only order during business hours."
      })
      return
    }
    setSelectedItem(item)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedItem) return

    addItem({
      id: Math.random().toString(36).substr(2, 9),
      menuItemId: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: quantity,
      imageUrl: selectedItem.image,
      restaurantId: id
    })

    toast({
      title: "Added to Cart",
      description: `${quantity}x ${selectedItem.name} has been added to your shopping cart.`
    })
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Restaurant Banner */}
      <div className="relative h-[350px] w-full">
        <Image 
          src={restaurant.image} 
          alt={restaurant.name} 
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
              <span className="text-sm flex items-center gap-1 opacity-80"><MapPin className="h-3 w-3" /> {restaurant.location}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-2 opacity-90 text-sm mb-4">
              <Clock className="h-4 w-4" />
              <span>Hours (Manila Time): {format12h(restaurant.hours.open)} - {format12h(restaurant.hours.close)}</span>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">{restaurant.description}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="md:w-64 space-y-4">
            <div className="bg-muted/50 p-6 rounded-xl border border-border sticky top-24">
              <h3 className="font-bold text-lg mb-4">Menu Categories</h3>
              <div className="flex flex-col gap-1">
                <Button 
                  variant="ghost" 
                  className={cn("justify-start", !selectedCategory && "text-primary bg-primary/10")}
                  onClick={() => setSelectedCategory(null)}
                >
                  Full Menu
                </Button>
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant="ghost" 
                    className={cn("justify-start", selectedCategory === cat && "text-primary bg-primary/10")}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-headline">{selectedCategory || 'Full Menu'}</h2>
              <p className="text-muted-foreground">{filteredItems.length} items available</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className={cn(
                    "overflow-hidden flex h-44 group cursor-pointer hover:border-primary/50 transition-colors shadow-sm",
                    isOpen === false && "opacity-60 grayscale-[0.5]"
                  )}
                  onClick={() => handleOpenItem(item)}
                >
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
                    <div className="flex items-center text-primary text-xs font-bold gap-1 mt-auto">
                      <Plus className="h-3 w-3" /> Add to Order
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Menu Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          {selectedItem && (
            <>
              <div className="relative h-64 w-full">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <div className="flex justify-between items-start gap-4">
                    <DialogTitle className="text-2xl font-bold font-headline">{selectedItem.name}</DialogTitle>
                    <span className="text-xl font-bold text-primary shrink-0">₱{selectedItem.price}</span>
                  </div>
                </DialogHeader>
                <p className="text-muted-foreground mb-8">{selectedItem.description}</p>
                
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-4 bg-muted p-2 rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Total</p>
                    <p className="text-2xl font-bold text-primary">₱{selectedItem.price * quantity}</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="p-6 pt-0">
                <Button className="w-full h-12 text-lg" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Order
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
