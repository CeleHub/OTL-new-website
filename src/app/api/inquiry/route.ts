import { NextRequest, NextResponse } from 'next/server'
import { rfqFormSchema } from '@/lib/validations'
import { sendRFQFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = rfqFormSchema.parse(body)
    
    // Send email notification
    const emailSent = await sendRFQFormEmail(validatedData)
    
    if (!emailSent) {
      console.error('Failed to send RFQ form email')
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      )
    }
    
    // Log successful submission (optional)
    console.log('RFQ submitted successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      productName: validatedData.productName,
      quantity: validatedData.quantity,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('RFQ error:', error)
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 400 }
    )
  }
}