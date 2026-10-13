import type { Thing, WithContext } from "schema-dts";

// JSON LD Schema
export type Schema = WithContext<Thing>;
export type SchemaArray = Schema[];

export interface SchemaConfig {
  common?: SchemaArray; // Schemas that appear on every page
  page?: SchemaArray; // Page-specific schemas
}

// Sitemap
export type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number; // 0.0 to 1.0
};

export type SitemapConfig = {
  baseUrl: string;
  defaultChangeFreq: SitemapEntry["changeFrequency"];
  defaultPriority: number;
};
