import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    publishedDate: z.string().transform((str) => new Date(str)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    source: z
      .object({
        name: z.string(),
        url: z.string(),
      })
      .optional(),
    tags: z.string().array().optional(),
    references: z.string().array().optional(),
    isDraft: z.boolean().default(false),
  }),
});

const series = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    posts: z.array(reference('blog')),
  }),
});

export const collections = { blog, series };
