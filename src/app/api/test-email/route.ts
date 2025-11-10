import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function GET() {
  try {
    const testResult = await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'GlassySee Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000; font-weight: 300;">GlassySee Email Test</h1>
          <p>This is a test email to verify that the email service is working correctly.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
          <p>If you receive this email, the email configuration is working!</p>
        </div>
      `,
    })

    if (testResult.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully!',
        sentTo: process.env.ADMIN_EMAIL 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: testResult.error,
        message: 'Failed to send test email' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Email test failed' 
    }, { status: 500 })
  }
}