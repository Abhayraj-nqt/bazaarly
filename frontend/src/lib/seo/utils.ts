import { Metadata } from "next";
import type { Thing, WithContext } from "schema-dts";

import { SITE_CONFIG } from "@/config/site.config";
import { SITEMAP_CONFIG } from "@/config/sitemap.config";

import { STATIC_META_DATA, StaticMetaData } from "./static-metadata";
import { Schema, SchemaArray, SitemapEntry } from "./types";

/**
 * Type-safe helper to create JSON-LD schema
 */
export function createSchema<T extends Thing>(
  schema: WithContext<T>
): WithContext<T> {
  return schema;
}

/**
 * Merge multiple schemas into array
 */
export function mergeSchemas(
  ...schemas: (Schema | SchemaArray | undefined)[]
): SchemaArray {
  const flattened: SchemaArray = [];

  schemas.forEach((schema) => {
    if (!schema) return;
    if (Array.isArray(schema)) {
      flattened.push(...schema);
    } else {
      flattened.push(schema);
    }
  });

  return flattened;
}

/**
 * Safely serialize JSON-LD (escape < to prevent XSS)
 */
export function serializeSchema(schema: Schema | SchemaArray): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

/**
 * Create a sitemap entry with defaults
 */
export function createSitemapEntry(
  path: string,
  options?: Partial<Omit<SitemapEntry, "url">>
): SitemapEntry {
  return {
    url: `${SITEMAP_CONFIG.baseUrl}${path}`,
    lastModified: options?.lastModified || new Date().toISOString(),
    changeFrequency:
      options?.changeFrequency ?? SITEMAP_CONFIG.defaultChangeFreq,
    priority: options?.priority ?? SITEMAP_CONFIG.defaultPriority,
  };
}

/**
 * Format date for sitemap (ISO 8601)
 */
export function formatSitemapDate(date: Date | string): string {
  if (typeof date === "string") return date;
  return date.toISOString();
}

/**
 * Sort sitemap entries by priority (descending)
 */
export function sortSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

export function createPageMetadata(
  key: keyof typeof STATIC_META_DATA
): Metadata {
  const page: StaticMetaData = STATIC_META_DATA[key];
  const url = `${SITE_CONFIG.url}${page.path}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url,
    },
    robots: page.noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [SITE_CONFIG.ogImage],
      site: SITE_CONFIG.social.handle.x,
    },
  };
}
