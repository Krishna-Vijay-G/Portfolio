import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { type CollectionEntry, defineCollection, getCollection } from "astro:content"

export const certificationsCollection = defineCollection({
  loader: glob({ base: "./src/content/certifications", pattern: "**/*.{md,mdx}" }),
  schema: () => {
    return z.object({
      name: z.string(),
      issuer: z.string(),
      issuedAt: z.coerce.date(),
      url: z.url().optional(),
    })
  },
})

export type Certification = CollectionEntry<"certifications">

const sortByIssuedAt = (a: Certification, b: Certification) => {
  return b.data.issuedAt.getTime() - a.data.issuedAt.getTime()
}

export const getCertifications = async () => {
  const certifications = await getCollection("certifications")
  return certifications.sort(sortByIssuedAt)
}
