const DestinationHero = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-32 sm:py-40">
      {/* Background Image Layer */}
      <img
        src="https://unsplash.com"
        alt="Scenic travel highway background banner"
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
      />

      {/* Tailwind v4 Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent" />

      {/* Interactive Hero Content Container */}
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-indigo-500/20 ring-inset mb-6">
          Discover New Horizons 2026
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Find Your Next <span className="text-indigo-400">Adventure</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Explore hidden landscapes, historical monuments, and luxury escapes
          curated exclusively for our global travel community.
        </p>

        {/* Integrated Mock Search Bar Widget */}
        <div className="mx-auto mt-10 max-w-xl bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2">
          <div className="flex-1 text-left px-3">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
              Where to?
            </span>
            <input
              type="text"
              placeholder="Search country, city, or resort..."
              className="w-full mt-0.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;
