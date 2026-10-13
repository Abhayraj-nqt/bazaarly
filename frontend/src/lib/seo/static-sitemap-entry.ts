import { ROUTES } from "@/constants/routes";

import { SitemapEntry } from "./types";
import { createSitemapEntry } from "./utils";

/**
 * Static routes for your sitemap
 * Update priorities based on page importance
 */
export const STATIC_ROUTES: SitemapEntry[] = [
  createSitemapEntry(ROUTES.HOME, {
    priority: 1.0,
    changeFrequency: "monthly",
  }),

  createSitemapEntry(ROUTES.SIGN_IN, {
    priority: 0.3,
    changeFrequency: "yearly",
  }),

  createSitemapEntry(ROUTES.SIGN_UP, {
    priority: 0.3,
    changeFrequency: "yearly",
  }),
];
