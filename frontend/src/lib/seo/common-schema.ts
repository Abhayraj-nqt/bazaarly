import type {
  Organization,
  WebSite,
  BreadcrumbList,
  ImageObject,
} from "schema-dts";

import { SITE_CONFIG } from "@/config/site.config";

import { createSchema } from "./utils";

/**
 * Organization Schema - appears on all pages
 */
export const organizationSchema = createSchema<Organization>({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_CONFIG.url}/#organization`,
  name: `${SITE_CONFIG.name}`,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.logo}`,
  description: SITE_CONFIG.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.locality,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.contact.phone,
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.instagram,
    SITE_CONFIG.social.linkedIn,
    SITE_CONFIG.social.x,
  ],
});

/**
 * WebSite Schema - appears on all pages
 */
export const websiteSchema = createSchema<WebSite>({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}/#website`,
  url: SITE_CONFIG.url,
  name: "Fyndr",
  description: SITE_CONFIG.description,
  publisher: {
    "@id": `${SITE_CONFIG.url}/#organization`,
  },
});

/**
 * Helper to create breadcrumb schema
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbList {
  return {
    "@id": `${SITE_CONFIG.url}/#breadcrumb`,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export const imageObjectSchema = createSchema<ImageObject>({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  url: SITE_CONFIG.ogImage, // Change according to your need
  contentUrl: SITE_CONFIG.ogImage,
  thumbnail: {
    "@type": "ImageObject",
    url: SITE_CONFIG.ogImage, // Change according to your need
  },
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  license: SITE_CONFIG.url,
  creator: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  dateCreated: SITE_CONFIG.date,
  keywords: SITE_CONFIG.keywords,
});

/**
 * Common schemas that appear on every page
 */
export const COMMON_SCHEMAS = [
  imageObjectSchema,
  organizationSchema,
  websiteSchema,
];
