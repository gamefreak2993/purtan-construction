import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

interface SiteSettings {
  phone?: string;
  email?: string;
  address?: { en?: string; ro?: string };
  socialLinks?: Array<{ platform: string; url: string }>;
}

interface ContactInfoProps {
  settings: SiteSettings | null;
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground/20">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
            <a
              href={`tel:${settings.phone}`}
              className="text-lg font-bold hover:text-amber-600 transition-colors"
            >
              {settings.phone}
            </a>
          </div>
        </div>
      )}

      {settings.email && (
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground/20">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
            <a
              href={`mailto:${settings.email}`}
              className="text-lg font-bold hover:text-amber-600 transition-colors"
            >
              {settings.email}
            </a>
          </div>
        </div>
      )}

      {address && (
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-foreground/20">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Address</p>
            <p className="text-lg font-bold">{address}</p>
          </div>
        </div>
      )}

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div className="pt-4 border-t-2 border-foreground/10">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow Us</p>
          <div className="flex flex-wrap gap-3">
            {settings.socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground/20 px-4 py-2 text-sm font-bold uppercase tracking-wider hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                {socialIcons[link.platform] || link.platform}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
