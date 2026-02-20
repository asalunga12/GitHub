export default function CTA() {
  return (
    <section className="bg-indigo-600 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to supercharge your workflow?
        </h2>
        <p className="mt-4 text-lg text-indigo-200 max-w-xl mx-auto">
          Join 2,000+ teams already using YourProduct. Start your free 14-day
          trial — no credit card required.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-full text-base hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Get started for free
          </a>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center text-white border border-indigo-400 font-semibold px-8 py-3.5 rounded-full text-base hover:bg-indigo-700 transition-colors"
          >
            Talk to sales
          </a>
        </div>
        <p className="mt-6 text-sm text-indigo-300">
          14-day free trial &middot; No credit card &middot; Cancel any time
        </p>
      </div>
    </section>
  );
}
