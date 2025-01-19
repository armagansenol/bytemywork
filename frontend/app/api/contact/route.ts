import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const sanityEndpoint = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2022-03-07/data/mutate/${process.env.SANITY_DATASET}`

    const doc = {
      mutations: [
        {
          create: {
            _type: "contactForm",
            name: data.name,
            email: data.email,
            phone: data.phone,
            budget: data.budget,
            projectDetails: data.projectDetails,
          },
        },
      ],
    }

    const response = await fetch(sanityEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(doc),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Sanity")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
