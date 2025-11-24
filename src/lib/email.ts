import nodemailer from 'nodemailer'

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email templates
export const emailTemplates = {
  contactForm: (data: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
  }) => ({
    subject: `Contact Form: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2A3B8F;">New Contact Form Submission</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin-top:20px;">
          <h3 style="color: #374151; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #4b5563;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="margin-top: 20px; color: #2A3B8F; font-size: 14px;">
          <strong>Reply to:</strong> ${data.email}
        </p>
      </div>
    `,
  }),

  rfqForm: (data: {
    name: string
    email: string
    phone: string
    company?: string
    productName: string
    productId: string
    quantity: number
    message?: string
  }) => ({
    subject: `RFQ: ${data.productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2A3B8F;">New Quote Request</h2>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h3 style="color: #374151;">Product Details:</h3>
          <p><strong>Product:</strong> ${data.productName}</p>
          <p><strong>Product ID:</strong> ${data.productId}</p>
          <p><strong>Quantity:</strong> ${data.quantity}</p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top:20px;">
          <h3 style="color: #374151;">Customer Information:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        </div>

        ${
          data.message
            ? `
          <div style="background-color: #ffffff; padding: 20px; margin-top:20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151;">Additional Information:</h3>
            <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
        `
            : ''
        }

        <p style="margin-top: 20px; color: #2A3B8F; font-size: 14px;">
          <strong>Reply to:</strong> ${data.email}
        </p>
      </div>
    `,
  }),
}

// Main email sender function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      replyTo: to,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully to:', to)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Send contact form email
export const sendContactFormEmail = async (data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<boolean> => {
  const template = emailTemplates.contactForm(data)
  const destination = process.env.CONTACT_EMAIL || 'okonzcelestine1@gmail.com'

  return sendEmail(destination, template.subject, template.html)
}

// Send RFQ email
export const sendRFQFormEmail = async (data: {
  name: string
  email: string
  phone: string
  company?: string
  productName: string
  productId: string
  quantity: number
  message?: string
}): Promise<boolean> => {
  const template = emailTemplates.rfqForm(data)
  const destination = process.env.CONTACT_EMAIL || 'okonzcelestine1@gmail.com'

  return sendEmail(destination, template.subject, template.html)
}
