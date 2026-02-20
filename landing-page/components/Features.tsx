const features = [
  {
    icon: "⚡",
    title: "Blazing fast",
    description: "Built for speed from the ground up. Your team will never wait on the tool again.",
  },
  {
    icon: "🔒",
    title: "Secure by default",
    description: "Enterprise-grade security and compliance baked in, not bolted on.",
  },
  {
    icon: "🔗",
    title: "Integrates with everything",
    description: "Connect to your existing stack in minutes with 100+ pre-built integrations.",
  },
  {
    icon: "📊",
    title: "Powerful analytics",
    description: "Real-time insights and dashboards that help you make smarter decisions.",
  },
  {
    icon: "🤝",
    title: "Built for teams",
    description: "Collaborate seamlessly with role-based access, comments, and live cursors.",
  },
  {
    icon: "🌍",
    title: "Available anywhere",
    description: "Access your workspace from any device, any browser, any time zone.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            YourProduct is packed with powerful features designed to help your team move faster and work smarter.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
