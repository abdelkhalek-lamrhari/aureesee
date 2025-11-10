import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Resend } from 'resend'
import OrderConfirmationEmail from '@/emails/OrderConfirmationEmail'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, total, customerInfo } = body
    
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
          email: customerInfo.email,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        },
      })
    }

    // Create order
    const order = await db.order.create({
      data: {
        userId,
        total,
        status: 'pending',
      },
    })

    // Create order items
    for (const item of items) {
      await db.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        },
      })
    }

    // Send order confirmation email
    try {
      const emailHtml = await render(
        OrderConfirmationEmail({
          orderId: order.id,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          items,
          total,
          shippingAddress: {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            address: customerInfo.address,
            city: customerInfo.city,
            postalCode: customerInfo.postalCode,
            country: customerInfo.country,
          },
        })
      )

      // Send email to customer
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: [customerInfo.email],
        subject: `Order Confirmation - Aurée Luxury Eyewear (Order #${order.id})`,
        html: emailHtml,
      })

      // Send notification email to admin
      const adminEmailHtml = await render(
        OrderConfirmationEmail({
          orderId: order.id,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          items,
          total,
          shippingAddress: {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            address: customerInfo.address,
            city: customerInfo.city,
            postalCode: customerInfo.postalCode,
            country: customerInfo.country,
          },
        })
      )

      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: [process.env.ADMIN_EMAIL!],
        subject: `New Order Received - Aurée Luxury Eyewear (Order #${order.id})`,
        html: adminEmailHtml,
      })

      console.log(`Order confirmation emails sent for order ${order.id}`)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Continue with order creation even if email fails
    }

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      message: 'Order created successfully'
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}