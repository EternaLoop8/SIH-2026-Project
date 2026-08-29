export default function ExperienceCard({ experience }) {
  // Guard clause to prevent undefined destructuring crashes
  if (!experience) return null;

  const {
    title,
    category,
    duration,
    price,
    rating,
    reviewsCount,
    image,
    isPopular,
  } = experience;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100">
      {/* Visual Asset Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Conditional Highlight Badge */}
        {isPopular && (
          <div className="absolute top-4 left-4 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm">
            Best Seller
          </div>
        )}
        <div className="absolute bottom-4 right-4 rounded-xl bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          ⏱️ {duration}
        </div>
      </div>

      {/* Main Metadata Text Stack */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {category}
          </span>
          <div className="flex items-center gap-1 text-slate-700 text-sm font-semibold">
            <span className="text-amber-500">★</span> {rating}
            <span className="text-xs text-slate-400 font-normal">
              ({reviewsCount})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-14 mb-4">
          {title}
        </h3>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wide">
              From
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              ${price}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {" "}
              / person
            </span>
          </div>
          <button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 transition-colors cursor-pointer shadow-sm">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
