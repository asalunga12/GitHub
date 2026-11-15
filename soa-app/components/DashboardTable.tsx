"use client";

import { useState } from "react";
import Link from "next/link";

interface SOA {
  id: string;
  soaNumber: string;
  companyName: string;
  requestorName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface DashboardTableProps {
  soas: SOA[];
  onMarkPaid: (soaNumber: string) => Promise<void>;
  onResendEmail: (soaNumber: string) => Promise<void>;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

export default function DashboardTable({
  soas,
  onMarkPaid,
  onResendEmail,
}: DashboardTableProps) {
  const [loadingMap, setLoadingMap] = useState<Record<string, string>>({});

  const withLoading = async (
    soaNumber: string,
    action: string,
    fn: () => Promise<void>
  ) => {
    setLoadingMap((m) => ({ ...m, [soaNumber]: action }));
    try {
      await fn();
    } finally {
      setLoadingMap((m) => {
        const next = { ...m };
        delete next[soaNumber];
        return next;
      });
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (soas.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="font-medium">No statements of account found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left font-semibold text-gray-600">SOA Number</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Company</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Requestor</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-600">Total</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {soas.map((soa) => {
            const isLoading = loadingMap[soa.soaNumber];
            return (
              <tr key={soa.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-green-700 font-semibold">
                  {soa.soaNumber}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{soa.companyName}</td>
                <td className="px-4 py-3 text-gray-600">{soa.requestorName}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatCurrency(soa.total)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={soa.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(soa.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/soa/${soa.soaNumber}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View SOA"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>

                    <a
                      href={`/api/soa/${soa.soaNumber}/pdf`}
                      download
                      className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Download PDF"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>

                    {soa.status !== "Paid" && (
                      <button
                        onClick={() =>
                          withLoading(soa.soaNumber, "paid", () => onMarkPaid(soa.soaNumber))
                        }
                        disabled={!!isLoading}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                        title="Mark as Paid"
                      >
                        {isLoading === "paid" ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        withLoading(soa.soaNumber, "email", () => onResendEmail(soa.soaNumber))
                      }
                      disabled={!!isLoading}
                      className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors disabled:opacity-50"
                      title="Resend Email"
                    >
                      {isLoading === "email" ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
