import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // For now, we'll use a simple user ID from a cookie or create a guest user
    const userId = request.cookies.get('user_id')?.value || 'guest'
    
    const cartItems = await db.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body
    
    // For now, we'll use a simple user ID from a cookie or create a guest user
    const userId = request.cookies.get('user_id')?.value || 'guest'
    
    // Check if user exists, if not create a guest user
    let user = await db.user.findUnique({
      where: { id: userId },
    })
    
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          email: `guest_${userId}@example.com`,
          name: 'Guest User',
        },
      })
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      })
      return NextResponse.json(updatedItem)
    } else {
      // Add new item
      const cartItem = await db.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
        include: { product: true },
      })
      return NextResponse.json(cartItem)
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}