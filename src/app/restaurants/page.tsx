
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'

const RESTAURANTS = [
  {
    id: 'cebu-lechon',
    name: 'Cebu Lechon House',
    description: 'Famous crispy pork lechon and local delicacies.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/restaurant1/600/400',
    rating: 4.8,
    status: 'Open'
  },
  {
    id: 'tapsilog-express',
    name: 'Tapsilog Express',
    description: 'All-day breakfast comfort food for busy people.',
    location: 'Manila',
    image: 'https://picsum.photos/seed/restaurant2/600/400',
    rating: 4.5,
    status: 'Open'
  },
  {
    id: 'mang-inasal-style',
    name: 'Mang Inasal Style Grill',
    description: 'Chicken Inasal with unlimited rice feel.',
    location: 'Iloilo',
    image: 'https://picsum.photos/seed/restaurant3/600/400',
    rating: 4.6,
    status: 'Closed'
  },
  {
    id: 'lutong-bahay',
    name: 'Lutong Bahay Kitchen',
    description: 'Home-cooked Filipino meals just like Lola makes.',
    location: 'Quezon City',
    image: 'https://picsum.photos/seed/restaurant4/600/400',
    rating: 4.9,
    status: 'Open'
  }
]

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-4">Browse Restaurants</h1>
          <p className="text-muted-foreground">Find the best local flavors in your neighborhood.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESTAURANTS.map((res) => (
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
                    <Badge variant={res.status === 'Open' ? 'default' : 'destructive'}>
                      {res.status}
                    </Badge>
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
                  <p className="text-sm line-clamp-2 text-muted-foreground">{res.description}</p>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <Button className="w-full" variant="outline">View Menu</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
