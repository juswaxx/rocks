
"use client"

import { use, useState, useEffect, useMemo, useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, MapPin, Clock, ShoppingBag, Star, Info, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/hooks/use-toast'
import { RESTAURANTS, isRestaurantOpen, format12h, MenuItem } from '@/lib/restaurants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem, items } = useCart()
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const restaurant = useMemo(() => RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0], [id])
  
  const categories = useMemo(() => {
    const cats = new Set(restaurant.menu.map(item => item.category))
    return Array.from(cats)
  }, [restaurant])

  const cartTotal = items.reduce((acc, item) => acc + item.quantity, 0)
  const cartAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  useEffect(() => {
    const checkStatus = () => {
      setIsOpen(isRestaurantOpen(restaurant.hours))
    }
    checkStatus()
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [restaurant.hours])

  const scrollToCategory = (category: string) => {
    setSelectedCategory(category)
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenItem = (item: MenuItem) => {
    if (isOpen === false) {
      toast({
        variant: "destructive",
        title: "Closed",
        description: "This restaurant is currently closed."
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
      title: "Added to basket",
      description: `${quantity}x ${selectedItem.name} added.`
    })
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-32">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /> {restaurant.rating} (500+ ratings)</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {format12h(restaurant.hours.open)} - {format12h(restaurant.hours.close)}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedCategory === cat ? "bg-primary text-white font-bold" : "hover:bg-muted"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          <div className="flex-1 space-y-12">
            {!isOpen && (
              <Card className="bg-destructive/5 border-destructive/20 p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-destructive">Closed right now</p>
                  <p className="text-sm text-muted-foreground">This restaurant is currently not accepting orders. Come back at {format12h(restaurant.hours.open)}!</p>
                </div>
              </Card>
            )}

            {categories.map(category => (
              <div 
                key={category} 
                ref={el => { categoryRefs.current[category] = el }}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold font-headline mb-6 border-b pb-2">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurant.menu.filter(item => item.category === category).map((item) => (
                    <Card 
                      key={item.id} 
                      className={cn(
                        "flex overflow-hidden h-32 md:h-36 hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm group",
                        !isOpen && "opacity-60 grayscale-[0.3]"
                      )}
                      onClick={() => handleOpenItem(item)}
                    >
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold group-hover:text-primary transition-colors">{item.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                        </div>
                        <span className="font-bold text-primary">₱{item.price}</span>
                      </div>
                      <div className="relative w-32 md:w-40 h-full">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <div className="absolute bottom-2 right-2">
                          <Button size="icon" className="h-8 w-8 rounded-full shadow-lg">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Persistent Bottom Bar (Grab/Foodpanda style) */}
      {cartTotal > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-background border-t z-40 lg:hidden">
          <Link href="/cart">
            <Button className="w-full h-14 rounded-xl text-lg font-bold flex justify-between px-6" size="lg">
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {cartTotal} item{cartTotal !== 1 ? 's' : ''}
              </span>
              <span>View Basket • ₱{cartAmount}</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Desktop Floating Cart Summary */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        {cartTotal > 0 && (
          <Link href="/cart">
            <Button className="h-16 px-8 rounded-full shadow-2xl font-bold gap-3 text-lg" size="lg">
              <ShoppingBag className="h-6 w-6" />
              <span>Basket • ₱{cartAmount}</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>

      {/* Item Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-2xl">
          {selectedItem && (
            <>
              <div className="relative h-56 w-full">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <DialogTitle className="text-2xl font-bold font-headline">{selectedItem.name}</DialogTitle>
                  <span className="text-xl font-bold text-primary">₱{selectedItem.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{selectedItem.description}</p>
                
                <div className="flex items-center justify-center gap-8 mb-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12 rounded-full border-2"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="text-2xl font-bold w-6 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12 rounded-full border-2"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <DialogFooter className="p-6 pt-0">
                <Button className="w-full h-14 text-lg font-bold rounded-xl" onClick={handleAddToCart}>
                  Add to basket • ₱{selectedItem.price * quantity}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
