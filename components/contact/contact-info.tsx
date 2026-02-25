import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      {settings.phone && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Phone
              </p>
              <a
                href={`tel:${settings.phone}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {settings.phone}
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {settings.email && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {settings.email}
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {address && (
        <Card>
          <CardContent className="flex items-start gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Address
              </p>
              <p className="font-medium">{address}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div>
          <Separator className="mb-4" />
          <p className="text-muted-foreground mb-4 text-sm font-medium">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-3">
            {settings.socialLinks
              .filter((link) => link.url && link.platform)
              .map((link, i) => (
                <Button key={i} variant="outline" size="sm" asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialIcons[link.platform!] || link.platform}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
