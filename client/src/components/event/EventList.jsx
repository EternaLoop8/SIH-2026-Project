
export default function EventList({ activeCategory, onCategoryChange }) {
  const CATEGORIES = ['All Festivals', 'Workshops', 'Cultural Programs', 'Music', 'Food Events'];

  return (
    <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeCategory === cat 
              ? 'bg-white text-indigo-600 shadow-xs border border-slate-200' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
