
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
    id: 'cebu-lechon-house',
    name: 'Cebu Lechon House',
    description: 'The most iconic crispy roasted pig in Cebu City. A must-try for every local and tourist.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/lechonhouse/600/400',
    rating: 4.9,
    status: 'Open'
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'Famous Cebuano street food and grilled favorites served with puso (hanging rice).',
    location: 'Fuente Osmeña, Cebu',
    image: 'https://picsum.photos/seed/larsian/600/400',
    rating: 4.7,
    status: 'Open'
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food. Best known for Ginabot (crispy pork intestines).',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/pungkopungko/600/400',
    rating: 4.6,
    status: 'Open'
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon that Anthony Bourdain called "the best pig ever."',
    location: 'IT Park, Cebu',
    image: 'https://picsum.photos/seed/zubuchon/600/400',
    rating: 4.8,
    status: 'Open'
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'Classic Cebuano comfort food and their legendary Brian\'s Ribs.',
    location: 'The Terraces, Cebu',
    image: 'https://picsum.photos/seed/casaverde/600/400',
    rating: 4.5,
    status: 'Open'
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood caught daily from the shores of Mactan Island.',
    location: 'Lapu-Lapu City',
    image: 'https://picsum.photos/seed/mactanseafood/600/400',
    rating: 4.4,
    status: 'Closed'
  }
]

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold mb-4">Cebu&apos;s Finest Restaurants</h1>
          <p className="text-muted-foreground">Discover the authentic flavors of Cebu, from street food to gourmet lechon.</p>
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
                  <Button className="w-full" variant="outline">View Cebuano Menu</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
