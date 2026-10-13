import { Schema, SchemaArray } from "@/lib/seo/types";
import { serializeSchema } from "@/lib/seo/utils";

type SchemaRendererProps = {
  schema: Schema | SchemaArray;
};

/**
 * Renders JSON-LD schema in a script tag
 * Handles both single schema and array of schemas
 */
export function SchemaRenderer({ schema }: Readonly<SchemaRendererProps>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeSchema(schema),
      }}
    />
  );
}
