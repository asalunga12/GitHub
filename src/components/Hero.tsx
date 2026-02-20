export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-purple-100 opacity-40 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Now in public beta — try it free
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto">
          The smarter way to{" "}
          <span className="text-indigo-600">build, ship,</span> and{" "}
          <span className="text-indigo-600">scale</span> your product
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          YourProduct helps teams move faster with powerful automation, real-time
          collaboration, and actionable analytics — all in one place.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-colors shadow-lg shadow-indigo-200"
          >
            Get started for free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-700 hover:text-indigo-600 font-semibold px-6 py-3.5 rounded-full text-base border border-slate-200 hover:border-indigo-200 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-slate-400">
          Trusted by{" "}
          <span className="font-semibold text-slate-600">2,000+</span> teams at
          companies like{" "}
          <span className="font-semibold text-slate-600">Acme, Globex &amp; Initech</span>
        </p>

        {/* Hero image / app mockup */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="rounded-2xl shadow-2xl ring-1 ring-slate-900/5 overflow-hidden bg-slate-900">
            {/* Fake browser chrome */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 h-5 bg-slate-700 rounded-full max-w-sm" />
            </div>
            {/* Fake dashboard */}
            <div className="bg-slate-50 p-6 min-h-[320px] flex gap-4">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col gap-3 w-40">
                {["Dashboard", "Analytics", "Projects", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`h-8 rounded-lg flex items-center px-3 text-xs font-medium ${
                      i === 0
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Users", value: "12,482" },
                    { label: "Revenue", value: "$48.2k" },
                    { label: "Conversion", value: "3.6%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <p className="text-xs text-slate-400">{stat.label}</p>
                      <p className="text-xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <div className="flex items-end gap-1 h-24">
                    {[40, 65, 50, 80, 60, 90, 75, 95, 70, 85, 55, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-indigo-200"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
