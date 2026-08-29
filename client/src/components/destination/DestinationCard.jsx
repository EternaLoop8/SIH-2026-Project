

export default function DestinationCard({ destination }) {
  const { name, location, image, price, rating } = destination;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 backdrop-blur-sm">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {location}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
            ⭐ {rating}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          {name}
        </h3>

        <button className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-600 hover:text-white">
          Explore Details
        </button>
      </div>
    </div>
  );
}
