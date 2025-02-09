import { createClient, QueryParams } from "next-sanity"

import { apiVersion, dataset, projectId, studioUrl } from "./api"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true
      }

      return props.filterDefault(props)
    },
  },
})

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string
  qParams?: QueryParams
  tags: string[]
}): Promise<QueryResponse> {
  try {
    return await client.fetch<QueryResponse>(
      query,
      { ...qParams },
      {
        cache: "no-store",
        next: { tags },
      }
    )
  } catch (error) {
    // Log the error for debugging
    console.error("Sanity query error:", {
      error,
      query,
      params: qParams,
    })

    // Rethrow with a more informative error message
    throw new Error(`Failed to fetch data from Sanity: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
