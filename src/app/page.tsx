'use client'

import { useEffect, useState } from 'react'
import { Search, ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import CheckoutModal from '@/components/CheckoutModal'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image: string
  category: string
  collection?: string
  inStock: boolean
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  
  const {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    toggleCart,
    closeCart,
  } = useCartStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        // Fallback to mock data if API fails
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to mock data
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'METROPOLIS',
      description: 'Bold geometric frames for the modern urbanite',
      price: 485,
      image: '/luxury-modern-black-sunglasses-premium-quality-pro.jpg',
      category: 'sunglasses',
      collection: 'Urban Edge',
      inStock: true,
    },
    {
      id: '2',
      name: 'VINTAGE SOUL',
      description: 'Timeless elegance in handcrafted acetate',
      price: 520,
      image: '/retro-vintage-sunglasses-brown-gold-metal-frame-el.jpg',
      category: 'sunglasses',
      collection: 'Classic Luxury',
      inStock: true,
    },
    {
      id: '3',
      name: 'AZURE',
      description: 'Ocean-inspired frames with gradient lenses',
      price: 445,
      image: '/blue-gradient-sunglasses-luxurious-female-fashion-.jpg',
      category: 'sunglasses',
      collection: 'Minimalist',
      inStock: true,
    },
    {
      id: '4',
      name: 'NOCTURNE',
      description: 'Sophisticated dark frames for evening elegance',
      price: 510,
      image: '/dark-premium-sunglasses-sleek-masculine-design-lux.jpg',
      category: 'sunglasses',
      collection: 'Urban Edge',
      inStock: true,
    },
    {
      id: '5',
      name: 'ETHEREAL',
      description: 'Lightweight transparent frames with subtle accents',
      price: 495,
      image: '/transparent-frame-sunglasses-minimalist-elegant-so.jpg',
      category: 'sunglasses',
      collection: 'Minimalist',
      inStock: true,
    },
    {
      id: '6',
      name: 'SOLAR',
      description: 'Warm gradient lenses perfect for sunset drives',
      price: 505,
      image: '/gradient-lens-sunglasses-sunset-reflection-luxury-.jpg',
      category: 'sunglasses',
      collection: 'Classic Luxury',
      inStock: true,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', 'sunglasses', 'eyeglasses']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-light tracking-[0.15em]">AURÉE</h1>
              <nav className="hidden md:flex items-center gap-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm tracking-widest transition-colors ${
                      selectedCategory === category
                        ? 'text-accent'
                        : 'hover:text-accent'
                    }`}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <button
                onClick={toggleCart}
                className="relative p-2 hover:text-accent transition-colors"
              >
                <ShoppingBag size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary">
        <div className="absolute inset-0 z-0">
          <img
            src="/luxury-sunglasses-advertisement-professional-model.jpg"
            alt="Hero - Luxury Sunglasses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <p className="text-sm tracking-[0.2em] mb-4 font-light">TIMELESS ELEGANCE</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 leading-tight">
            See the World
            <br />
            <span className="text-accent">Through Glass</span>
          </h1>
          <p className="text-lg font-light tracking-wide max-w-2xl mx-auto text-gray-200">
            Handcrafted luxury eyewear that combines Italian design with Japanese precision
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <p className="text-sm tracking-[0.2em] text-muted-foreground mb-4">CURATED SELECTION</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">The Aurée Collection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-background rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="relative overflow-hidden h-72 bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.collection && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs tracking-widest font-light">
                    {product.collection}
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-light tracking-wide mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                <p className="text-accent font-light tracking-widest mb-4">${product.price}</p>
                
                <button
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    collection: product.collection,
                  })}
                  disabled={!product.inStock}
                  className="w-full py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm tracking-widest font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-light tracking-wide">Shopping Cart</h2>
            <button onClick={closeCart} className="p-2 hover:text-accent transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-secondary p-4 rounded-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-sm"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-light tracking-wide">{item.name}</h4>
                      <p className="text-accent text-sm">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:text-red-500 transition-colors ml-auto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between mb-4">
                <span className="font-light tracking-wide">Total</span>
                <span className="text-accent font-light tracking-widest">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <button 
                className="w-full py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 text-sm tracking-widest font-light"
                onClick={() => setShowCheckout(true)}
              >
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </div>
  )
}