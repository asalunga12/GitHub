const testimonials = [
  {
    quote:
      "YourProduct cut our release cycle in half. The automation workflows are insanely good and the analytics gave us insights we never had before.",
    name: "Sarah Chen",
    role: "Engineering Lead @ Acme Corp",
    avatar: "SC",
    color: "bg-violet-500",
  },
  {
    quote:
      "We evaluated five tools and YourProduct was the clear winner. Onboarding took one afternoon and our team was fully productive the next morning.",
    name: "Marcus Williams",
    role: "VP of Product @ Globex",
    avatar: "MW",
    color: "bg-sky-500",
  },
  {
    quote:
      "The integrations are seamless — it just connects to everything. Support is also phenomenal. They actually respond and fix things.",
    name: "Priya Nair",
    role: "CTO @ Initech",
    avatar: "PN",
    color: "bg-emerald-500",
  },
  {
    quote:
      "I was skeptical, but YourProduct proved me wrong. The ROI within the first month more than paid for the annual subscription.",
    name: "James Park",
    role: "Founder @ StartupXYZ",
    avatar: "JP",
    color: "bg-rose-500",
  },
  {
    quote:
      "Our team collaboration has never been smoother. Real-time sync and live cursors feel like magic when you're working across time zones.",
    name: "Lena Müller",
    role: "Head of Design @ Hooli",
    avatar: "LM",
    color: "bg-amber-500",
  },
  {
    quote:
      "Enterprise security features were the deciding factor for us. SSO, audit logs, and compliance certifications — it checks every box.",
    name: "David Torres",
    role: "CISO @ FinanceCo",
    avatar: "DT",
    color: "bg-indigo-500",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-amber-400">
          <path d="M8 1l1.83 3.71L14 5.53l-3 2.92.71 4.12L8 10.43l-3.71 2.14L5 8.45 2 5.53l4.17-.82L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Don&apos;t take our word for it — here&apos;s what our customers say.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col gap-4"
            >
              <StarRating />
              <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
