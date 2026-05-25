
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
  categories: string[]
}

function commonsImage(width: number, fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`
}

function restaurantImage(fileName: string) {
  return commonsImage(900, fileName)
}

function foodImage(fileName: string) {
  return commonsImage(700, fileName)
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'cebu-lechon-house',
    name: 'Cebu Lechon House',
    description: 'The most iconic crispy roasted pig in Cebu City. A must-try for every local and tourist.',
    location: 'Cebu City',
    image: restaurantImage('Lechon in the Philippines.jpg'),
    rating: 4.9,
    hours: { open: '10:00', close: '21:00' },
    categories: ['Lechon'],
    menu: [
      { id: 'clh-1', name: 'Cebu Lechon (1/4 kg)', description: 'Classic Cebuano roasted pig with legendary crispy skin and juicy meat.', price: 250, category: 'Signature Lechon', image: foodImage('Filipino (Visayan) lechon, with white rice 01.jpg') },
      { id: 'clh-2', name: 'Cebu Lechon (1/2 kg)', description: 'Perfect for sharing. Served with local soy-vinegar dip.', price: 480, category: 'Signature Lechon', image: foodImage('Lechon in the Philippines.jpg') },
      { id: 'clh-3', name: 'Lechon Paksiw', description: 'Lechon stewed in a rich vinegar and liver sauce broth.', price: 180, category: 'Main Dishes', image: foodImage('Filipino (Visayan) lechon, with white rice 01.jpg') },
      { id: 'clh-4', name: 'Pork Dinuguan', description: 'Savory pork blood stew, a perfect pair for lechon and puso.', price: 165, category: 'Main Dishes', image: foodImage('Dinuguan-2022.jpg') },
      { id: 'clh-5', name: 'Cebu Ngohiong (3pcs)', description: 'Deep-fried battered vegetable rolls with five-spice seasoning.', price: 60, category: 'Sides', image: foodImage('Chinese Ngohiong and Chorizo.jpg') },
      { id: 'clh-6', name: 'Puso (Hanging Rice)', description: 'Rice boiled in diamond-shaped coconut leaf pouches.', price: 12, category: 'Sides', image: foodImage('Puso or Hanging Rice.jpg') },
      { id: 'clh-7', name: 'Leche Flan', description: 'Rich and creamy custard with a caramel glaze.', price: 120, category: 'Desserts', image: foodImage('Flan con dulce de leche 2.jpg') },
    ]
  },
  {
    id: 'larsian-bbq',
    name: 'Larsian BBQ Grill',
    description: 'The famous open-air barbecue hub of Cebu, serving the best grilled skewers since 1970.',
    location: 'Fuente Osmeña, Cebu',
    image: restaurantImage('Filipino pork barbecue.jpg'),
    rating: 4.7,
    hours: { open: '18:00', close: '02:00' },
    categories: ['BBQ', 'Seafood'],
    menu: [
      { id: 'lbbq-1', name: 'Pork BBQ Stick', description: 'Sweet and savory grilled pork skewers, a Larsian classic.', price: 18, category: 'Grill', image: foodImage('Filipino pork barbecue.jpg') },
      { id: 'lbbq-2', name: 'Chicken Inasal (Pecho)', description: 'Grilled chicken breast marinated in calamansi and ginger.', price: 135, category: 'Grill', image: foodImage('Chicken Inasal.JPG') },
      { id: 'lbbq-3', name: 'Grilled Liempo', description: 'Thick-cut pork belly grilled over charcoal.', price: 150, category: 'Grill', image: foodImage('Lechon in the Philippines.jpg') },
      { id: 'lbbq-4', name: 'Chorizo de Cebu', description: 'Sweet local sausage grilled until slightly charred.', price: 25, category: 'Grill', image: foodImage('Chorizo De Cebu.jpg') },
      { id: 'lbbq-5', name: 'Grilled Squid', description: 'Large fresh squid stuffed with tomatoes and onions.', price: 280, category: 'Seafood', image: foodImage('Grilled shredded squid (1).jpg') },
      { id: 'lbbq-6', name: 'Grilled Tuna Belly', description: 'Fleshy tuna belly grilled with a buttery glaze.', price: 320, category: 'Seafood', image: foodImage('Fish platter at Black Horse Inn, Nuthurst West Sussex England.jpg') },
      { id: 'lbbq-7', name: 'Puso Bundle (5pcs)', description: 'A set of 5 hanging rice portions.', price: 50, category: 'Sides', image: foodImage('Puso or Hanging Rice.jpg') },
    ]
  },
  {
    id: 'pungko-pungko-central',
    name: 'Pungko-Pungko Central',
    description: 'Cebu\'s favorite "sit-down" street food experience. Famous for Ginabot and Ngohiong.',
    location: 'Cebu City',
    image: restaurantImage('Filipino pork barbecue.jpg'),
    rating: 4.6,
    hours: { open: '06:00', close: '22:00' },
    categories: ['Street Food'],
    menu: [
      { id: 'ppc-1', name: 'Ginabot (Crispy Intestine)', description: 'The star of Pungko-Pungko. Deep-fried crispy pork mesentery.', price: 45, category: 'Fried Favorites', image: foodImage('Chicharron.jpg') },
      { id: 'ppc-2', name: 'Fried Pork Meat', description: 'Breaded and deep-fried savory pork chunks.', price: 40, category: 'Fried Favorites', image: foodImage('Lechon in the Philippines.jpg') },
      { id: 'ppc-3', name: 'Special Ngohiong', description: 'Five-spice seasoned vegetable roll, crispy outside.', price: 15, category: 'Fried Favorites', image: foodImage('Chinese Ngohiong and Chorizo.jpg') },
      { id: 'ppc-4', name: 'Fried Meatballs (2pcs)', description: 'Crispy fried local-style meatballs.', price: 25, category: 'Fried Favorites', image: foodImage('Meatballs.jpg') },
      { id: 'ppc-5', name: 'Lumpia Toge', description: 'Crispy spring rolls filled with fresh bean sprouts.', price: 12, category: 'Local Snacks', image: foodImage('Lumpia.jpg') },
      { id: 'ppc-6', name: 'Sparkle Fruit Soda', description: 'The iconic Cebuano lemon-lime soda.', price: 20, category: 'Drinks', image: foodImage('Glass of lemon-lime soda.jpg') },
      { id: 'ppc-7', name: 'Mountain Dew (Canned)', description: 'Refreshing citrus soda.', price: 45, category: 'Drinks', image: foodImage('Soft drink cans.jpg') },
    ]
  },
  {
    id: 'zubuchon-it-park',
    name: 'Zubuchon',
    description: 'Acclaimed lechon made with all-natural ingredients. "The best pig ever" - Anthony Bourdain.',
    location: 'IT Park, Cebu',
    image: restaurantImage('Lechon in the Philippines.jpg'),
    rating: 4.8,
    hours: { open: '10:00', close: '21:00' },
    categories: ['Lechon'],
    menu: [
      { id: 'zb-1', name: 'Zubuchon Lechon (Small)', description: 'Signature roasted pig using only organic ingredients.', price: 390, category: 'Signature Lechon', image: foodImage('Filipino (Visayan) lechon, with white rice 01.jpg') },
      { id: 'zb-2', name: 'Zubuchon Sisig', description: 'Savory chopped lechon with onions and spices on a sizzler.', price: 340, category: 'Cebu Specialties', image: foodImage('Sisig wikipedia.jpg') },
      { id: 'zb-3', name: 'Slow-Roasted Prichon', description: 'Twice-cooked lechon for extra crispiness.', price: 350, category: 'Signature Lechon', image: foodImage('Lechon in the Philippines.jpg') },
      { id: 'zb-4', name: 'Sinigang na Lechon', description: 'Lechon meat in a sour tamarind-based broth with local vegetables.', price: 380, category: 'Cebu Specialties', image: foodImage('Sinigang na baboy.jpg') },
      { id: 'zb-5', name: 'Kamias Shake', description: 'Our famous refreshing green bilimbi fruit shake.', price: 125, category: 'Specialty Drinks', image: foodImage('Bilimbi Averrhoa bilimbi.jpg') },
      { id: 'zb-6', name: 'Fresh Mango Shake', description: 'Made with the sweetest Cebu mangoes.', price: 140, category: 'Specialty Drinks', image: foodImage('Mango and cross section edit.jpg') },
    ]
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    description: 'The home of the legendary Brian\'s Ribs and Cebu\'s most famous oversized burgers.',
    location: 'The Terraces, Cebu',
    image: restaurantImage('Hamburger (7).jpg'),
    rating: 4.5,
    hours: { open: '10:00', close: '22:00' },
    categories: ['Offers', 'Desserts'],
    menu: [
      { id: 'cv-1', name: 'Brian\'s Ribs', description: 'Baked pork ribs with a sweet and tangy BBQ sauce.', price: 465, category: 'Signature Ribs', image: foodImage('Barbecue ribs.jpg') },
      { id: 'cv-2', name: 'The Mighty Ton', description: 'A giant burger meant for 4-5 people. A Cebu legend.', price: 895, category: 'Burgers & Steaks', image: foodImage('Hamburger (7).jpg') },
      { id: 'cv-3', name: 'Casa Verde Burger', description: 'Premium beef patty with all the classic fixings.', price: 245, category: 'Burgers & Steaks', image: foodImage('Hamburger (black bg).jpg') },
      { id: 'cv-4', name: 'Seafood Carbonara', description: 'Creamy pasta with shrimps, mussels, and squid.', price: 320, category: 'Pasta', image: foodImage('Spaghetti alla Carbonara.jpg') },
      { id: 'cv-5', name: 'Death by Chocolate', description: 'Layered chocolate cake with ice cream and syrup.', price: 230, category: 'Desserts', image: foodImage('Chocolate cake 2013.jpg') },
      { id: 'cv-6', name: 'Milky Way', description: 'The tallest milkshake tower in Cebu.', price: 280, category: 'Desserts', image: foodImage('Chocolate Milkshake (52354323549).jpg') },
    ]
  },
  {
    id: 'mactan-seaside-grill',
    name: 'Mactan Seaside Grill',
    description: 'Fresh seafood delicacies served by the shores of Mactan. Fresh catch everyday!',
    location: 'Lapu-Lapu City',
    image: restaurantImage('Brigtsen\'s seafood platter (aka the "Shell Beach Diet").jpg'),
    rating: 4.4,
    hours: { open: '11:00', close: '23:00' },
    categories: ['Seafood'],
    menu: [
      { id: 'msg-1', name: 'Baked Scallops with Cheese', description: 'Fresh Mactan scallops baked with butter and garlic cheese.', price: 220, category: 'Fresh Catch', image: foodImage('Baked scallops food.jpg') },
      { id: 'msg-2', name: 'Crispy Calamares', description: 'Deep-fried squid rings served with spicy mayo dip.', price: 240, category: 'Starters', image: foodImage('Calamares.jpg') },
      { id: 'msg-3', name: 'Cebuano Fish Kinilaw', description: 'Fresh raw fish marinated in coconut vinegar and ginger.', price: 280, category: 'Starters', image: foodImage('Kinilaw.jpg') },
      { id: 'msg-4', name: 'Grilled Buttered Prawns', description: 'Giant prawns grilled with local garlic butter.', price: 450, category: 'Fresh Catch', image: foodImage('Grilled prawns.jpg') },
      { id: 'msg-5', name: 'Steamed Lapu-Lapu', description: 'Whole grouper steamed with soy sauce and ginger.', price: 650, category: 'Grilled Specials', image: foodImage('Steamed fish.jpg') },
      { id: 'msg-6', name: 'Seafood Platter', description: 'A massive mix of crabs, shrimps, and fish for the family.', price: 1200, category: 'Grilled Specials', image: foodImage('Brigtsen\'s seafood platter (aka the "Shell Beach Diet").jpg') },
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
