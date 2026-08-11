import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { markdownDirectory } from "./loaders/markdown-directory";

const posts = defineCollection({
  loader: markdownDirectory("./src/content/posts"),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts };
