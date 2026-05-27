import { RESTAURANTS } from './restaurants'

export const ADMIN_EMAIL = 'admin@puffnplate.com'
export const ADMIN_PASSWORD = 'Admin@12345'
export const ADMIN_NAME = 'Restaurant Admin'

export type AdminOrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled'

export type AdminOrder = {
  id: string
  userId: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  paymentMethod: string
  paymentProofName?: string | null
  paymentProofUrl?: string | null
  status: AdminOrderStatus
  totalAmount: number
  createdAt: Date
  items: {
    name: string
    quantity: number
    price: number
    restaurantId: string
    imageUrl?: string
  }[]
}

export const DEMO_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-2401',
    userId: 'demo-user-1',
    customerName: 'Mika Santos',
    customerPhone: '0917 223 1144',
    deliveryAddress: 'IT Park, Lahug, Cebu City',
    paymentMethod: 'gcash',
    paymentProofName: 'gcash-payment.png',
    status: 'Pending',
    totalAmount: 568,
    createdAt: new Date('2026-05-27T10:20:00+08:00'),
    items: [
      { name: 'Cebu Lechon (1/2 kg)', quantity: 1, price: 480, restaurantId: 'cebu-lechon-house' },
      { name: 'Puso Bundle (5pcs)', quantity: 1, price: 50, restaurantId: 'larsian-bbq' },
    ],
  },
  {
    id: 'ORD-2402',
    userId: 'demo-user-2',
    customerName: 'Andre Lim',
    customerPhone: '0998 882 4102',
    deliveryAddress: 'Basak, Lapu-Lapu City',
    paymentMethod: 'cod',
    status: 'Preparing',
    totalAmount: 735,
    createdAt: new Date('2026-05-27T09:45:00+08:00'),
    items: [
      { name: 'Baked Scallops with Cheese', quantity: 2, price: 220, restaurantId: 'mactan-seaside-grill' },
      { name: 'Crispy Calamares', quantity: 1, price: 240, restaurantId: 'mactan-seaside-grill' },
    ],
  },
  {
    id: 'ORD-2403',
    userId: 'demo-user-3',
    customerName: 'Pat Reyes',
    customerPhone: '0926 441 9001',
    deliveryAddress: 'Fuente Osmena, Cebu City',
    paymentMethod: 'bank',
    paymentProofName: 'transfer-receipt.jpg',
    status: 'Out for Delivery',
    totalAmount: 410,
    createdAt: new Date('2026-05-27T08:55:00+08:00'),
    items: [
      { name: 'Chicken Inasal (Pecho)', quantity: 2, price: 135, restaurantId: 'larsian-bbq' },
      { name: 'Puso Bundle (5pcs)', quantity: 1, price: 50, restaurantId: 'larsian-bbq' },
    ],
  },
  {
    id: 'ORD-2404',
    userId: 'demo-user-4',
    customerName: 'Leah Gomez',
    customerPhone: '0915 760 8200',
    deliveryAddress: 'The Terraces, Cebu Business Park',
    paymentMethod: 'cod',
    status: 'Completed',
    totalAmount: 1295,
    createdAt: new Date('2026-05-26T19:30:00+08:00'),
    items: [
      { name: 'The Mighty Ton', quantity: 1, price: 895, restaurantId: 'casa-verde' },
      { name: 'Death by Chocolate', quantity: 1, price: 230, restaurantId: 'casa-verde' },
      { name: 'Fresh Mango Shake', quantity: 1, price: 140, restaurantId: 'zubuchon-it-park' },
    ],
  },
]

export const DEMO_ADMIN_USERS = [
  { id: 'demo-user-1', name: 'Mika Santos', email: 'mika@example.com', role: 'user', orders: 8, totalSpent: 4280 },
  { id: 'demo-user-2', name: 'Andre Lim', email: 'andre@example.com', role: 'user', orders: 5, totalSpent: 3015 },
  { id: 'demo-user-3', name: 'Pat Reyes', email: 'pat@example.com', role: 'user', orders: 11, totalSpent: 6820 },
  { id: 'admin-user', name: ADMIN_NAME, email: ADMIN_EMAIL, role: 'admin', orders: 0, totalSpent: 0 },
]

export function getRestaurantName(id: string) {
  return RESTAURANTS.find((restaurant) => restaurant.id === id)?.name || 'Unknown Restaurant'
}

export function peso(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)
}
