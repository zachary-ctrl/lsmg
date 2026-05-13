CREATE TABLE "articles" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"body" text NOT NULL,
	"category" text DEFAULT 'Culture' NOT NULL,
	"author" text DEFAULT 'LSMG Editorial' NOT NULL,
	"published_at" timestamp DEFAULT now(),
	"image_url" text,
	"source" text,
	"source_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"tags" text[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY,
	"article_slug" text NOT NULL,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "live_ticker" (
	"id" serial PRIMARY KEY,
	"text" text NOT NULL,
	"link_url" text,
	"link_type" text DEFAULT 'external' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
