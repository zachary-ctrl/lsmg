import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  excerpt: text().notNull().default(""),
  body: text().notNull(),
  category: text().notNull().default("Culture"),
  author: text().notNull().default("LSMG Editorial"),
  publishedAt: timestamp("published_at").defaultNow(),
  imageUrl: text("image_url"),
  source: text(),
  sourceUrl: text("source_url"),
  featured: boolean().notNull().default(false),
  tags: text().array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial().primaryKey(),
  articleSlug: text("article_slug").notNull(),
  name: text().notNull(),
  text: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const liveTicker = pgTable("live_ticker", {
  id: serial().primaryKey(),
  text: text().notNull(),
  linkUrl: text("link_url"),
  linkType: text("link_type").notNull().default("external"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
