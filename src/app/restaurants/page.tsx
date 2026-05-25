
"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock, Bike } from 'lucide-react'
import { RESTAURANTS, isRestaurantOpen, format12h } from '@/lib/restaurants'

export default function RestaurantsPage() {
  const [currentStatuses, setCurrentStatuses] = useState<Record<string, boolean>>({})

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

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Cebu's Favorites</h1>
          <p className="text-muted-foreground">Order from the best local spots in the Queen City.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANTS.map((res) => {
            const isOpen = currentStatuses[res.id]
            const isChecking = currentStatuses[res.id] === undefined

            return (
              <Link key={res.id} href={`/restaurants/${res.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all border-none shadow-sm cursor-pointer group h-full flex flex-col bg-card">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={res.image} 
                      alt={res.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm border-none shadow-sm">
                        <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                        {res.rating}
                      </Badge>
                      {!isChecking && !isOpen && (
                        <Badge variant="destructive" className="shadow-sm">
                          Closed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <CardTitle className="text-xl font-bold font-headline">{res.name}</CardTitle>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3 gap-3">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> 20-35 mins</span>
                      <span className="flex items-center text-primary font-medium"><Bike className="h-3 w-3 mr-1" /> Free Delivery</span>
                    </div>
                    <p className="text-sm line-clamp-2 text-muted-foreground mb-4">{res.description}</p>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <div className="w-full flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {res.location}</span>
                      <span>{format12h(res.hours.open)} - {format12h(res.hours.close)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
