export default function EventCard({ event }) {
  if (!event) return null;
  
  // Destructure with robust default fallbacks
  const { 
    date = "15", 
    month = "Oct", 
    title = "Cultural Festival", 
    location = "Varanasi, UP", 
    time = "6:00 PM onwards",
    category = "Culture"
  } = event;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex gap-4 shadow-sm items-center hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-300 transition-all duration-300 group">
      {/* Date Icon Block */}
      <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-black rounded-xl p-3 flex flex-col items-center justify-center shrink-0 w-16 h-16 uppercase tracking-wider shadow-inner">
        <span className="text-[10px] leading-none text-indigo-400 font-bold">
          {month.slice(0, 3)}
        </span>
        <span className="text-xl leading-none mt-1">{date}</span>
      </div>

      {/* Info Cluster */}
      <div className="flex-1 min-w-0">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
          {category}
        </span>
        <h3 className="text-base font-bold text-slate-900 truncate mb-1 group-hover:text-indigo-600 transition-colors">
          🎭 {title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
          <span className="truncate">📍 {location}</span>
          <span className="whitespace-nowrap">🕒 {time}</span>
        </div>
      </div>

      <button className="rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-bold text-xs px-4 py-2.5 transition-all cursor-pointer whitespace-nowrap shadow-xs">
        View Event
      </button>
    </div>
  );
}
