"use server";

import { Resend } from "resend";
import { z } from "zod";
import { buildContactEmailHtml } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Validation failed",
    };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Purtan Construction <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "daniel@example.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: buildContactEmailHtml({ name, email, phone, message }),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Failed to send email. Please try again.",
    };
  }
}
