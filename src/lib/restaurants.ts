
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
      { id: 'clh-1', name: 'Cebu Lechon (1/4 kg)', description: 'Classic Cebuano roasted pig with crispy skin.', price: 250, category: 'Signature Lechon', image: 'https://picsum.photos/seed/lechon1/400/300' },
      { id: 'clh-2', name: 'Cebu Lechon (1/2 kg)', description: 'Good for 2-3 people.', price: 480, category: 'Signature Lechon', image: 'https://picsum.photos/seed/lechon2/400/300' },
      { id: 'clh-3', name: 'Lechon Paksiw', description: 'Leftover lechon stewed in vinegar and liver sauce.', price: 180, category: 'Main Dish', image: 'https://picsum.photos/seed/paksiw/400/300' },
      { id: 'clh-4', name: 'Puso (Hanging Rice)', description: 'Heart-shaped rice boiled in coconut leaves.', price: 10, category: 'Sides', image: 'https://picsum.photos/seed/puso1/400/300' },
    ]
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'Famous Cebuano street food and grilled favorites served with puso (hanging rice).',
    location: 'Fuente Osmeña, Cebu',
    image: 'https://picsum.photos/seed/larsian/600/400',
    rating: 4.7,
    hours: { open: '18:00', close: '02:00' },
    menu: [
      { id: 'lbbq-1', name: 'Pork BBQ Stick', description: 'Sweet and savory grilled pork.', price: 15, category: 'Grill', image: 'https://picsum.photos/seed/porkbbq/400/300' },
      { id: 'lbbq-2', name: 'Chicken Inasal', description: 'Grilled chicken marinated in calamansi and ginger.', price: 120, category: 'Grill', image: 'https://picsum.photos/seed/inasal/400/300' },
      { id: 'lbbq-3', name: 'Chorizo de Cebu', description: 'Sweet local sausage grilled to perfection.', price: 25, category: 'Grill', image: 'https://picsum.photos/seed/chorizo/400/300' },
      { id: 'lbbq-4', name: 'Puso', description: 'Hanging rice.', price: 10, category: 'Sides', image: 'https://picsum.photos/seed/puso2/400/300' },
    ]
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food. Best known for Ginabot (crispy pork intestines).',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/pungkopungko/600/400',
    rating: 4.6,
    hours: { open: '06:00', close: '22:00' },
    menu: [
      { id: 'ppc-1', name: 'Ginabot', description: 'Crispy fried pork mesentery.', price: 45, category: 'Fried Favorites', image: 'https://picsum.photos/seed/ginabot1/400/300' },
      { id: 'ppc-2', name: 'Ngohiong', description: 'Cebuano five-spice vegetable spring roll.', price: 15, category: 'Fried Favorites', image: 'https://picsum.photos/seed/ngohiong1/400/300' },
      { id: 'ppc-3', name: 'Fried Crab', description: 'Small crispy crabs.', price: 20, category: 'Fried Favorites', image: 'https://picsum.photos/seed/crab/400/300' },
      { id: 'ppc-4', name: 'Sparkle Drink', description: 'Classic Cebuano fruit soda.', price: 25, category: 'Drinks', image: 'https://picsum.photos/seed/sparkle/400/300' },
    ]
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon that Anthony Bourdain called "the best pig ever."',
    location: 'IT Park, Cebu',
    image: 'https://picsum.photos/seed/zubuchon/600/400',
    rating: 4.8,
    hours: { open: '10:00', close: '21:00' },
    menu: [
      { id: 'zb-1', name: 'Zubuchon Lechon (Small)', description: 'Roasted pig with no MSG or soy sauce.', price: 350, category: 'Main Lechon', image: 'https://picsum.photos/seed/zubulechon/400/300' },
      { id: 'zb-2', name: 'Prichon', description: 'Twice-cooked fried lechon.', price: 320, category: 'Main Lechon', image: 'https://picsum.photos/seed/prichon/400/300' },
      { id: 'zb-3', name: 'Kamias Shake', description: 'Unique sour and refreshing fruit shake.', price: 110, category: 'Specialty Drinks', image: 'https://picsum.photos/seed/kamias/400/300' },
    ]
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'Classic Cebuano comfort food and their legendary Brian\'s Ribs.',
    location: 'The Terraces, Cebu',
    image: 'https://picsum.photos/seed/casaverde/600/400',
    rating: 4.5,
    hours: { open: '10:00', close: '22:00' },
    menu: [
      { id: 'cv-1', name: 'Brian\'s Ribs', description: 'Legendary sweet and savory pork ribs.', price: 450, category: 'Signature Ribs', image: 'https://picsum.photos/seed/ribs/400/300' },
      { id: 'cv-2', name: 'Death by Chocolate', description: 'Intense chocolate cake dessert.', price: 220, category: 'Desserts', image: 'https://picsum.photos/seed/chocolate/400/300' },
      { id: 'cv-3', name: 'The Mighty Ton', description: 'Giant burger for sharing.', price: 850, category: 'Burgers', image: 'https://picsum.photos/seed/giantburger/400/300' },
    ]
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood caught daily from the shores of Mactan Island.',
    location: 'Lapu-Lapu City',
    image: 'https://picsum.photos/seed/mactanseafood/600/400',
    rating: 4.4,
    hours: { open: '11:00', close: '23:00' },
    menu: [
      { id: 'msg-1', name: 'Grilled Scallops', description: 'Buttery scallops grilled in shell.', price: 180, category: 'Seafood', image: 'https://picsum.photos/seed/scallops/400/300' },
      { id: 'msg-2', name: 'Calamares', description: 'Crispy fried squid rings.', price: 220, category: 'Seafood', image: 'https://picsum.photos/seed/squid/400/300' },
      { id: 'msg-3', name: 'Kinilaw na Isda', description: 'Fresh fish ceviche Cebuano style.', price: 250, category: 'Appetizers', image: 'https://picsum.photos/seed/kinilaw/400/300' },
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
