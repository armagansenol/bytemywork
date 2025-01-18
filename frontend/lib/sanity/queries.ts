import { defineQuery } from "next-sanity"

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    highlightedProjects[]->{
      _id,
      projectName,
      slug,
      description,
      companyName,
      heroImage {
        asset-> {
          url
        },
        alt
      },
      client,
      date,
      deliverables,
      websiteUrl
    }
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkFields = /* groq */ `
  link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
        }
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        ${linkFields},
      }
    },
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkFields}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const getProjectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug] [0] {
    projectName,
  slug,
  description,
  companyName,
  "heroImage": heroImage{
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "alt": alt
  },
  client,
  date,
  deliverables,
  websiteUrl,
  body[]{
    _type == "imageGrid" => {
      component,
      items[]{
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "alt": alt
      }
    },
    _type == "textBlock" => {
      component,
      title,
      description
    }
  }
  }
`)

export const getProjectsQuery = defineQuery(`
*[_type == "project"]{
  _id,
  projectName,
  slug,
  description,
  companyName,
  heroImage{
    asset->{
      _id,
      url
    },
    alt
  },
  client,
  date,
  deliverables,
  websiteUrl,
  body[]{
    ...,
    imageGrid{
      ...,
      items[]{
        ...,
        image{
          asset->{
            _id,
            url
          }
        }
      }
    },
    textBlock{
      ...,
      items[]{
        ...
      }
    }
  }
}
`)
