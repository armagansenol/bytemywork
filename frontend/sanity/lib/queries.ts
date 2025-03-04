import { defineQuery } from "next-sanity"
import { IMAGE } from "../fragments/image"
import { DELIVERABLE } from "../fragments/deliverable"
import { VIDEO } from "../fragments/video"
import { TECH_STACK } from "../fragments/techStack"

export const settingsQuery = defineQuery(`
  *[_type == "settings" && language == $language][0]{
    ...,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      language
    },
    highlightedProjects[]->{
      _id,
      projectName,
      "slug": slug.current,
      // description,
      heroImage {
        ${IMAGE}
      },
      client,
      date,
      deliverables[]->{
        ${DELIVERABLE}
      },
      websiteUrl
    }
  }
`)

export const getProjectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug && language == $language][0]{
    projectName,
    // description,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      projectName,
      "slug": slug.current,
      language
    },
    heroImage {
      ${IMAGE}
    },
    client,
    date,
    deliverables[]->{
      ${DELIVERABLE}
    },
    techStack[]->{
      ${TECH_STACK}
    },
    websiteUrl,
    body[]{
      _type == "mediaGrid" => {
      component,
      items[]{
        _type == "image" => {
          ${IMAGE}
        },
        _type == "video" => {
          ${VIDEO}
        }
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
  *[_type == "project" && language == $language]|order(orderRank){
    _id,
    projectName,
    "slug": slug.current,
    // description,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      projectName,
      "slug": slug.current,
      language
    },
    heroImage {
      ${IMAGE}
    },
    deliverables[]->{
      ${DELIVERABLE}
    }
  }
`)
