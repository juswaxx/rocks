
export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export type Restaurant = {
  id: string
  name: string
  description: string
  location: string
  image: string
  rating: number
  hours: { open: string; close: string }
  menu: MenuItem[]
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'cebu-lechon-house',
    name: 'Cebu Lechon House',
    description: 'The most iconic crispy roasted pig in Cebu City. A must-try for every local and tourist.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/lechonhouse/600/400',
    rating: 4.9,
    hours: { open: '10:00', close: '21:00' },
    menu: [
      { id: 'clh-1', name: 'Cebu Lechon (1/4 kg)', description: 'Classic Cebuano roasted pig with legendary crispy skin and juicy meat.', price: 250, category: 'Signature Lechon', image: 'https://picsum.photos/seed/lechon1/400/300' },
      { id: 'clh-2', name: 'Cebu Lechon (1/2 kg)', description: 'Perfect for sharing. Served with local soy-vinegar dip.', price: 480, category: 'Signature Lechon', image: 'https://picsum.photos/seed/lechon2/400/300' },
      { id: 'clh-3', name: 'Lechon Paksiw', description: 'Lechon stewed in a rich vinegar and liver sauce broth.', price: 180, category: 'Main Dishes', image: 'https://picsum.photos/seed/paksiw/400/300' },
      { id: 'clh-4', name: 'Pork Dinuguan', description: 'Savory pork blood stew, a perfect pair for lechon and puso.', price: 165, category: 'Main Dishes', image: 'https://picsum.photos/seed/dinuguan/400/300' },
      { id: 'clh-5', name: 'Cebu Ngohiong (3pcs)', description: 'Deep-fried battered vegetable rolls with five-spice seasoning.', price: 60, category: 'Sides', image: 'https://picsum.photos/seed/ngohiong1/400/300' },
      { id: 'clh-6', name: 'Puso (Hanging Rice)', description: 'Rice boiled in diamond-shaped coconut leaf pouches.', price: 12, category: 'Sides', image: 'https://picsum.photos/seed/puso1/400/300' },
      { id: 'clh-7', name: 'Leche Flan', description: 'Rich and creamy custard with a caramel glaze.', price: 120, category: 'Desserts', image: 'https://picsum.photos/seed/flan/400/300' },
    ]
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'The famous open-air barbecue hub of Cebu, serving the best grilled skewers since 1970.',
    location: 'Fuente Osmeña, Cebu',
    image: 'https://picsum.photos/seed/larsian/600/400',
    rating: 4.7,
    hours: { open: '18:00', close: '02:00' },
    menu: [
      { id: 'lbbq-1', name: 'Pork BBQ Stick', description: 'Sweet and savory grilled pork skewers, a Larsian classic.', price: 18, category: 'Grill', image: 'https://picsum.photos/seed/porkbbq/400/300' },
      { id: 'lbbq-2', name: 'Chicken Inasal (Pecho)', description: 'Grilled chicken breast marinated in calamansi and ginger.', price: 135, category: 'Grill', image: 'https://picsum.photos/seed/inasal/400/300' },
      { id: 'lbbq-3', name: 'Grilled Liempo', description: 'Thick-cut pork belly grilled over charcoal.', price: 150, category: 'Grill', image: 'https://picsum.photos/seed/liempo/400/300' },
      { id: 'lbbq-4', name: 'Chorizo de Cebu', description: 'Sweet local sausage grilled until slightly charred.', price: 25, category: 'Grill', image: 'https://picsum.photos/seed/chorizo/400/300' },
      { id: 'lbbq-5', name: 'Grilled Squid', description: 'Large fresh squid stuffed with tomatoes and onions.', price: 280, category: 'Seafood', image: 'https://picsum.photos/seed/squid/400/300' },
      { id: 'lbbq-6', name: 'Grilled Tuna Belly', description: 'Fleshy tuna belly grilled with a buttery glaze.', price: 320, category: 'Seafood', image: 'https://picsum.photos/seed/tunabelly/400/300' },
      { id: 'lbbq-7', name: 'Puso Bundle (5pcs)', description: 'A set of 5 hanging rice portions.', price: 50, category: 'Sides', image: 'https://picsum.photos/seed/pusobundle/400/300' },
    ]
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food experience. Famous for Ginabot and Ngohiong.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/pungkopungko/600/400',
    rating: 4.6,
    hours: { open: '06:00', close: '22:00' },
    menu: [
      { id: 'ppc-1', name: 'Ginabot (Crispy Intestine)', description: 'The star of Pungko-Pungko. Deep-fried crispy pork mesentery.', price: 45, category: 'Fried Favorites', image: 'https://picsum.photos/seed/ginabot1/400/300' },
      { id: 'ppc-2', name: 'Fried Pork Meat', description: 'Breaded and deep-fried savory pork chunks.', price: 40, category: 'Fried Favorites', image: 'https://picsum.photos/seed/friedpork/400/300' },
      { id: 'ppc-3', name: 'Special Ngohiong', description: 'Five-spice seasoned vegetable roll, crispy outside.', price: 15, category: 'Fried Favorites', image: 'https://picsum.photos/seed/ngohiong2/400/300' },
      { id: 'ppc-4', name: 'Fried Meatballs (2pcs)', description: 'Crispy fried local-style meatballs.', price: 25, category: 'Fried Favorites', image: 'https://picsum.photos/seed/meatballs/400/300' },
      { id: 'ppc-5', name: 'Lumpia Toge', description: 'Crispy spring rolls filled with fresh bean sprouts.', price: 12, category: 'Local Snacks', image: 'https://picsum.photos/seed/toge/400/300' },
      { id: 'ppc-6', name: 'Sparkle Fruit Soda', description: 'The iconic Cebuano lemon-lime soda.', price: 20, category: 'Drinks', image: 'https://picsum.photos/seed/sparkle/400/300' },
      { id: 'ppc-7', name: 'Mountain Dew (Canned)', description: 'Refreshing citrus soda.', price: 45, category: 'Drinks', image: 'https://picsum.photos/seed/mtdew/400/300' },
    ]
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon made with all-natural ingredients. "The best pig ever" - Anthony Bourdain.',
    location: 'IT Park, Cebu',
    image: 'https://picsum.photos/seed/zubuchon/600/400',
    rating: 4.8,
    hours: { open: '10:00', close: '21:00' },
    menu: [
      { id: 'zb-1', name: 'Zubuchon Lechon (Small)', description: 'Signature roasted pig using only organic ingredients.', price: 390, category: 'Signature Lechon', image: 'https://picsum.photos/seed/zubulechon/400/300' },
      { id: 'zb-2', name: 'Zubuchon Sisig', description: 'Savory chopped lechon with onions and spices on a sizzler.', price: 340, category: 'Cebu Specialties', image: 'https://picsum.photos/seed/sisig/400/300' },
      { id: 'zb-3', name: 'Slow-Roasted Prichon', description: 'Twice-cooked lechon for extra crispiness.', price: 350, category: 'Signature Lechon', image: 'https://picsum.photos/seed/prichon/400/300' },
      { id: 'zb-4', name: 'Sinigang na Lechon', description: 'Lechon meat in a sour tamarind-based broth with local vegetables.', price: 380, category: 'Cebu Specialties', image: 'https://picsum.photos/seed/sinigang/400/300' },
      { id: 'zb-5', name: 'Kamias Shake', description: 'Our famous refreshing green bilimbi fruit shake.', price: 125, category: 'Specialty Drinks', image: 'https://picsum.photos/seed/kamias/400/300' },
      { id: 'zb-6', name: 'Fresh Mango Shake', description: 'Made with the sweetest Cebu mangoes.', price: 140, category: 'Specialty Drinks', image: 'https://picsum.photos/seed/mango/400/300' },
    ]
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'The home of the legendary Brian\'s Ribs and Cebu\'s most famous oversized burgers.',
    location: 'The Terraces, Cebu',
    image: 'https://picsum.photos/seed/casaverde/600/400',
    rating: 4.5,
    hours: { open: '10:00', close: '22:00' },
    menu: [
      { id: 'cv-1', name: 'Brian\'s Ribs', description: 'Baked pork ribs with a sweet and tangy BBQ sauce.', price: 465, category: 'Signature Ribs', image: 'https://picsum.photos/seed/ribs/400/300' },
      { id: 'cv-2', name: 'The Mighty Ton', description: 'A giant burger meant for 4-5 people. A Cebu legend.', price: 895, category: 'Burgers & Steaks', image: 'https://picsum.photos/seed/giantburger/400/300' },
      { id: 'cv-3', name: 'Casa Verde Burger', description: 'Premium beef patty with all the classic fixings.', price: 245, category: 'Burgers & Steaks', image: 'https://picsum.photos/seed/burger/400/300' },
      { id: 'cv-4', name: 'Seafood Carbonara', description: 'Creamy pasta with shrimps, mussels, and squid.', price: 320, category: 'Pasta', image: 'https://picsum.photos/seed/carbonara/400/300' },
      { id: 'cv-5', name: 'Death by Chocolate', description: 'Layered chocolate cake with ice cream and syrup.', price: 230, category: 'Desserts', image: 'https://picsum.photos/seed/deathchocolate/400/300' },
      { id: 'cv-6', name: 'Milky Way', description: 'The tallest milkshake tower in Cebu.', price: 280, category: 'Desserts', image: 'https://picsum.photos/seed/milkyway/400/300' },
    ]
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood delicacies served by the shores of Mactan. Fresh catch everyday!',
    location: 'Lapu-Lapu City',
    image: 'https://picsum.photos/seed/mactanseafood/600/400',
    rating: 4.4,
    hours: { open: '11:00', close: '23:00' },
    menu: [
      { id: 'msg-1', name: 'Baked Scallops with Cheese', description: 'Fresh Mactan scallops baked with butter and garlic cheese.', price: 220, category: 'Fresh Catch', image: 'https://picsum.photos/seed/scallops/400/300' },
      { id: 'msg-2', name: 'Crispy Calamares', description: 'Deep-fried squid rings served with spicy mayo dip.', price: 240, category: 'Starters', image: 'https://picsum.photos/seed/squid/400/300' },
      { id: 'msg-3', name: 'Cebuano Fish Kinilaw', description: 'Fresh raw fish marinated in coconut vinegar and ginger.', price: 280, category: 'Starters', image: 'https://picsum.photos/seed/kinilaw/400/300' },
      { id: 'msg-4', name: 'Grilled Buttered Prawns', description: 'Giant prawns grilled with local garlic butter.', price: 450, category: 'Fresh Catch', image: 'https://picsum.photos/seed/prawns/400/300' },
      { id: 'msg-5', name: 'Steamed Lapu-Lapu', description: 'Whole grouper steamed with soy sauce and ginger.', price: 650, category: 'Grilled Specials', image: 'https://picsum.photos/seed/lapulapu/400/300' },
      { id: 'msg-6', name: 'Seafood Platter', description: 'A massive mix of crabs, shrimps, and fish for the family.', price: 1200, category: 'Grilled Specials', image: 'https://picsum.photos/seed/platter/400/300' },
    ]
  }
]

export function isRestaurantOpen(hours: { open: string; close: string }) {
  const now = new Date()
  const manilaTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(now)

  const [currentHour, currentMin] = manilaTime.split(':').map(Number)
  const currentTimeInMinutes = currentHour * 60 + currentMin

  const [openHour, openMin] = hours.open.split(':').map(Number)
  const [closeHour, closeMin] = hours.close.split(':').map(Number)

  const openInMins = openHour * 60 + openMin
  const closeInMins = closeHour * 60 + closeMin

  if (closeInMins < openInMins) {
    return currentTimeInMinutes >= openInMins || currentTimeInMinutes < closeInMins
  }
  return currentTimeInMinutes >= openInMins && currentTimeInMinutes < closeInMins
}

export function format12h(time24: string) {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}
