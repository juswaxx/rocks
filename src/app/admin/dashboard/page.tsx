
"use client"

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Users, 
  Store, 
  ClipboardList, 
  TrendingUp, 
  Clock, 
  AlertCircle 
} from 'lucide-react'
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const STATS = [
  { label: 'Total Sales', value: '₱128,450', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Active Orders', value: '24', icon: Clock, color: 'text-primary' },
  { label: 'Pending Verification', value: '12', icon: AlertCircle, color: 'text-yellow-500' },
  { label: 'Total Users', value: '1,240', icon: Users, color: 'text-blue-500' },
]

const DATA = [
  { name: 'Mon', total: 4500 },
  { name: 'Tue', total: 3200 },
  { name: 'Wed', total: 5100 },
  { name: 'Thu', total: 4800 },
  { name: 'Fri', total: 7200 },
  { name: 'Sat', total: 9400 },
  { name: 'Sun', total: 8800 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex">
        {/* Simple Side Nav */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background min-h-[calc(100vh-64px)] p-4 gap-2">
          <Link href="/admin/dashboard">
            <Button variant="secondary" className="w-full justify-start"><BarChart3 className="mr-2 h-4 w-4" /> Dashboard</Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start"><ClipboardList className="mr-2 h-4 w-4" /> Orders</Button>
          </Link>
          <Link href="/admin/restaurants">
            <Button variant="ghost" className="w-full justify-start"><Store className="mr-2 h-4 w-4" /> Restaurants</Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start"><Users className="mr-2 h-4 w-4" /> Users</Button>
          </Link>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-headline font-bold mb-2">Admin Overview</h1>
            <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening with Puff N&apos; Plate today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STATS.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₱${value}`} />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between text-sm pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold">ORD-992{i}</p>
                      <p className="text-xs text-muted-foreground">2 mins ago</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">Pending</Badge>
                  </div>
                ))}
                <Button variant="link" className="w-full text-primary h-auto p-0 pt-4">View All Orders</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

import Link from 'next/link'
