import { SITE_CONFIG } from "@/config/site.config";
import { ROUTES } from "@/constants/routes";

export type StaticMetaData = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  noindex?: boolean;
  webPageType?:
    "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
};

export const STATIC_META_DATA = {
  DEFAULT: {
    title: "App title",
    description: "App Description",
    path: SITE_CONFIG.url,
    keywords: "discount, services",
  },
  HOME: {
    title: "Home title",
    description: "Home Description",
    path: ROUTES.HOME,
  },
  SIGN_IN: {
    title: "Sign-In title",
    description: "Sign-In Description",
    path: ROUTES.SIGN_IN,
  },
  SIGN_UP: {
    title: "Sign-Un title",
    description: "Sign-Un Description",
    path: ROUTES.SIGN_UP,
  },
} satisfies Record<string, StaticMetaData>;
