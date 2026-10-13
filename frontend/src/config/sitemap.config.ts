import { SitemapConfig } from "@/lib/seo/types";

import { SITE_CONFIG } from "./site.config";

export const SITEMAP_CONFIG: SitemapConfig = {
  baseUrl: SITE_CONFIG.url,
  defaultChangeFreq: "weekly",
  defaultPriority: 0.7,
};
