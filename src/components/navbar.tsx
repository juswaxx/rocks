"use client"

import Link from 'next/link'
import { ShoppingCart, User, LogOut, Menu as MenuIcon, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUser, useAuth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { items } = useCart()
  const { user, loading } = useUser()
  const auth = useAuth()
  const router = useRouter()
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth)
      router.push('/')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-headline font-bold text-primary">Puff N&apos; Plate</span>
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="/restaurants" className="text-sm font-medium hover:text-primary transition-colors">Restaurants</Link>
            {user && <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">My Orders</Link>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]" variant="accent">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="font-medium">
                    {user.displayName || user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Order History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">Login</Button>
              </Link>
            )
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/restaurants" className="text-lg font-medium">Browse Restaurants</Link>
                {user && <Link href="/orders" className="text-lg font-medium">Order History</Link>}
                <Link href="/cart" className="text-lg font-medium">Shopping Cart ({itemCount})</Link>
                {!user && <Link href="/login" className="text-lg font-medium">Login</Link>}
                {user && <Link href="/profile" className="text-lg font-medium">My Profile</Link>}
                {user && (
                  <Button variant="destructive" className="mt-4" onClick={handleLogout}>
                    Log out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
