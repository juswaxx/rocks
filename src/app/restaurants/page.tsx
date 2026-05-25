
"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock, Bike, Search, SlidersHorizontal } from 'lucide-react'
import { RESTAURANTS, isRestaurantOpen } from '@/lib/restaurants'
import { Input } from '@/components/ui/input'

const QUICK_CATEGORIES = ['All', 'Lechon', 'Seafood', 'BBQ', 'Desserts', 'Street Food']

export default function RestaurantsPage() {
  const [currentStatuses, setCurrentStatuses] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const updateStatuses = () => {
      const newStatuses: Record<string, boolean> = {}
      RESTAURANTS.forEach(res => {
        newStatuses[res.id] = isRestaurantOpen(res.hours)
      })
      setCurrentStatuses(newStatuses)
    }

    updateStatuses()
    const interval = setInterval(updateStatuses, 60000)
    return () => clearInterval(interval)
  }, [])

  const filteredRestaurants = RESTAURANTS.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) ||
                         res.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || res.categories.includes(selectedCategory)
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      {/* Header with Search */}
      <div className="bg-white border-b sticky top-20 z-30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-headline font-black mb-1 text-foreground">Explore Cebuano Cuisine</h1>
              <p className="text-sm text-muted-foreground font-medium">Found {filteredRestaurants.length} restaurants serving your area</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search lechon, halo-halo, BBQ..." 
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-transparent focus:bg-white focus:border-primary transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-6 scrollbar-hide">
            {QUICK_CATEGORIES.map(cat => (
              <Badge 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-6 rounded-full cursor-pointer text-xs font-bold transition-all border-none ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRestaurants.map((res) => {
            const isOpen = currentStatuses[res.id]
            const isChecking = currentStatuses[res.id] === undefined

            return (
              <Link key={res.id} href={`/restaurants/${res.id}`} className="block group">
                <Card className="overflow-hidden border-none bg-transparent shadow-none group-hover:-translate-y-2 transition-all duration-500">
                  <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-soft group-hover:shadow-2xl transition-all duration-500">
                    <Image 
                      src={res.image} 
                      alt={res.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 flex gap-2">
                      <Badge className="bg-white/95 text-foreground backdrop-blur-sm border-none shadow-sm py-1.5 px-3 font-black text-[10px]">
                        <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                        {res.rating}
                      </Badge>
                      {!isChecking && !isOpen && (
                        <Badge variant="destructive" className="shadow-sm py-1.5 px-3 font-bold text-[10px] border-none">
                          Closed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="absolute bottom-5 left-5 right-5 glass p-4 rounded-2xl flex justify-between items-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="text-xs font-bold text-foreground">View Menu</span>
                       <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-headline font-black group-hover:text-primary transition-colors text-foreground">{res.name}</h3>
                    </div>
                    
                    <div className="flex items-center text-xs font-bold text-muted-foreground gap-4">
                      <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1.5 text-primary/60" /> 20-35 mins</span>
                      <span className="flex items-center text-green-600"><Bike className="h-3.5 w-3.5 mr-1.5" /> Free Delivery</span>
                      <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" /> {res.location}</span>
                    </div>
                    
                    <p className="mt-3 text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed font-medium">{res.description}</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
        
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-[3rem] border border-dashed border-muted">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h3 className="text-2xl font-bold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground font-medium">Try searching for something else or clearing your filters.</p>
            <Button variant="link" className="mt-4 text-primary font-bold" onClick={() => { setSearch(''); setSelectedCategory('All'); }}>Clear filters</Button>
          </div>
        )}
      </main>
    </div>
  )
}
