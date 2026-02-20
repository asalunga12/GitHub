const steps = [
  {
    step: "01",
    title: "Sign up for free",
    description: "Create your account in under a minute — no credit card required.",
  },
  {
    step: "02",
    title: "Connect your workspace",
    description: "Import your data or connect your existing tools with one click.",
  },
  {
    step: "03",
    title: "Invite your team",
    description: "Add teammates and assign roles. Collaboration starts immediately.",
  },
  {
    step: "04",
    title: "See results",
    description: "Watch productivity soar with real-time analytics and insights.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Up and running in minutes
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Getting started with YourProduct is simple. Follow these four steps and your team will be productive from day one.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-start">
              {/* Connector line (hidden on last item) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-16 right-0 h-px bg-indigo-100" />
              )}
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-4 z-10">
                {s.step}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
