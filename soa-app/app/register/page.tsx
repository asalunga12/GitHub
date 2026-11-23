import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";

export const metadata = {
  title: "Register - Sprout Solutions",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">Sprout Solutions</span>
          </Link>
          <span className="text-sm text-gray-500">Event Registration</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-gray-500">
            Register your interest and our team will follow up with you.
          </p>
        </div>

        <RegistrationForm />

        <p className="text-center text-sm text-gray-400 mt-6">
          Already registered and need billing?{" "}
          <Link href="/request-soa" className="text-green-600 hover:underline">
            Request a Statement of Account
          </Link>
        </p>
      </main>
    </div>
  );
}
