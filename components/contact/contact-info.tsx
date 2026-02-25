import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

interface ContactInfoProps {
  settings: SITE_SETTINGS_QUERY_RESULT;
  locale: string;
}

const socialIcons: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

export function ContactInfo({ settings, locale }: ContactInfoProps) {
  if (!settings) return null;

  const address = settings.address
    ? locale === "ro"
      ? settings.address.ro || settings.address.en
      : settings.address.en
    : null;

  return (
    <div className="space-y-8">
      {settings.phone && (
        <div className="flex items-start gap-4">
          <div className="border-foreground/20 flex h-12 w-12 shrink-0 items-center justify-center border-2">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
              Phone
            </p>
            <a
              href={`tel:${settings.phone}`}
              className="text-lg font-bold transition-colors hover:text-amber-600"
            >
              {settings.phone}
            </a>
          </div>
        </div>
      )}

      {settings.email && (
        <div className="flex items-start gap-4">
          <div className="border-foreground/20 flex h-12 w-12 shrink-0 items-center justify-center border-2">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
              Email
            </p>
            <a
              href={`mailto:${settings.email}`}
              className="text-lg font-bold transition-colors hover:text-amber-600"
            >
              {settings.email}
            </a>
          </div>
        </div>
      )}

      {address && (
        <div className="flex items-start gap-4">
          <div className="border-foreground/20 flex h-12 w-12 shrink-0 items-center justify-center border-2">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
              Address
            </p>
            <p className="text-lg font-bold">{address}</p>
          </div>
        </div>
      )}

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div className="border-foreground/10 border-t-2 pt-4">
          <p className="text-muted-foreground mb-4 text-xs font-bold tracking-widest uppercase">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-3">
            {settings.socialLinks
              .filter((link) => link.url && link.platform)
              .map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-foreground/20 inline-flex items-center gap-2 border-2 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-colors hover:border-amber-500 hover:text-amber-600"
                >
                  {socialIcons[link.platform!] || link.platform}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
