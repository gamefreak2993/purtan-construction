import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wide prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-strong:font-black">
      <BasePortableText value={value} />
    </div>
  );
}
