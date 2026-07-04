// Server component — renders a JSON-LD script with zero client JS. The `<`
// replacement prevents a "</script>" sequence in the data from breaking out.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
