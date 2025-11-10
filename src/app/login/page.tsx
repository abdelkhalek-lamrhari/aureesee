'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt:', { username, password })

    // Simple authentication check
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful')
      localStorage.setItem('admin_auth', 'true')
      router.replace('/admin')
    } else {
      console.log('Login failed')
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <div className="bg-background rounded-sm shadow-lg p-8 border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light tracking-[0.15em] mb-2">AURÉE</h1>
            <p className="text-sm text-muted-foreground">Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-light tracking-wide mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light tracking-wide mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 text-sm tracking-widest font-light disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Use credentials: admin / admin
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}