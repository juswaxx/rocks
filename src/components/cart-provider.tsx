
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  restaurantId: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('puffnplate_cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('puffnplate_cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.menuItemId === newItem.menuItemId)
      if (existing) {
        return prev.map(item => 
          item.menuItemId === newItem.menuItemId 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prev, newItem]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const clearCart = () => setItems([])

  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
