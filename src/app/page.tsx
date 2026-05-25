
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { ArrowRight, Utensils, CreditCard, Clock, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg')
  const haloHaloImg = PlaceHolderImages.find(img => img.id === 'menu-halo-halo')?.imageUrl || 'https://picsum.photos/seed/halohalo/800/600'
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <Image 
          src={heroImg?.imageUrl || 'https://picsum.photos/seed/cebufood/1200/600'} 
          alt="Cebuano Cuisine" 
          fill
          className="object-cover brightness-[0.4] scale-105"
          priority
          data-ai-hint="cebu lechon"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-6 py-1.5 px-4 bg-primary text-white text-sm uppercase tracking-widest font-bold border-none shadow-lg shadow-primary/20">Cebu's #1 Delivery</Badge>
            <h1 className="text-6xl md:text-8xl font-headline font-black text-white mb-8 leading-[1.1]">
              The Queen City's <span className="text-primary italic">Best Flavors</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-xl leading-relaxed">
              From legendary lechon to sweet Mactan mangoes, we bring the soul of Cebuano cuisine straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/restaurants">
                <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/40 group">
                  Start Ordering <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-xl font-bold bg-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-8 text-white/60">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                    <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">Joined by <span className="text-white font-bold">12,000+</span> Cebuano foodies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-black mb-4">Why Cebu Chooses Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We're built by locals, for locals. Experience the difference in every bite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: Utensils, 
                title: "Curated Lechon Masters", 
                desc: "We only partner with established names like Rico's, CNT, and House of Lechon." 
              },
              { 
                icon: CreditCard, 
                title: "Seamless Local Payments", 
                desc: "Pay via GCash, Maya, or Bank Transfer instantly. No hidden fees, just food." 
              },
              { 
                icon: Clock, 
                title: "Island-Wide Express", 
                desc: "Our Cebu-native riders know the shortcuts from IT Park to Banawa like the back of their hand." 
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact Teaser */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <Image 
                src={haloHaloImg} 
                alt="Halo Halo" 
                fill 
                className="object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-foreground/50 to-foreground" />
            </div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-5xl md:text-6xl font-headline font-black text-white mb-8 leading-tight">Craving the Sweetest <span className="text-primary italic">Cebu Mangoes?</span></h2>
              <p className="text-xl text-white/60 mb-12">
                It's not just food, it's a Cebuano ritual. Get the world's best mangoes and classic desserts delivered within 30 minutes.
              </p>
              <Link href="/restaurants">
                <Button className="h-16 px-10 rounded-2xl text-xl font-bold shadow-xl shadow-black/20 group">
                  Order Desserts Now <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <p className="text-3xl font-headline font-black italic text-primary mb-6">Puff N' Plate Cebu</p>
              <p className="text-white/40 max-w-sm mb-8">Bringing the authentic culinary heritage of Cebu to your doorstep since 2024. Quality you can taste, speed you can trust.</p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <span className="text-sm font-bold">F{i}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cebu Support</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Be a Rider</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Partner with Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/20">&copy; 2024 Puff N' Plate Cebu. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <div className="h-6 w-10 bg-white/5 rounded border border-white/10" />
              <div className="h-6 w-10 bg-white/5 rounded border border-white/10" />
              <div className="h-6 w-10 bg-white/5 rounded border border-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
