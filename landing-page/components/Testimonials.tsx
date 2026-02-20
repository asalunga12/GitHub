const testimonials = [
  {
    quote:
      "YourProduct has completely transformed how our team collaborates. We shipped 3x faster in the first month alone.",
    name: "Alex Johnson",
    title: "CTO at StartupCo",
    avatar: "AJ",
  },
  {
    quote:
      "I was skeptical at first, but the setup was painless and the results were immediate. Highly recommend.",
    name: "Maria Garcia",
    title: "Product Lead at ScaleUp",
    avatar: "MG",
  },
  {
    quote:
      "The analytics features alone are worth the price. We finally have visibility into what actually matters.",
    name: "James Kim",
    title: "Head of Engineering at Techify",
    avatar: "JK",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by teams everywhere
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from real customers who use YourProduct every day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
