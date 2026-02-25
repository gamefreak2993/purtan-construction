import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-3 text-lg">{t("subtitle")}</p>
        <Separator className="mt-6 w-16" />
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo settings={settings} locale={locale} />
      </div>
    </div>
  );
}
