"use client";

import { useState } from "react";
import Link from "next/link";

interface Registrant {
  id: string;
  name: string;
  email: string;
}

interface SOA {
  id: string;
  soaNumber: string;
  requestorName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  tin: string;
  sproutClient: boolean;
  rate: number;
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  createdAt: string;
  registrants: Registrant[];
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SOAViewClient({ soa }: { soa: SOA }) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setPaying(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soaNumber: soa.soaNumber }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Payment failed");
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate payment");
      setPaying(false);
    }
  };

  const isPaid = soa.status === "Paid";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">Sprout Solutions</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`/api/soa/${soa.soaNumber}/pdf`}
              download
              className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            {!isPaid && (
              <button
                onClick={handlePay}
                disabled={paying}
                className="btn-primary text-sm py-2 px-3 flex items-center gap-1.5"
              >
                {paying ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Pay Online
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* SOA Document */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* SOA Header */}
          <div className="bg-green-600 px-8 py-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">SPROUT SOLUTIONS</h1>
                <p className="text-green-200 text-sm mt-1">Philippines Inc.</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold">STATEMENT OF ACCOUNT</h2>
                <p className="text-green-200 text-sm font-mono mt-1">{soa.soaNumber}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            {/* Meta */}
            <div className="flex flex-wrap gap-6 pb-6 border-b border-gray-200 mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Date Issued</p>
                <p className="font-semibold text-gray-900 mt-0.5">{formatDate(soa.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                <span className={`inline-flex items-center mt-0.5 px-2.5 py-0.5 rounded-full text-sm font-semibold ${isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {soa.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Sprout Client</p>
                <p className={`font-semibold mt-0.5 ${soa.sproutClient ? "text-green-700" : "text-gray-700"}`}>
                  {soa.sproutClient ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-6">
              <p className="text-xs text-green-600 uppercase tracking-wide font-semibold mb-2">Bill To</p>
              <p className="font-bold text-gray-900 text-lg">{soa.requestorName}</p>
              <p className="text-gray-700">{soa.companyName}</p>
              <p className="text-gray-600 text-sm">{soa.companyAddress}</p>
              <p className="text-gray-600 text-sm">TIN: {soa.tin}</p>
              <p className="text-gray-600 text-sm">{soa.email}</p>
            </div>

            {/* Registrant Table */}
            <div className="mb-6">
              <p className="text-xs text-green-600 uppercase tracking-wide font-semibold mb-3">
                Registrants ({soa.registrants.length})
              </p>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-4 py-2.5 text-left w-12">#</th>
                      <th className="px-4 py-2.5 text-left">Name</th>
                      <th className="px-4 py-2.5 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {soa.registrants.map((reg, idx) => (
                      <tr key={reg.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2.5 text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-2.5 font-medium text-gray-900">{reg.name}</td>
                        <td className="px-4 py-2.5 text-gray-600">{reg.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-end mb-6">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Rate per Registrant</span>
                  <span>{formatCurrency(soa.rate)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Registrants</span>
                  <span>{soa.registrants.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(soa.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (12%)</span>
                  <span>{formatCurrency(soa.vat)}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-white bg-green-600 rounded-lg px-3 py-2.5">
                  <span>Total Amount Due</span>
                  <span>{formatCurrency(soa.total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
              <p className="text-xs text-green-600 uppercase tracking-wide font-semibold mb-3">Payment Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Account Name</p>
                  <p className="font-medium text-gray-900 mt-0.5">Sprout Solutions Philippines Inc</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Bank</p>
                  <p className="font-medium text-gray-900 mt-0.5">BDO Unibank</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Note</p>
                  <p className="font-medium text-gray-900 mt-0.5">Please settle payment upon receipt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pay button (bottom) */}
        {!isPaid && (
          <div className="mt-6 text-center print:hidden">
            <button
              onClick={handlePay}
              disabled={paying}
              className="btn-primary py-3 px-8 text-base"
            >
              {paying ? "Redirecting to payment..." : `Pay ${formatCurrency(soa.total)} Online`}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
