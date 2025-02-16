import { NextRequest, NextResponse } from "next/server"

// CORS headers configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Credentials": "true",
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  // Validate origin
  const origin = req.headers.get("origin")
  if (origin !== "http://localhost:3333") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized origin" }), {
      status: 403,
      headers: corsHeaders,
    })
  }

  try {
    const contentType = req.headers.get("content-type")
    let requestBody: FormData | Record<string, unknown>
    let apiEndpoint = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`

    if (contentType?.includes("multipart/form-data")) {
      // Handle file upload
      requestBody = await req.formData()
    } else {
      // Handle URL-based video copy
      requestBody = await req.json()
      apiEndpoint += "/copy"
    }

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        ...(contentType?.includes("multipart/form-data") ? {} : { "Content-Type": "application/json" }),
      },
      body: requestBody instanceof FormData ? requestBody : JSON.stringify(requestBody),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : "Upload failed")
    }

    // Return response with CORS headers
    return NextResponse.json(data.result, { headers: corsHeaders })
  } catch (error) {
    console.error("Upload Error:", error)
    return new NextResponse(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred" }),
      { status: 500, headers: corsHeaders }
    )
  }
}
