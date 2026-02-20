const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description:
      "Sign up in seconds — no credit card required. Invite your team and start your free 14-day trial instantly.",
  },
  {
    number: "02",
    title: "Connect your tools",
    description:
      "Link your existing stack with one-click integrations. YourProduct syncs with everything you already use.",
  },
  {
    number: "03",
    title: "Build your workflow",
    description:
      "Use our drag-and-drop builder to automate tasks and processes. Go from idea to automation in minutes.",
  },
  {
    number: "04",
    title: "Ship and scale",
    description:
      "Watch productivity soar. Track results with real-time analytics and scale confidently as your team grows.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            How it Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Getting started is simple. Follow these four steps and your team
            will be shipping faster by end of day.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-indigo-100" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-extrabold shadow-lg shadow-indigo-200 mb-5">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
