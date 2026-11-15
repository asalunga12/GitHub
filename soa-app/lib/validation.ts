import { z } from "zod";

export const registrantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const soaRequestSchema = z.object({
  requestorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  companyAddress: z.string().min(5, "Address is required"),
  tin: z.string().min(9, "TIN must be at least 9 digits").max(20),
  sproutClient: z.boolean(),
  rate: z.number().positive("Rate must be a positive number"),
  registrants: z
    .array(registrantSchema)
    .min(1, "At least one registrant is required"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type SOARequestInput = z.infer<typeof soaRequestSchema>;
export type RegistrantInput = z.infer<typeof registrantSchema>;
