// Renders structured data as a JSON-LD script tag.
// `data` is always app-controlled (built in lib/seo.ts), never user input.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
