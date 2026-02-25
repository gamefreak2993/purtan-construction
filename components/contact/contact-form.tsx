"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-contact-email";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div>
      {state.success && (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{t("success")}</AlertDescription>
        </Alert>
      )}

      {state.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t("name")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t("email")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder={t("phone")}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">{t("message")} *</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={t("message")}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? t("sending") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
