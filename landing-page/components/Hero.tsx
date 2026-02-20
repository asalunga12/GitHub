export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Now in public beta — try it free
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Your awesome headline{" "}
          <span className="text-indigo-600">goes right here</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          YourProduct helps teams do amazing things faster. Replace this tagline with a clear,
          benefit-driven description of what you actually do.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Start for free
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-gray-400">
          Trusted by <span className="font-semibold text-gray-600">2,000+</span> teams worldwide · No credit card required
        </p>

        {/* Hero image placeholder */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200 overflow-hidden">
          <div className="bg-gray-100 flex items-center gap-1.5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="h-72 sm:h-96 flex items-center justify-center text-gray-300 text-sm">
            [ Your product screenshot or demo goes here ]
          </div>
        </div>
      </div>
    </section>
  );
}
