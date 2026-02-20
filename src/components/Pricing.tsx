"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    description: "Perfect for individuals and small experiments.",
    features: [
      "Up to 3 projects",
      "1 workspace member",
      "Basic analytics",
      "Community support",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 19,
    description: "For growing teams that need more power and collaboration.",
    features: [
      "Unlimited projects",
      "Up to 20 members",
      "Advanced analytics",
      "100+ integrations",
      "Priority email support",
      "Custom automations",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 99,
    annual: 79,
    description: "For large organisations with advanced security needs.",
    features: [
      "Everything in Pro",
      "Unlimited members",
      "SSO & SAML",
      "Audit logs",
      "SLA & dedicated CSM",
      "Custom contracts",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No hidden fees. Cancel any time. Start free and upgrade when you
            need more.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-2 py-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !annual ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                annual ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                Save 35%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-600"
                  : "bg-white border border-slate-100 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold ${
                    plan.highlighted ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    plan.highlighted ? "text-indigo-200" : "text-slate-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.highlighted ? "text-white" : "text-slate-900"
                    }`}
                  >
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  {(annual ? plan.annual : plan.monthly) > 0 && (
                    <span
                      className={`text-sm mb-1 ${
                        plan.highlighted ? "text-indigo-200" : "text-slate-400"
                      }`}
                    >
                      / mo
                    </span>
                  )}
                </div>
                {(annual ? plan.annual : plan.monthly) === 0 && (
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-indigo-200" : "text-slate-400"
                    }`}
                  >
                    Free forever
                  </span>
                )}
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={plan.highlighted ? "text-indigo-200" : "text-indigo-600"}
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={plan.highlighted ? "text-indigo-100" : "text-slate-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center font-semibold py-3 rounded-full text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
