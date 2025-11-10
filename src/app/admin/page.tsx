'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, Package, Eye } from 'lucide-react'

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

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  user: {
    email: string
    name: string
  }
  items: Array<{
    id: string
    quantity: number
    price: number
    product: Product
  }>
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'sunglasses',
    collection: '',
    inStock: true,
  })
  
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('admin_auth')
    console.log('Admin auth check:', isAuthenticated)
    
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      router.replace('/login')
      return
    }

    console.log('Authenticated, fetching data')
    fetchProducts()
    fetchOrders()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      })

      if (response.ok) {
        await fetchProducts()
        resetForm()
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'sunglasses',
      collection: '',
      inStock: true,
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      collection: product.collection || '',
      inStock: product.inStock,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          await fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const testEmail = async () => {
    try {
      const response = await fetch('/api/test-email')
      const result = await response.json()
      
      if (result.success) {
        alert(`Test email sent successfully to ${result.sentTo}!`)
      } else {
        alert(`Failed to send test email: ${result.error}`)
      }
    } catch (error) {
      console.error('Error testing email:', error)
      alert('Error testing email functionality')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={testEmail}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              📧 Test Email
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-light tracking-wide transition-colors ${
              activeTab === 'products'
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted-foreground hover:text-accent'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-light tracking-wide transition-colors ${
              activeTab === 'orders'
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted-foreground hover:text-accent'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={resetForm} />
              
              <div className="relative bg-background rounded-sm shadow-xl max-w-2xl w-full p-6">
                <h2 className="text-xl font-light tracking-wide mb-6">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                  />
                  
                  <input
                    type="text"
                    placeholder="Image URL"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="sunglasses">Sunglasses</option>
                      <option value="eyeglasses">Eyeglasses</option>
                    </select>
                    
                    <input
                      type="text"
                      placeholder="Collection (optional)"
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="inStock">In Stock</label>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                    >
                      {editingProduct ? 'Update' : 'Create'} Product
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2 border border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-background rounded-sm shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-light tracking-wide">{product.name}</div>
                      {product.collection && (
                        <div className="text-sm text-muted-foreground">{product.collection}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 hover:text-accent transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-background rounded-sm shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4">
                      <div className="font-light tracking-wide">{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.quantity}x {item.product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-light tracking-wide">{order.user.name}</div>
                      <div className="text-sm text-muted-foreground">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(`mailto:${order.user.email}`)}
                          className="p-1 hover:text-accent transition-colors"
                          title="Email customer"
                        >
                          <Eye size={16} />
                        </button>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="p-1 hover:text-blue-500 transition-colors"
                            title="Mark as processing"
                          >
                            <Package size={16} />
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="p-1 hover:text-green-500 transition-colors"
                            title="Mark as shipped"
                          >
                            <Package size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
          <div className="bg-background rounded-sm shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-widest uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4">
                      <div className="font-light tracking-wide">{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.quantity}x {item.product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-light tracking-wide">{order.user.name}</div>
                      <div className="text-sm text-muted-foreground">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(`mailto:${order.user.email}`)}
                          className="p-1 hover:text-accent transition-colors"
                          title="Email customer"
                        >
                          <Eye size={16} />
                        </button>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="p-1 hover:text-blue-500 transition-colors"
                            title="Mark as processing"
                          >
                            <Package size={16} />
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="p-1 hover:text-green-500 transition-colors"
                            title="Mark as shipped"
                          >
                            <Package size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await fetch('/api/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, status }),
    })

    if (response.ok) {
      // Refresh orders
      const ordersResponse = await fetch('/api/orders')
      const ordersData = await ordersResponse.json()
      setOrders(ordersData)
    }
  } catch (error) {
    console.error('Error updating order status:', error)
  }
