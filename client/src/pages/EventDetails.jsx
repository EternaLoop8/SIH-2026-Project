const EventDetails = () => {
  // Sample configuration data for a recurring localized fair or artisan expo
  const evt = {
    title: "Mandu Utsav & Heritage Celebration",
    status: "Upcoming Festival",
    startDate: "December 28, 2026",
    endDate: "January 01, 2027",
    venue: "Main Pavilion Fort Grounds, Mandu, MP",
    ticketing: "Free Access Layer (Activities vary)",
    synopsis:
      "Celebrate the rich cultural essence of ancient Malwa. The festival features traditional hot-air balloon flights over historic palace ruins, morning classical music ragas at Roopmati’s Pavilion, local crafts bazaars, and curated ethnic food pathways.",
    schedule: [
      {
        time: "Day 1 - 06:30 AM",
        eventName: "Sunrise Raga Concert at Eco Park",
      },
      {
        time: "Day 1 - 11:00 AM",
        eventName: "Inauguration of Tribal Crafts Haat",
      },
      {
        time: "Day 2 - 04:00 PM",
        eventName: "Heritage Walk through Royal Enclave Ruins",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border border-yellow-200 bg-yellow-50/50 p-4 rounded-xl mb-8 flex items-center space-x-3 text-yellow-800 text-sm">
        <span className="text-base">📅</span>
        <p className="font-medium">
          Seasonal Event Warning: Program timings are subject to weather
          adjustments. Verify directly before scheduling loops.
        </p>
      </div>

      <header className="mb-8">
        <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
          {evt.status}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight leading-tight">
          {evt.title}
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 flex flex-wrap gap-x-4">
          <span>📍 {evt.venue}</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-blue-600">🎟️ {evt.ticketing}</span>
        </p>
      </header>

      <div className="space-y-8">
        {/* About Block Container */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            About the Celebration
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {evt.synopsis}
          </p>
        </section>

        {/* Schedule Listing Timeline Block */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Highlights Schedule
          </h2>
          <div className="relative border-l-2 border-gray-100 pl-4 space-y-5 ml-2">
            {evt.schedule.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Node Pointer Dot */}
                <div className="absolute -left-5.25 top-1.5 bg-blue-500 h-2 w-2 rounded-full border-2 border-white ring-2 ring-blue-100" />
                <p className="text-xs font-mono font-bold text-blue-600">
                  {item.time}
                </p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {item.eventName}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Dates Control Box */}
        <div className="bg-gray-900 text-white p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
              Timeline Window
            </p>
            <p className="text-sm font-medium mt-0.5 text-gray-200">
              {evt.startDate} — {evt.endDate}
            </p>
          </div>
          <button className="px-5 py-2 bg-white text-gray-900 hover:bg-gray-100 font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs">
            Add to Personal Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
