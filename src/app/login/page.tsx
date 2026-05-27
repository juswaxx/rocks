"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth, useFirestore } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } from '@/lib/admin-demo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const db = useFirestore()
  const router = useRouter()
  const { toast } = useToast()

  const provisionAdminProfile = async (uid: string) => {
    await setDoc(doc(db, 'users', uid), {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: 'admin',
      createdAt: serverTimestamp(),
    }, { merge: true })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth || !db) return
    
    setLoading(true)
    try {
      const normalizedEmail = email.trim().toLowerCase()
      const isAdminLogin = normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD

      try {
        const credential = await signInWithEmailAndPassword(auth, normalizedEmail, password)
        if (isAdminLogin) {
          await provisionAdminProfile(credential.user.uid)
        }
      } catch (error: any) {
        if (!isAdminLogin) {
          throw error
        }

        try {
          const credential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
          await updateProfile(credential.user, { displayName: ADMIN_NAME })
          await provisionAdminProfile(credential.user.uid)
        } catch {
          throw error
        }
      }

      toast({
        title: "Login Successful",
        description: "Welcome back to Puff N' Plate!",
      })
      router.push(isAdminLogin ? '/admin/dashboard' : '/')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-headline font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-primary/5 p-4 text-sm">
                <p className="font-bold text-primary">Admin account</p>
                <p className="mt-1 text-muted-foreground">Email: {ADMIN_EMAIL}</p>
                <p className="text-muted-foreground">Password: {ADMIN_PASSWORD}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
