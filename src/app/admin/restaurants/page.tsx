"use client"

import Image from 'next/image'
import { Clock, Menu, Plus, Star, Store } from 'lucide-react'
import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RESTAURANTS, format12h, isRestaurantOpen } from '@/lib/restaurants'
import { peso } from '@/lib/admin-demo'

export default function AdminRestaurantsPage() {
  const totalMenuItems = RESTAURANTS.reduce((sum, restaurant) => sum + restaurant.menu.length, 0)
  const openBranches = RESTAURANTS.filter((restaurant) => isRestaurantOpen(restaurant.hours)).length

  return (
    <AdminShell>
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Restaurants & Menu</h1>
          <p className="mt-2 text-muted-foreground">Manage branch visibility, operating hours, and food catalog details.</p>
        </div>
        <Button className="rounded-lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Restaurant
        </Button>
      </header>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Restaurant branches</p>
            <p className="mt-1 text-2xl font-black">{RESTAURANTS.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Open now</p>
            <p className="mt-1 text-2xl font-black">{openBranches}</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Menu items</p>
            <p className="mt-1 text-2xl font-black">{totalMenuItems}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-5">
        <Input className="h-11 rounded-lg" placeholder="Search restaurants or menu items" />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {RESTAURANTS.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden rounded-lg">
            <div className="relative h-48">
              <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                <div>
                  <h2 className="text-xl font-black">{restaurant.name}</h2>
                  <p className="text-sm opacity-90">{restaurant.location}</p>
                </div>
                <Badge className={isRestaurantOpen(restaurant.hours) ? 'bg-green-600' : 'bg-destructive'}>
                  {isRestaurantOpen(restaurant.hours) ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3" /> Rating</p>
                  <p className="font-black">{restaurant.rating}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> Hours</p>
                  <p className="text-sm font-black">{format12h(restaurant.hours.open)} - {format12h(restaurant.hours.close)}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><Menu className="h-3 w-3" /> Items</p>
                  <p className="font-black">{restaurant.menu.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                {restaurant.menu.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted/30 p-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold">{item.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="shrink-0 font-black">{peso(item.price)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.categories.map((category) => (
                  <Badge key={category} variant="outline">{category}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-lg border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Store className="h-5 w-5" /> Admin note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Menu data is currently stored in the app catalog. The controls are ready for a Firestore-backed menu editor when you add restaurant write rules.
        </CardContent>
      </Card>
    </AdminShell>
  )
}
