const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects.",
    features: ["Up to 3 projects", "5 team members", "Basic analytics", "Community support"],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Everything a growing team needs.",
    features: [
      "Unlimited projects",
      "Up to 25 team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom contracts",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No hidden fees. No surprises. Start for free and scale as you grow.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.highlighted
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105"
                  : "border-gray-200 bg-white text-gray-900"
              }`}
            >
              <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? "text-indigo-100" : "text-gray-500"}`}>
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlighted ? "text-indigo-200" : "text-gray-400"}`}>
                  / {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-indigo-100" : "text-gray-500"}`}>
                {plan.description}
              </p>

              <a
                href="#"
                className={`block text-center text-sm font-semibold px-6 py-3 rounded-xl mb-8 transition-colors ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`h-5 w-5 flex-shrink-0 ${plan.highlighted ? "text-indigo-200" : "text-indigo-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlighted ? "text-indigo-100" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
