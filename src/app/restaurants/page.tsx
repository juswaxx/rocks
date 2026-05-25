
"use client"

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock } from 'lucide-react'

const RESTAURANTS = [
  {
    id: 'cebu-lechon-house',
    name: 'Cebu Lechon House',
    description: 'The most iconic crispy roasted pig in Cebu City. A must-try for every local and tourist.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/lechonhouse/600/400',
    rating: 4.9,
    hours: { open: '10:00', close: '21:00' }
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'Famous Cebuano street food and grilled favorites served with puso (hanging rice).',
    location: 'Fuente Osmeña, Cebu',
    image: 'https://picsum.photos/seed/larsian/600/400',
    rating: 4.7,
    hours: { open: '18:00', close: '02:00' }
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food. Best known for Ginabot (crispy pork intestines).',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/pungkopungko/600/400',
    rating: 4.6,
    hours: { open: '06:00', close: '22:00' }
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon that Anthony Bourdain called "the best pig ever."',
    location: 'IT Park, Cebu',
    image: 'https://picsum.photos/seed/zubuchon/600/400',
    rating: 4.8,
    hours: { open: '10:00', close: '21:00' }
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'Classic Cebuano comfort food and their legendary Brian\'s Ribs.',
    location: 'The Terraces, Cebu',
    image: 'https://picsum.photos/seed/casaverde/600/400',
    rating: 4.5,
    hours: { open: '10:00', close: '22:00' }
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood caught daily from the shores of Mactan Island.',
    location: 'Lapu-Lapu City',
    image: 'https://picsum.photos/seed/mactanseafood/600/400',
    rating: 4.4,
    hours: { open: '11:00', close: '23:00' }
  }
]

export default function RestaurantsPage() {
  const [currentStatuses, setCurrentStatuses] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const updateStatuses = () => {
      const now = new Date()
      const manilaTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(now)

      const [currentHour, currentMin] = manilaTime.split(':').map(Number)
      const currentTimeInMinutes = currentHour * 60 + currentMin

      const newStatuses: Record<string, boolean> = {}

      RESTAURANTS.forEach(res => {
        const [openHour, openMin] = res.hours.open.split(':').map(Number)
        const [closeHour, closeMin] = res.hours.close.split(':').map(Number)

        const openTimeInMinutes = openHour * 60 + openMin
        let closeTimeInMinutes = closeHour * 60 + closeMin

        if (closeTimeInMinutes < openTimeInMinutes) {
          // Handles overnight operations (e.g., Larsian)
          newStatuses[res.id] = currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes < closeTimeInMinutes
        } else {
          newStatuses[res.id] = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes
        }
      })

      setCurrentStatuses(newStatuses)
    }

    updateStatuses()
    const interval = setInterval(updateStatuses, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-4">Cebu&apos;s Finest Restaurants</h1>
          <p className="text-muted-foreground">Discover the authentic flavors of Cebu, from street food to gourmet lechon.</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Status based on Manila Time (PST)</span>
          </div>
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
                        <Badge variant={isOpen ? 'default' : 'destructive'}>
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
                      Hours: {res.hours.open} - {res.hours.close}
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
