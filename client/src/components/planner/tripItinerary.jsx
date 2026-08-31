export default function TripItinerary({ plannerData }) {
  if (!plannerData) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-200/20 p-12 text-center h-full flex flex-col items-center justify-center min-h-[350px]">
        <div className="mb-4 text-3xl">🧭</div>
        <h3 className="text-base font-bold text-slate-700">No Itinerary Generated</h3>
        <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
          Fill out the trip calculator metrics on the left panel to configure your customized travel framework layout.
        </p>
      </div>
    );
  }

  const { days, budget, interests } = plannerData;
  const daysCount = parseInt(days) || 1;
  const mainInterest = interests.length > 0 ? interests[0] : "Heritage";

  const generateTimelineItems = () => [
    { time: "09:00 AM", task: `Morning ${mainInterest} Exploration & Guided Walk` },
    { time: "01:00 PM", task: `Traditional Lunch (Estimated cost around ₹${Math.round(budget * 0.1)} / person)` },
    { time: "04:30 PM", task: `Afternoon Cultural & Local Market Ecosystems` },
    { time: "08:00 PM", task: `Sunset Point Gathering & Signature Dinner Selection` }
  ];

  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-8 animate-fadeIn">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Your Tailored Itinerary</h3>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Calculated blueprint based on configurations</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Total Budget Cap</span>
          <span className="text-xl font-extrabold text-slate-900">₹{budget}</span>
        </div>
      </div>

      <div className="space-y-8">
        {Array.from({ length: daysCount }).map((_, dIdx) => (
          <div key={dIdx} className="relative">
            <h4 className="mb-4 inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1 text-xs font-extrabold text-white uppercase tracking-wider">
              Day {dIdx + 1}
            </h4>
            
            <div className="relative border-l-2 border-indigo-100 pl-6 ml-3 space-y-5">
              {generateTimelineItems().map((item, iIdx) => (
                <div key={iIdx} className="relative group">
                  <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-indigo-600 bg-white group-hover:bg-indigo-600 transition-colors" />
                  <span className="block text-[11px] font-bold text-indigo-600 tracking-wide">{item.time}</span>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
