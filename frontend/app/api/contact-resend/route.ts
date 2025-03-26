// app/api/sanity-webhook/route.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const sanitySecret = req.headers.get("x-sanity-secret")
  if (sanitySecret !== process.env.SANITY_EMAIL_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await req.json()

  // Make sure it's a "create" event and has a document
  if (body?.transition !== "appear" || !body?.document) {
    return new Response("Not a create event", { status: 400 })
  }

  const { name, email, message } = body.document

  try {
    await resend.emails.send({
      from: "contact@bytemywork.com",
      to: ["armagansnl@gmail.com"],
      subject: "📥 New Contact Form Submission",
      html: `
        <h2>New Contact Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    })

    return new Response("Email sent", { status: 200 })
  } catch (error) {
    console.error("Failed to send email:", error)
    return new Response("Email error", { status: 500 })
  }
}
