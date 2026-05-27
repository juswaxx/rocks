"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BarChart3, ClipboardList, Store, Users } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { useUserRole } from '@/firebase'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { href: '/admin/restaurants', label: 'Restaurants', icon: Store },
  { href: '/admin/users', label: 'Users', icon: Users },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAdmin, loading } = useUserRole()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace('/login')
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <p className="text-sm font-bold text-muted-foreground">Checking admin access...</p>
        </main>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="flex">
        <aside className="hidden lg:flex w-72 flex-col border-r bg-background h-[calc(100vh-80px)] sticky top-20 p-5">
          <div className="mb-6 px-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Restaurant Admin</p>
            <h2 className="mt-1 text-xl font-black">Puff N&apos; Plate</h2>
          </div>
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn('h-11 w-full justify-start gap-3 rounded-lg', !active && 'text-muted-foreground')}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Button key={item.href} asChild variant={pathname === item.href ? 'secondary' : 'outline'} size="sm" className="shrink-0 rounded-lg">
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
