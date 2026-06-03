import z from "zod";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-ZæøåÆØÅ .'-]+$/;

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(100, "Full name must be at most 100 characters long")
    .regex(NAME_REGEX, "Full name must not contain invalid characters"),
  email: z
    .email("Invalid email address")
    .trim()
    .min(1, { message: "Email is required" })
    .max(100, "Email must be at most 100 characters long")
    .regex(EMAIL_REGEX, "Email must be a valid Norwegian email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters long")
    .max(100, "Subject must be at most 100 characters long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must be at most 500 characters long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
