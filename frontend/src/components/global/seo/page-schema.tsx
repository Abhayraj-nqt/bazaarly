import { SCHEMA_CONFIG } from "@/config/schema.config";
import { SchemaArray } from "@/lib/seo/types";
import { mergeSchemas } from "@/lib/seo/utils";

import { SchemaRenderer } from "./schema-renderer";

type PageSchemaProps = {
  page: keyof typeof SCHEMA_CONFIG;
  additionalSchemas?: SchemaArray;
};

/**
 * Component to render all schemas for a page
 * Combines common + page-specific + additional schemas
 */
export function PageSchema({
  page,
  additionalSchemas,
}: Readonly<PageSchemaProps>) {
  const config = SCHEMA_CONFIG[page];

  if (!config) {
    console.warn(`No schema configuration found for page: ${page}`);
    return null;
  }

  const allSchemas = mergeSchemas(
    config.common,
    config.page,
    additionalSchemas
  );

  return <SchemaRenderer schema={allSchemas} />;
}
