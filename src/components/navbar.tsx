
"use client"

import Link from 'next/link'
import { ShoppingCart, LogOut, Menu as MenuIcon, LayoutDashboard, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUser, useAuth, useUserRole } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  const { items } = useCart()
  const { user, loading } = useUser()
  const { isAdmin } = useUserRole()
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-headline font-black text-primary italic">Puff N' Plate</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/restaurants" className="text-sm font-semibold hover:text-primary transition-colors">Restaurants</Link>
            {user && <Link href="/orders" className="text-sm font-semibold hover:text-primary transition-colors">My Orders</Link>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent animate-in zoom-in" variant="accent">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-full">
                    <Avatar className="h-11 w-11 border-2 border-primary/20">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-xl border-muted">
                  <div className="flex items-center gap-3 p-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-primary/5 text-primary">
                        {user.displayName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm truncate max-w-[150px]">{user.displayName || 'Foodie'}</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                    <Link href="/orders" className="flex items-center"><History className="mr-3 h-4 w-4" /> Order History</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                      <Link href="/admin/dashboard" className="flex items-center"><LayoutDashboard className="mr-3 h-4 w-4" /> Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive rounded-lg cursor-pointer py-2.5" onClick={handleLogout}>
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-bold">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 font-bold shadow-lg shadow-primary/20">Login</Button>
              </Link>
            )
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <div className="flex flex-col gap-6 mt-12">
                <Link href="/" className="text-2xl font-headline font-black text-primary italic mb-4">Puff N' Plate</Link>
                <Link href="/restaurants" className="text-xl font-bold flex items-center justify-between">Browse Restaurants <Badge variant="outline">Hot</Badge></Link>
                {user && <Link href="/orders" className="text-xl font-bold">My Order History</Link>}
                <Link href="/cart" className="text-xl font-bold">Shopping Cart ({itemCount})</Link>
                {!user && (
                  <Link href="/login" className="mt-8">
                    <Button className="w-full h-14 rounded-2xl text-lg font-bold">Login to Order</Button>
                  </Link>
                )}
                {user && (
                  <Button variant="destructive" className="mt-8 h-14 rounded-2xl text-lg font-bold" onClick={handleLogout}>
                    <LogOut className="mr-3 h-5 w-5" /> Log out
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
