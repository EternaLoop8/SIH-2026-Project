export default function BusinessProfile({ business, onBack }) {
  if (!business) return null;

  const {
    name,
    category,
    rating,
    reviewCount,
    description,
    address,
    phone,
    website,
    hours,
    image,
    tags,
    isOpen,
  } = business;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Cover / Header Banner */}
      <div className="relative h-64 sm:h-80 bg-slate-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent" />
        <div className="absolute bottom-6 left-0 w-full px-4 sm:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <button
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to listings
              </button>
              <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 inline-block">
                {category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
            </div>

            {/* Quick Ratings Overlay Block */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center gap-3 self-start sm:self-auto">
              <div className="text-center">
                <span className="text-xl font-extrabold text-white block">
                  ★ {rating.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                  {reviewCount} Reviews
                </span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {isOpen ? (
                  <span className="text-emerald-400">● Open</span>
                ) : (
                  <span className="text-rose-400">○ Closed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Splitting Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Core Context Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Segment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              About the Business
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Operational Hours Calendar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Operating Hours
            </h2>
            <div className="divide-y divide-slate-100">
              {Object.entries(hours || {}).map(([day, time]) => (
                <div key={day} className="flex justify-between py-2.5 text-sm">
                  <span className="capitalize font-medium text-slate-600">
                    {day}
                  </span>
                  <span className="text-slate-800 font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Widget Action Box */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Contact & Location
            </h3>

            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex gap-3">
                <span className="text-base shrink-0">📍</span>
                <p className="font-medium text-slate-700">{address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-base shrink-0">📞</span>
                <p className="font-semibold text-slate-900">{phone}</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-base shrink-0">🌐</span>
                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline font-semibold break-all"
                >
                  {website}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer text-center text-sm shadow-sm">
                Get Directions
              </button>
              <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl transition-colors cursor-pointer text-center text-sm border border-slate-200">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
