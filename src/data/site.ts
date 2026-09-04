import type { BlogPosting, Person, WebSite, WithContext } from "schema-dts"

import type { BlogPost } from "@/collections/blog"
import { getBlogPostSlug } from "@/utils/url"

const SITE_URL = new URL("https://arkhins.com")

export const site = {
  name: "Krishna Vijay G",
  alias: "Arkhins",
  email: "krishnavijay.gkv@gmail.com",
  tagline: "Designer · Developer · AI/ML Practitioner · IoT Tinkerer",
  description: "The simple corner of the web for Krishna Vijay G, also known as Arkhins.",
  url: SITE_URL,
  locale: "en",
  keywords: ["krishna vijay", "arkhins", "ui/ux designer", "full-stack developer", "ai/ml", "iot", "chennai"],
} as const

export const resume = {
  filename: "resume.pdf",
  detail: "pdf · katb.in",
  url: "https://katb.in/gkvresume",
} as const

export const contactForm = {
  endpoint: "https://docs.google.com/forms/d/16WZFZkgAWlf35nCqFCNPKoB8GO9FUQqZQQ4ZRA9yyZM/formResponse",
  fields: {
    name: "entry.1444212408",
    email: "entry.12430413",
    subject: "entry.1777991339",
    message: "entry.445717152",
  },
} as const

interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/#contact" },
]

interface SocialLink {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: "email", href: `mailto:${site.email}` },
  { label: "github", href: "https://github.com/Krishna-Vijay-G" },
  { label: "linkedin", href: "https://www.linkedin.com/in/krishna-vijay/" },
  { label: "instagram", href: "https://www.instagram.com/arkhins/" },
  { label: "telegram", href: "https://t.me/arkhins" },
] as const

const identityLinks = socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href)

const personEntity: Person = {
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  email: site.email,
  url: site.url.toString(),
  jobTitle: "Designer & Developer",
  sameAs: identityLinks,
}

export const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  ...personEntity,
} as const

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  description: site.description,
  inLanguage: site.locale,
  keywords: site.keywords,
  url: site.url.toString(),
  author: personEntity,
  sameAs: identityLinks,
} as const

export function getBlogPostSchema(post: BlogPost): WithContext<BlogPosting> {
  const canonicalUrl = new URL(`/blog/${getBlogPostSlug(post)}/`, site.url).toString()
  const datePublished = post.data.publishedAt.toISOString()
  const featuredImage = post.data.featuredImage
  const image = featuredImage ? new URL(featuredImage.src, site.url).toString() : undefined

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    image,
    headline: post.data.title,
    description: post.data.description,
    author: personEntity,
    publisher: personEntity,
    datePublished,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: site.locale,
    keywords: site.keywords,
  } as const
}
