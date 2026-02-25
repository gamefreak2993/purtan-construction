"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-contact-email";
import { cn } from "@/lib/utils";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
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
        <div className="mb-6 flex items-center gap-3 border-2 border-green-600 bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">{t("success")}</p>
        </div>
      )}

      {state.error && (
        <div className="mb-6 flex items-center gap-3 border-2 border-red-600 bg-red-50 p-4 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">{state.error}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {t("name")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={cn(
              "w-full border-2 border-foreground/20 bg-transparent px-4 py-3 text-sm transition-colors",
              "focus:border-amber-500 focus:outline-none",
              "placeholder:text-muted-foreground/50"
            )}
            placeholder={t("name")}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {t("email")} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={cn(
              "w-full border-2 border-foreground/20 bg-transparent px-4 py-3 text-sm transition-colors",
              "focus:border-amber-500 focus:outline-none",
              "placeholder:text-muted-foreground/50"
            )}
            placeholder={t("email")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={cn(
              "w-full border-2 border-foreground/20 bg-transparent px-4 py-3 text-sm transition-colors",
              "focus:border-amber-500 focus:outline-none",
              "placeholder:text-muted-foreground/50"
            )}
            placeholder={t("phone")}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {t("message")} *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={cn(
              "w-full border-2 border-foreground/20 bg-transparent px-4 py-3 text-sm transition-colors resize-vertical",
              "focus:border-amber-500 focus:outline-none",
              "placeholder:text-muted-foreground/50"
            )}
            placeholder={t("message")}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-2 bg-amber-500 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all",
            "hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
          {isPending ? t("sending") : t("submit")}
        </button>
      </form>
    </div>
  );
}
