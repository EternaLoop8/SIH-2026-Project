export default function Testimonial() {
  const FEATURES = [
    { label: "✓ VERIFIED", title: "Local businesses are verified" },
    { label: "📍 LOCAL", title: "Discover authentic local experiences" },
    { label: "📊 SMART", title: "Plan according to time & budget" },
    { label: "🤝 COMMUNITY", title: "Support local tourism businesses" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2 flex items-center justify-center gap-2">
        ⭐ Why Choose Us?
      </h2>
      <p className="text-sm text-slate-500 mb-12">Keep this short.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center"
          >
            <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-2">
              {item.label}
            </span>
            <p className="text-slate-700 font-semibold text-sm text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
