"use client";

import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import RegistrantList from "./RegistrantList";
import CSVUploader from "./CSVUploader";

const registrantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

const formSchema = z.object({
  requestorName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  companyAddress: z.string().min(5, "Address is required"),
  tin: z.string().min(9, "TIN must be at least 9 digits"),
  sproutClient: z.boolean(),
  rate: z.number({ invalid_type_error: "Rate must be a number" }).positive("Rate must be positive"),
  registrants: z.array(registrantSchema).min(1, "At least one registrant is required"),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);
}

export default function SOAForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCSV, setShowCSV] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestorName: "",
      email: "",
      companyName: "",
      companyAddress: "",
      tin: "",
      sproutClient: false,
      rate: 0,
      registrants: [{ name: "", email: "" }],
      honeypot: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const registrants = useWatch({ control, name: "registrants" });
  const rate = useWatch({ control, name: "rate" }) ?? 0;
  const count = registrants?.length ?? 0;
  const subtotal = rate * count;
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/generate-soa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to generate SOA");
      router.push(`/soa/${json.soaNumber}?new=1`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Honeypot - hidden from users */}
        <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Section: Requestor Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">1</span>
            Requestor Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Full Name *</label>
              <input {...register("requestorName")} className="input-field" placeholder="Juan Dela Cruz" />
              {errors.requestorName && <p className="text-xs text-red-500 mt-1">{errors.requestorName.message}</p>}
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input {...register("email")} type="email" className="input-field" placeholder="juan@company.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Company Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">2</span>
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Company Name *</label>
              <input {...register("companyName")} className="input-field" placeholder="ABC Corporation" />
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <label className="form-label">Company TIN *</label>
              <input {...register("tin")} className="input-field" placeholder="000-000-000" />
              {errors.tin && <p className="text-xs text-red-500 mt-1">{errors.tin.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Company Address *</label>
              <input {...register("companyAddress")} className="input-field" placeholder="123 Main St, Makati City, Metro Manila" />
              {errors.companyAddress && <p className="text-xs text-red-500 mt-1">{errors.companyAddress.message}</p>}
            </div>
            <div>
              <label className="form-label">Are you a Sprout Client?</label>
              <div className="flex gap-4 mt-2">
                {[{ label: "Yes", value: true }, { label: "No", value: false }].map(({ label, value }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={label}
                      onChange={() => setValue("sproutClient", value)}
                      defaultChecked={!value}
                      name="sproutClient"
                      className="text-green-600"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Rate per Registrant (PHP, before tax) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₱</span>
                <input
                  {...register("rate", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="input-field pl-7"
                  placeholder="5000"
                />
              </div>
              {errors.rate && <p className="text-xs text-red-500 mt-1">{errors.rate.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Registrants */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">3</span>
              Registrants
              {count > 0 && (
                <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </h2>
            <button
              type="button"
              onClick={() => setShowCSV((v) => !v)}
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {showCSV ? "Hide CSV Upload" : "Upload CSV"}
            </button>
          </div>

          {showCSV && (
            <div className="mb-5 p-4 bg-green-50 rounded-lg border border-green-200">
              <CSVUploader
                onUpload={(newRegs) => {
                  setValue("registrants", newRegs);
                  setShowCSV(false);
                }}
              />
            </div>
          )}

          <RegistrantList />
          {errors.registrants?.message && (
            <p className="text-xs text-red-500 mt-2">{errors.registrants.message}</p>
          )}
        </div>

        {/* Section: Summary */}
        <div className="card bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center font-bold">4</span>
            Financial Summary
          </h2>
          <div className="space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rate per Registrant</span>
              <span>{formatCurrency(rate)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Number of Registrants</span>
              <span>{count}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT (12%)</span>
              <span>{formatCurrency(vat)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span className="text-green-700">{formatCurrency(total)}</span>
            </div>
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
              Generating SOA...
            </span>
          ) : (
            "Generate Statement of Account"
          )}
        </button>
      </form>
    </FormProvider>
  );
}
