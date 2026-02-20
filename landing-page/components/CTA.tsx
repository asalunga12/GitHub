export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-indigo-600">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-indigo-200 text-lg mb-10">
          Join thousands of teams already using YourProduct. Start for free — no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Start for free
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3 border border-indigo-400 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
