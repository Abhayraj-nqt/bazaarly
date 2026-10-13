import { LocalBusiness } from "schema-dts";

import { SITE_CONFIG } from "@/config/site.config";

import { createWebPageSchema } from "./dynamic-schema";
import { STATIC_META_DATA, StaticMetaData } from "./static-metadata";
import { SchemaArray } from "./types";
import { createSchema } from "./utils";

function autoWebPageSchema(
  pageKey: keyof typeof STATIC_META_DATA
): SchemaArray {
  const page: StaticMetaData = STATIC_META_DATA[pageKey];

  return [
    createWebPageSchema({
      title: page.title,
      description: page.description,
      path: page.path,
      type: page?.webPageType || "WebPage",
    }),
  ];
}

// ---------------------------------------------------------------------

export const homePageSchemas: SchemaArray = [
  createSchema<LocalBusiness>({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.logo}`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.address.latitude,
      longitude: SITE_CONFIG.address.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.linkedIn,
      SITE_CONFIG.social.x,
    ],
  }),
  ...autoWebPageSchema("HOME"),
];

export const signInPageSchemas: SchemaArray = [...autoWebPageSchema("SIGN_IN")];

export const signUpPageSchemas: SchemaArray = [...autoWebPageSchema("SIGN_UP")];
