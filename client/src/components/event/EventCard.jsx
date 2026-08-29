export default function EventCard({ event }) {
  if (!event) return null;
  const { date, month, title, location, time } = event;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 shadow-xs items-center hover:shadow-md transition-shadow">
      {/* Date Icon Block */}
      <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-black rounded-xl p-3 flex flex-col items-center justify-center shrink-0 w-16 h-16 uppercase tracking-wider">
        <span className="text-[10px] leading-none text-indigo-400 font-bold">
          {month}
        </span>
        <span className="text-xl leading-none mt-1">{date}</span>
      </div>

      {/* Info Cluster */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-slate-800 truncate mb-1">
          🎭 {title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
          <span>📍 {location}</span>
          <span>🕒 {time}</span>
        </div>
      </div>

      <button className="rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-bold text-xs px-3 py-2 transition-all cursor-pointer whitespace-nowrap">
        [View Event]
      </button>
    </div>
  );
}
