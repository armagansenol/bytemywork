import {Resend} from 'resend'
import {definePlugin, DocumentStore} from 'sanity'

// Define types for Sanity document and operation
interface SanityDocument {
  _id: string
  _type: string
  _createdAt?: string
  name?: string
  email?: string
  message?: string
  [key: string]: any
}

interface SanityConfig {
  documentStore: DocumentStore
  [key: string]: any
}

interface DocumentUpdate {
  result?: SanityDocument
  [key: string]: any
}

// Initialize Resend with your API key
const resend = new Resend(process.env.SANITY_STUDIO_RESEND_API_KEY)

export const contactFormPlugin = definePlugin(() => {
  return {
    name: 'contact-form-notifications',
    setup(config: SanityConfig) {
      // Only run this code on the client (in the browser)
      if (typeof window === 'undefined') return

      // Get the document store from the config
      const {documentStore} = config

      // Set up a listener for new contact form submissions
      const subscription = documentStore
        .listenQuery(
          `*[_type == "contactForm"] | order(_createdAt desc)[0]`,
          {},
          // @ts-ignore - includeResult is a valid option but not in the type definition
          {includeResult: true},
        )
        .subscribe({
          next: (update: DocumentUpdate) => {
            // Only proceed if we have a result and it's a new document
            if (!update.result || !update.result._createdAt) return

            // Check if this is a new document (created in the last minute)
            const createdAt = new Date(update.result._createdAt)
            const now = new Date()
            const isNew = now.getTime() - createdAt.getTime() < 60000 // 1 minute

            if (isNew) {
              const document = update.result as SanityDocument

              // Send email notification
              sendEmailNotification(document).catch(console.error)
            }
          },
          error: (err: Error) => {
            console.error('Error listening for contact form submissions:', err)
          },
        })

      // Clean up subscription when the plugin is destroyed
      return () => {
        subscription.unsubscribe()
      }
    },
  }
})

async function sendEmailNotification(document: SanityDocument) {
  try {
    // Send email notification
    await resend.emails.send({
      from: 'contact@bytemywork.com', // Use your verified domain
      to: 'armagansnl@gmail.com', // Where you want to receive notifications
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${document.name}</p>
        <p><strong>Email:</strong> ${document.email}</p>
        <p><strong>Message:</strong> ${document.message}</p>
        <p><a href="https://your-sanity-studio-url.com/desk/contactForm;${document._id}">View in Sanity Studio</a></p>
      `,
    })

    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Failed to send email notification:', error)
  }
}
