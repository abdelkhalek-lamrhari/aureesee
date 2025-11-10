import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from || process.env.FROM_EMAIL!,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

export async function sendOrderConfirmation(
  customerEmail: string,
  orderId: string,
  customerName: string,
  orderDetails: any
) {
  // Send to customer
  const customerResult = await sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - Aurée Luxury Eyewear (Order #${orderId})`,
    html: `Order confirmation for ${customerName}`,
  })

  // Send to admin
  const adminResult = await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `New Order Received - Aurée Luxury Eyewear (Order #${orderId})`,
    html: `New order from ${customerName}: ${orderId}`,
  })

  return { customerResult, adminResult }
}