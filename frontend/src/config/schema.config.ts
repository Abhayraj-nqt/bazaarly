import { COMMON_SCHEMAS } from "@/lib/seo/common-schema";
import { STATIC_META_DATA } from "@/lib/seo/static-metadata";
import {
  homePageSchemas,
  signInPageSchemas,
  signUpPageSchemas,
} from "@/lib/seo/static-schema";
import { SchemaConfig } from "@/lib/seo/types";

export const SCHEMA_CONFIG = {
  HOME: {
    page: homePageSchemas,
    common: COMMON_SCHEMAS,
  },
  SIGN_IN: {
    page: signInPageSchemas,
    common: COMMON_SCHEMAS,
  },
  SIGN_UP: {
    page: signUpPageSchemas,
    common: COMMON_SCHEMAS,
  },
} satisfies Record<
  Exclude<keyof typeof STATIC_META_DATA, "DEFAULT">,
  SchemaConfig
>;
