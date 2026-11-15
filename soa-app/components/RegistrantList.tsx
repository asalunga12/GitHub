"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

interface SOAFormValues {
  registrants: { name: string; email: string }[];
  [key: string]: unknown;
}

export default function RegistrantList() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SOAFormValues>();

  const { fields, append, remove } = useFieldArray<SOAFormValues>({
    name: "registrants",
  });

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex-shrink-0 w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold mt-1">
            {index + 1}
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                {...register(`registrants.${index}.name`)}
                placeholder="Full Name"
                className="input-field text-sm"
              />
              {(errors.registrants as { name?: { message?: string } }[] | undefined)?.[index]?.name && (
                <p className="text-xs text-red-500 mt-1">
                  {(errors.registrants as { name?: { message?: string } }[])[index].name?.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register(`registrants.${index}.email`)}
                placeholder="Email Address"
                type="email"
                className="input-field text-sm"
              />
              {(errors.registrants as { email?: { message?: string } }[] | undefined)?.[index]?.email && (
                <p className="text-xs text-red-500 mt-1">
                  {(errors.registrants as { email?: { message?: string } }[])[index].email?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-1"
            title="Remove registrant"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", email: "" })}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 hover:border-green-400 hover:text-green-600 text-gray-500 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Registrant
      </button>
    </div>
  );
}
