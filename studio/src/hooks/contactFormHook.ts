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
      const {documentStore} = config

      // Set up a listener for new contact form submissions with retry logic
      let retryCount = 0
      const maxRetries = 3

      const setupSubscription = () => {
        console.log('Setting up subscription...')
        const subscription = documentStore
          .listenQuery(`*[_type == "contactForm"] | order(_createdAt desc)`, {}, {})
          .subscribe({
            next: (update: DocumentUpdate) => {
              console.log('Subscription update received:', {
                update,
                timestamp: new Date().toISOString(),
                hasResult: !!update.result,
                createdAt: update.result?._createdAt,
              })

              if (!update.result || !update.result._createdAt) {
                console.log('Skipping: No result or creation date')
                return
              }

              const createdAt = new Date(update.result._createdAt)
              const now = new Date()
              const timeDiff = now.getTime() - createdAt.getTime()

              console.log('Processing update:', {
                timeDiff,
                isNew: timeDiff < 300000,
                createdAt: createdAt.toISOString(),
                now: now.toISOString(),
              })

              if (timeDiff < 300000) {
                console.log('Processing new submission:', update.result)
                sendEmailNotification(update.result as SanityDocument)
                  .then(() => console.log('Email sent successfully'))
                  .catch((error) => console.error('Email sending failed:', error))
              }
            },
            error: (err: Error) => {
              console.error('Subscription error:', err)
              if (retryCount < maxRetries) {
                retryCount++
                console.log(`Retrying subscription (${retryCount}/${maxRetries})...`)
                setTimeout(setupSubscription, 5000) // Retry after 5 seconds
              }
            },
          })

        return subscription
      }

      const subscription = setupSubscription()

      return () => {
        console.log('Cleaning up subscription')
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
