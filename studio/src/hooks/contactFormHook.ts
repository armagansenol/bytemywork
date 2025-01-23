// import {definePlugin} from 'sanity'

// // You'll need to set up these environment variables in your Sanity studio
// const NOTIFICATION_EMAIL = process.env.SANITY_STUDIO_NOTIFICATION_EMAIL
// const EMAIL_SERVICE_ENDPOINT = process.env.SANITY_STUDIO_EMAIL_SERVICE_ENDPOINT

// // export const contactFormHooks = definePlugin(() => {
// //   return {
// //     document: {
// //       async onCreate(params) {
// //         // Only trigger for contact form submissions
// //         if (params.type !== 'contactForm') return

// //         try {
// //           // Send notification email
// //           const response = await fetch(EMAIL_SERVICE_ENDPOINT, {
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({
// //               to: NOTIFICATION_EMAIL,
// //               subject: 'New Contact Form Submission',
// //               text: `
// //                 New submission received from: ${params.document.name}
// //                 Email: ${params.document.email}
// //                 Phone: ${params.document.phone}
// //                 Budget: ${params.document.budget}
// //                 Project Details: ${params.document.projectDetails}
// //               `,
// //             }),
// //           })

// //           if (!response.ok) {
// //             throw new Error('Failed to send notification email')
// //           }
// //         } catch (error) {
// //           console.error('Error sending notification email:', error)
// //         }
// //       },
// //     },
// //   }
// // })
