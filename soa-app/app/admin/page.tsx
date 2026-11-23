"use client";

import { useEffect, useState, useCallback } from "react";
import DashboardTable from "@/components/DashboardTable";
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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="card">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function AdminPage() {
  const [soas, setSoas] = useState<SOA[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSOAs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(search ? { search } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/soa?${params}`);
      const json = await res.json();
      setSoas(json.data ?? []);
      setPagination(json.pagination ?? null);
    } catch {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchSOAs();
  }, [fetchSOAs]);

  const handleMarkPaid = async (soaNumber: string) => {
    const res = await fetch(`/api/soa/${soaNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Paid" }),
    });
    if (!res.ok) throw new Error("Failed to mark as paid");
    showToast(`${soaNumber} marked as Paid`, "success");
    fetchSOAs();
  };

  const handleResendEmail = async (soaNumber: string) => {
    const res = await fetch(`/api/soa/${soaNumber}/resend-email`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to resend email");
    showToast(`Email resent for ${soaNumber}`, "success");
  };

  const totalSOAs = pagination?.total ?? 0;
  const paidCount = soas.filter((s) => s.status === "Paid").length;
  const unpaidCount = soas.filter((s) => s.status === "Unpaid").length;
  const totalRevenue = soas.reduce((sum, s) => sum + (s.status === "Paid" ? s.total : 0), 0);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
            <div>
              <h1 className="font-bold text-gray-900">Finance Dashboard</h1>
              <p className="text-xs text-gray-500">Sprout Solutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/api/soa/export${statusFilter ? `?status=${statusFilter}` : ""}`}
              download
              className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV{statusFilter ? ` (${statusFilter})` : ""}
            </a>
            <Link href="/request-soa" className="btn-primary text-sm py-2 px-4">
              + New SOA
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total SOAs" value={totalSOAs} color="text-gray-900" />
          <StatCard label="Paid" value={paidCount} color="text-green-700" />
          <StatCard label="Unpaid" value={unpaidCount} color="text-yellow-700" />
          <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} color="text-green-700" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by SOA number, company, or requestor..."
              className="input-field pl-9 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="input-field w-auto text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-8 h-8 animate-spin mx-auto text-green-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gray-500 mt-3">Loading...</p>
          </div>
        ) : (
          <DashboardTable
            soas={soas}
            onMarkPaid={handleMarkPaid}
            onResendEmail={handleResendEmail}
          />
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page >= pagination.pages}
                className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
