import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const rfqFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  message: z.string().optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
export type RFQFormInput = z.infer<typeof rfqFormSchema>