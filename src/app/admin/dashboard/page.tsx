
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  Store, 
  ClipboardList, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter
} from 'lucide-react'
import { 
  ChartContainer, 
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserRole } from '@/firebase'

const STATS = [
  { label: 'Total Revenue', value: '₱128,450', change: '+12.5%', trend: 'up', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Active Orders', value: '24', change: '+4', trend: 'up', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'New Customers', value: '156', change: '-2.4%', trend: 'down', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Open Disputes', value: '2', change: '0', trend: 'neutral', icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
]

const CHART_DATA = [
  { name: 'Mon', total: 4500 },
  { name: 'Tue', total: 3200 },
  { name: 'Wed', total: 5100 },
  { name: 'Thu', total: 4800 },
  { name: 'Fri', total: 7200 },
  { name: 'Sat', total: 9400 },
  { name: 'Sun', total: 8800 },
]

export default function AdminDashboard() {
  const router = useRouter()
  const { isAdmin, loading } = useUserRole()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace('/')
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <p className="text-sm font-bold text-muted-foreground">Checking access...</p>
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
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r bg-background h-[calc(100vh-80px)] sticky top-20 p-6">
          <div className="space-y-2 mb-8">
            <h3 className="px-4 text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Main Menu</h3>
            <Link href="/admin/dashboard" className="block">
              <Button variant="secondary" className="w-full justify-start h-12 rounded-xl px-4 gap-3 font-bold">
                <BarChart3 className="h-5 w-5" /> Dashboard
              </Button>
            </Link>
            <Link href="/admin/orders" className="block">
              <Button variant="ghost" className="w-full justify-start h-12 rounded-xl px-4 gap-3 font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <ClipboardList className="h-5 w-5" /> Orders
              </Button>
            </Link>
            <Link href="/admin/restaurants" className="block">
              <Button variant="ghost" className="w-full justify-start h-12 rounded-xl px-4 gap-3 font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <Store className="h-5 w-5" /> Restaurants
              </Button>
            </Link>
            <Link href="/admin/users" className="block">
              <Button variant="ghost" className="w-full justify-start h-12 rounded-xl px-4 gap-3 font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <Users className="h-5 w-5" /> Users
              </Button>
            </Link>
          </div>
          
          <div className="mt-auto p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
            <h4 className="font-bold text-sm mb-2 text-primary">Need Help?</h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Access the admin knowledge base or contact support.</p>
            <Button size="sm" className="w-full rounded-xl font-bold">Documentation</Button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-headline font-black mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground font-medium">Welcome back, Admin. Monitoring system performance...</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search records..." className="pl-10 h-11 rounded-xl w-64 bg-background border-muted" />
              </div>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl"><Filter className="h-5 w-5" /></Button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {STATS.map((stat, i) => (
              <Card key={i} className="border-none shadow-soft overflow-hidden rounded-[2rem] bg-card hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className={cn(
                      "rounded-full px-3 py-1 font-bold text-[10px]",
                      stat.trend === 'up' ? "text-green-600 bg-green-50" : 
                      stat.trend === 'down' ? "text-red-600 bg-red-50" : "text-gray-600"
                    )}>
                      {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 mr-1 inline" />}
                      {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 mr-1 inline" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black italic">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="lg:col-span-2 border-none shadow-soft rounded-[3rem] bg-card overflow-hidden">
              <CardHeader className="p-10 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black">Revenue Analytics</CardTitle>
                  <Button variant="ghost" className="text-primary font-bold">Weekly View</Button>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="h-[400px]">
                  <ChartContainer config={{
                    total: {
                      label: "Revenue",
                      color: "hsl(var(--primary))",
                    },
                  }}>
                    <BarChart data={CHART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₱${v}`} />
                      <Bar 
                        dataKey="total" 
                        fill="var(--color-total)" 
                        radius={[8, 8, 0, 0]} 
                        barSize={40}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft rounded-[3rem] bg-card overflow-hidden">
              <CardHeader className="p-10 border-b">
                <CardTitle className="text-2xl font-black">Real-time Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center font-black text-primary italic">
                        #{i}
                      </div>
                      <div>
                        <p className="font-bold text-lg leading-none mb-1">ORD-992{i}</p>
                        <p className="text-xs text-muted-foreground font-medium">Cebu Lechon House • 2m ago</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-600 border-none font-black uppercase text-[10px] tracking-widest px-3 py-1.5">Preparing</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest border-2 hover:bg-primary/5 hover:text-primary transition-all">
                  Full Order Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
