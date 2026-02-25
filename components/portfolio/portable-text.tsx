import {
  PortableText as BasePortableText,
  type PortableTextProps as BasePortableTextProps,
} from "@portabletext/react";

interface PortableTextProps {
  value: BasePortableTextProps["value"];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className="prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wide prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-strong:font-black max-w-none">
      <BasePortableText value={value} />
    </div>
  );
}
