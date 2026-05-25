
"use client"

import { use, useState, useEffect, useMemo, useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, MapPin, Clock, ShoppingBag, Star, Info, ChevronRight, ArrowLeft, Heart, Share2 } from 'lucide-react'
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

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

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
    <div className="min-h-screen bg-background pb-32">
      <Navbar />
      
      {/* Restaurant Header */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute top-8 left-0 w-full px-4 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/restaurants">
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/30 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/30 transition-all">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/30 transition-all">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 w-full px-4 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                 <Badge className="bg-primary text-white border-none px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">Premium Pick</Badge>
                 {isOpen ? (
                    <Badge className="bg-green-500/80 backdrop-blur-sm border-none px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">Open Now</Badge>
                 ) : (
                    <Badge variant="destructive" className="px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">Closed</Badge>
                 )}
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-black mb-6 italic">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-white/80">
                <span className="flex items-center gap-2"><Star className="h-5 w-5 fill-primary text-primary" /> {restaurant.rating} (500+ reviews)</span>
                <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> {restaurant.location}</span>
                <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> {format12h(restaurant.hours.open)} - {format12h(restaurant.hours.close)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-72 hidden lg:block">
            <div className="sticky top-28 p-6 bg-muted/30 rounded-[2rem] border border-muted/50">
              <h3 className="font-headline font-black text-xl mb-6">Menu Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className={cn(
                      "w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300",
                      selectedCategory === cat 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "text-muted-foreground hover:bg-white hover:text-primary"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="flex-1">
            {!isOpen && (
              <Card className="bg-destructive/5 border-destructive/20 p-8 rounded-[2.5rem] flex items-center gap-6 mb-12 animate-in slide-in-from-top duration-500">
                <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center shrink-0">
                  <Info className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-destructive mb-1">Kitchen's Resting</h3>
                  <p className="text-muted-foreground leading-relaxed">This restaurant is currently closed. You can still browse the menu, but ordering is disabled until they open at <strong>{format12h(restaurant.hours.open)}</strong>.</p>
                </div>
              </Card>
            )}

            {categories.map(category => (
              <div 
                key={category} 
                ref={el => { categoryRefs.current[category] = el }}
                className="scroll-mt-28 mb-16"
              >
                <h2 className="text-3xl font-headline font-black mb-10 flex items-center gap-4">
                   <span className="h-px flex-1 bg-muted" />
                   {category}
                   <span className="h-px flex-1 bg-muted" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {restaurant.menu.filter(item => item.category === category).map((item) => (
                    <Card 
                      key={item.id} 
                      className={cn(
                        "group overflow-hidden flex flex-col h-full rounded-[2.5rem] border-none shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer bg-card",
                        !isOpen && "opacity-60 grayscale-[0.5]"
                      )}
                      onClick={() => handleOpenItem(item)}
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500">
                           <Plus className="h-6 w-6" />
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{item.name}</h4>
                            <span className="text-xl font-black text-primary">₱{item.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
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

      {/* Persistent Bottom Bar (Mobile) */}
      {cartTotal > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-6 glass border-t z-40 lg:hidden animate-in slide-in-from-bottom">
          <Link href="/cart">
            <Button className="w-full h-16 rounded-2xl text-xl font-bold flex justify-between px-8 shadow-2xl shadow-primary/30" size="lg">
              <span className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6" />
                {cartTotal}
              </span>
              <span>View Basket • ₱{cartAmount}</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Desktop Floating Cart Summary */}
      <div className="hidden lg:block fixed bottom-12 right-12 z-40">
        {cartTotal > 0 && (
          <Link href="/cart">
            <Button className="h-20 px-12 rounded-full shadow-2xl shadow-primary/40 font-black gap-4 text-xl group animate-in zoom-in" size="lg">
              <ShoppingBag className="h-7 w-7 group-hover:rotate-12 transition-transform" />
              <span>Basket • ₱{cartAmount}</span>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </Link>
        )}
      </div>

      {/* Item Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[3rem] shadow-2xl">
          {selectedItem && (
            <div className="flex flex-col">
              <div className="relative h-72 w-full">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute top-6 right-6">
                   <Badge className="bg-white/90 text-foreground backdrop-blur-xl border-none font-black px-4 py-2 text-lg rounded-xl">₱{selectedItem.price}</Badge>
                </div>
              </div>
              <div className="p-10">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-4xl font-headline font-black mb-3">{selectedItem.name}</DialogTitle>
                  <p className="text-muted-foreground text-lg leading-relaxed">{selectedItem.description}</p>
                </DialogHeader>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mt-10">
                  <div className="flex items-center gap-10 bg-muted/40 p-2 rounded-2xl">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-14 w-14 rounded-xl bg-white shadow-sm hover:text-primary transition-all"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-6 w-6" />
                    </Button>
                    <span className="text-3xl font-black w-8 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-14 w-14 rounded-xl bg-white shadow-sm hover:text-primary transition-all"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Subtotal</span>
                     <span className="text-3xl font-black text-primary italic">₱{selectedItem.price * quantity}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-10 h-16 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20" onClick={handleAddToCart}>
                  Add to basket
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
