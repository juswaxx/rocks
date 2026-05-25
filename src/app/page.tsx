
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { ArrowRight, Utensils, CreditCard, Clock } from 'lucide-react'

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg')
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white text-center overflow-hidden">
        <Image 
          src={heroImg?.imageUrl || 'https://picsum.photos/seed/cebufood/1200/600'} 
          alt="Cebuano Cuisine" 
          fill
          className="object-cover brightness-50"
          data-ai-hint="cebu lechon"
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">Puff N&apos; Plate Cebu</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience the authentic taste of the Queen City of the South, delivered right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/restaurants">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Explore Cebu Flavors <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur hover:bg-white/20">
                Join the Cebu Foodie Club
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline font-bold mb-16">Why Cebu Loves Puff N&apos; Plate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Utensils className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">The Best Lechon</h3>
              <p className="text-muted-foreground">We partner with the most legendary Lechon houses in Cebu City and Talisay.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cashless in Cebu</h3>
              <p className="text-muted-foreground">Pay via GCash or Bank Transfer seamlessly. COD also available for your convenience.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Island-Wide Speed</h3>
              <p className="text-muted-foreground">From Mactan to IT Park, we ensure your food arrives hot and fresh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Teaser Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-headline font-bold mb-6">Craving Mango Float?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Cebu is known for the sweetest mangoes in the world. Enjoy our selection of mango-based desserts and classic Halo-Halo.
              </p>
              <Link href="/restaurants">
                <Button variant="link" className="text-primary text-lg font-bold p-0">
                  Browse Cebuano Desserts <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'menu-halo-halo')?.imageUrl || 'https://picsum.photos/seed/halohalo/400/300'} 
                alt="Halo Halo" 
                fill
                className="object-cover"
                data-ai-hint="filipino dessert"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-12 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-headline mb-4">Puff N&apos; Plate Cebu</p>
          <p className="opacity-60 mb-8">Serving the heart of Cebu with every plate.</p>
          <div className="flex justify-center gap-6 mb-8">
            <Link href="#" className="hover:text-primary">Our Story</Link>
            <Link href="#" className="hover:text-primary">Cebu Support</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          </div>
          <p className="text-sm opacity-40">&copy; 2024 Puff N&apos; Plate Cebu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
