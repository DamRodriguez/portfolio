import { z } from "zod";

const emptyFieldMessage = "form.errors.empty";
const emailErrorMessaage = "form.errors.email";
const noSelectedOption = "form.errors.options";

export const ContactSchema = z.object({
  name: z.string().min(1, { message: emptyFieldMessage }),
  email: z
    .string()
    .min(1, { message: emptyFieldMessage })
    .pipe(z.email({ message: emailErrorMessaage })),
  option: z.any().refine((val) => val !== undefined && val !== null, {
    message: noSelectedOption,
  }),
  message: z.string().min(1, { message: emptyFieldMessage }),
  honeypot: z.string().optional(),
});

export const ContactSchemaFieldNames = ContactSchema.keyof().enum;

export type ContactSchemaType = z.infer<typeof ContactSchema>;
