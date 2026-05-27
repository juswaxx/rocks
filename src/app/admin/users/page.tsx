"use client"

import { collection, orderBy, query } from 'firebase/firestore'
import { Crown, Mail, Search, Shield, UserRound } from 'lucide-react'
import { AdminShell } from '@/components/admin-shell'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase'
import { DEMO_ADMIN_USERS, peso } from '@/lib/admin-demo'

type AdminUser = {
  id: string
  name?: string
  email?: string
  role?: string
  orders?: number
  totalSpent?: number
}

export default function AdminUsersPage() {
  const db = useFirestore()
  const usersQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'users'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data } = useCollection<any>(usersQuery)
  const users: AdminUser[] = data?.length ? data : DEMO_ADMIN_USERS
  const admins = users.filter((user) => user.role === 'admin').length

  return (
    <AdminShell>
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Users & Roles</h1>
        <p className="mt-2 text-muted-foreground">Review customer accounts, admin access, and ordering activity.</p>
      </header>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total users</p>
            <p className="mt-1 text-2xl font-black">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Admins</p>
            <p className="mt-1 text-2xl font-black">{admins}</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Customers</p>
            <p className="mt-1 text-2xl font-black">{users.length - admins}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-11 rounded-lg pl-10" placeholder="Search users" />
      </div>

      <Card className="rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Orders</TableHead>
                <TableHead className="hidden md:table-cell">Total spent</TableHead>
                <TableHead className="hidden lg:table-cell">User ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-bold">{user.name || 'Unnamed User'}</p>
                        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email || 'No email'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="gap-1">
                      {user.role === 'admin' ? <Crown className="h-3 w-3" /> : <UserRound className="h-3 w-3" />}
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-bold">{user.orders || 0}</TableCell>
                  <TableCell className="hidden md:table-cell font-bold">{peso(user.totalSpent || 0)}</TableCell>
                  <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-lg border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-5">
          <Shield className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium">Admin access is granted by setting a user document role to <span className="font-black">admin</span>.</p>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
