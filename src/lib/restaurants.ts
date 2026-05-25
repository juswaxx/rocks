
export type Restaurant = {
  id: string
  name: string
  description: string
  location: string
  image: string
  rating: number
  hours: { open: string; close: string }
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'cebu-lechon-house',
    name: 'Cebu Lechon House',
    description: 'The most iconic crispy roasted pig in Cebu City. A must-try for every local and tourist.',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/lechonhouse/600/400',
    rating: 4.9,
    hours: { open: '10:00', close: '21:00' }
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'Famous Cebuano street food and grilled favorites served with puso (hanging rice).',
    location: 'Fuente Osmeña, Cebu',
    image: 'https://picsum.photos/seed/larsian/600/400',
    rating: 4.7,
    hours: { open: '18:00', close: '02:00' }
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food. Best known for Ginabot (crispy pork intestines).',
    location: 'Cebu City',
    image: 'https://picsum.photos/seed/pungkopungko/600/400',
    rating: 4.6,
    hours: { open: '06:00', close: '22:00' }
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon that Anthony Bourdain called "the best pig ever."',
    location: 'IT Park, Cebu',
    image: 'https://picsum.photos/seed/zubuchon/600/400',
    rating: 4.8,
    hours: { open: '10:00', close: '21:00' }
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'Classic Cebuano comfort food and their legendary Brian\'s Ribs.',
    location: 'The Terraces, Cebu',
    image: 'https://picsum.photos/seed/casaverde/600/400',
    rating: 4.5,
    hours: { open: '10:00', close: '22:00' }
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood caught daily from the shores of Mactan Island.',
    location: 'Lapu-Lapu City',
    image: 'https://picsum.photos/seed/mactanseafood/600/400',
    rating: 4.4,
    hours: { open: '11:00', close: '23:00' }
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
    // Overnight operation
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
