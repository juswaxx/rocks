
"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-4">Cebu&apos;s Finest Restaurants</h1>
          <p className="text-muted-foreground">Discover the authentic flavors of Cebu, from street food to gourmet lechon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESTAURANTS.map((res) => {
            const isOpen = currentStatuses[res.id]
            const isChecking = currentStatuses[res.id] === undefined

            return (
              <Link key={res.id} href={`/restaurants/${res.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={res.image} 
                      alt={res.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {!isChecking && (
                        <Badge variant={isOpen ? 'default' : 'destructive'} className={isOpen ? 'bg-green-600' : ''}>
                          {isOpen ? 'Open Now' : 'Closed'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold">{res.name}</CardTitle>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span className="text-sm font-bold text-foreground">{res.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {res.location}
                    </div>
                    <p className="text-sm line-clamp-2 text-muted-foreground mb-2">{res.description}</p>
                    <div className="text-xs font-medium text-primary">
                      Hours: {format12h(res.hours.open)} - {format12h(res.hours.close)}
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    <Button className="w-full" variant="outline">View Cebuano Menu</Button>
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
