// 💡 FIXED: Destructured the 'onViewProfile' callback function coming from BusinessGrid parent container
export default function BusinessCard({ business, onViewProfile }) {
  const {
    name,
    category,
    rating = 0, // Fallback default values prevent crashes if fields are missing in older records
    reviewCount = 0,
    neighbourhood, // 💡 FIXED: Match exact database schema name casing with a 'u'
    image,
    isOpen,
    tags = [],
  } = business;

  const imageUrl = image?.url || "https://unsplash.com";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100 flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={name || "Business"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Live Operational Status Tag */}
        <div
          className={`absolute top-4 left-4 rounded-md px-2.5 py-1 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md ${
            isOpen
              ? "bg-emerald-500/90 text-white"
              : "bg-rose-500/90 text-white"
          }`}
        >
          {isOpen ? "● Open Now" : "○ Closed"}
        </div>
      </div>

      {/* Info Stack */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 truncate">
              {category || "Local Business"}
            </span>
            <span className="text-xs font-medium text-slate-400 shrink-0">
              📍 {neighbourhood || "Nearby"} {/* 💡 FIXED: Uses schema-matched variable */}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-2">
            {name}
          </h3>

          {/* Local Rating Metadata */}
          <div className="flex items-center gap-1 mb-4">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-sm font-bold text-slate-700">
              {/* 💡 FIXED: Optional safety fallback logic added onto decimal strings formatter */}
              {typeof rating === "number" ? rating.toFixed(1) : "0.0"} 
            </span>
            <span className="text-xs text-slate-400">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Sub-features/Tags */}
          <div className="flex flex-wrap gap-1 mb-6">
            {tags?.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-50 text-slate-500 text-[11px] font-semibold px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Router Controller */}
        <button
          onClick={onViewProfile} // 💡 FIXED: Connected the execution trigger to flip views seamlessly 
          className="w-full rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm py-2.5 transition-colors cursor-pointer text-center"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
