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
    <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-bold max-w-none">
      <BasePortableText value={value} />
    </div>
  );
}
