interface JsonLdProps {
  settings?: {
    phone?: string;
    email?: string;
    address?: { en?: string; ro?: string };
    siteTitle?: { en?: string; ro?: string };
    description?: { en?: string; ro?: string };
  } | null;
}

export function LocalBusinessJsonLd({ settings }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: settings?.siteTitle?.en || "Purtan Construction",
    description:
      settings?.description?.en || "Professional construction services by Daniel Ovidiu Purtan",
    ...(settings?.phone && { telephone: settings.phone }),
    ...(settings?.email && { email: settings.email }),
    ...(settings?.address?.en && {
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address.en,
      },
    }),
    url: "https://purtan-construction.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
