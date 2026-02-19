import { z } from "zod";

const emptyFieldMessage = "contactSection.form.errors.empty";
const emailErrorMessaage = "contactSection.form.errors.email";

export const ContactSchema = z.object({
  name: z.string().min(1, { message: emptyFieldMessage }),
  email: z
    .string()
    .min(1, { message: emptyFieldMessage })
    .pipe(z.email({ message: emailErrorMessaage })),
  message: z.string().min(1, { message: emptyFieldMessage }),
  honeypot: z.string().optional(),
});

export const ContactSchemaFieldNames = ContactSchema.keyof().enum;

export type ContactSchemaType = z.infer<typeof ContactSchema>;