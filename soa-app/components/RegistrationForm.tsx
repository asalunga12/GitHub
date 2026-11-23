"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(2, "Company name is required"),
  headcount: z.string().min(1, "Headcount is required"),
  registrationType: z.string().min(1, "Registration type is required"),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const REGISTRATION_TYPES = [
  "Individual Registration",
  "Sprout Client Registration",
  "Group Registration",
  "Startup Founder",
  "Group Registration - Client",
  "Table Registration",
];

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      companyName: "",
      headcount: "",
      registrationType: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Registration failed");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Registration Received!</h2>
        <p className="text-gray-500 mb-6">
          Thank you for registering. Our team will be in touch with you shortly.
        </p>
        <a href="/request-soa" className="btn-primary py-2 px-6">
          Need a Statement of Account?
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
      {/* Honeypot */}
      <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input {...register("name")} className="input-field" placeholder="Juan Dela Cruz" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="form-label">Email Address *</label>
          <input {...register("email")} type="email" className="input-field" placeholder="juan@company.com" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="form-label">Phone Number *</label>
          <input {...register("phone")} type="tel" className="input-field" placeholder="+63 917 000 0000" />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="form-label">Job Title *</label>
          <input {...register("jobTitle")} className="input-field" placeholder="HR Manager" />
          {errors.jobTitle && <p className="text-xs text-red-500 mt-1">{errors.jobTitle.message}</p>}
        </div>

        <div>
          <label className="form-label">Company Name *</label>
          <input {...register("companyName")} className="input-field" placeholder="ABC Corporation" />
          {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
        </div>

        <div>
          <label className="form-label">Company Headcount *</label>
          <input {...register("headcount")} className="input-field" placeholder="e.g. 250" />
          {errors.headcount && <p className="text-xs text-red-500 mt-1">{errors.headcount.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="form-label">Registration Type *</label>
          <select {...register("registrationType")} className="input-field bg-white">
            <option value="">Select registration type</option>
            {REGISTRATION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.registrationType && <p className="text-xs text-red-500 mt-1">{errors.registrationType.message}</p>}
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {submitError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-base">
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Registration"
        )}
      </button>
    </form>
  );
}
