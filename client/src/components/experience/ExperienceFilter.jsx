export default function ExperienceFilter({ activeCategory, onCategoryChange }) {
  const CATEGORIES = ["All", "Adventure", "Culture", "Food & Drink", "Nature"];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-100">
      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">
        Filter By:
      </span>

      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
