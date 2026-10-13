import { Metadata } from "next";

import { STATIC_META_DATA } from "@/lib/seo/static-metadata";
import { createPageMetadata } from "@/lib/seo/utils";

type MetaDataProps = Record<keyof typeof STATIC_META_DATA, Metadata>;

export const METADATA: MetaDataProps = {
  DEFAULT: createPageMetadata("DEFAULT"),
  HOME: createPageMetadata("HOME"),
  SIGN_IN: createPageMetadata("SIGN_IN"),
  SIGN_UP: createPageMetadata("SIGN_UP"),
} satisfies MetaDataProps;
