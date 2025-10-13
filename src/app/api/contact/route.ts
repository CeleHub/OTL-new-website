import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { sendContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactFormSchema.parse(body)
    
    // Send email notification
    const emailSent = await sendContactFormEmail(validatedData)
    
    if (!emailSent) {
      console.error('Failed to send contact form email')
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      )
    }
    
    // Log successful submission (optional)
    console.log('Contact form submitted successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 400 }
    )
  }
}