import { WebPage } from "schema-dts";

import { SITE_CONFIG } from "@/config/site.config";

import { Schema } from "./types";
import { createSchema } from "./utils";

export function createWebPageSchema(params: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
}): Schema {
  const { title, description, path, type = "WebPage" } = params;

  return createSchema<WebPage>({
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_CONFIG.url}${path}#webpage`,
    url: `${SITE_CONFIG.url}${path}`,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    inLanguage: "en-US",
  });
}
