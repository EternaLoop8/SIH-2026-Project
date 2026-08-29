const Experience = () => {
  // Static configuration representing an immersive community loop mapping
  const exp = {
    title: "Handloom Weaving & Ghat Workshop",
    location: "Maheshwar, MP",
    duration: "4 Hours duration",
    host: "Master Weaver Ramesh & Family",
    price: "₹1,200 per attendee",
    overview:
      "Step directly inside a functional artisan cluster household. Learn how raw silk threads transition into delicate motifs on traditional wooden handlooms, and conclude the day listening to local history tales as the sun sets over the Narmada River Ghats.",
    inclusions: [
      "Guided interaction at a live handloom unit",
      "Handloom operational tutorial session",
      "Traditional Malwa snack plate",
      "Mineral water supplies",
    ],
    bannerImg: "https://unsplash.com",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner Media Block */}
      <div className="w-full aspect-21/9 sm:aspect-16/6 rounded-2xl overflow-hidden relative shadow-xs mb-8 bg-gray-100">
        <img
          src={exp.bannerImg}
          alt={exp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
          <span className="bg-blue-600 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase">
            Community-Led Experience
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
            {exp.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 mt-1">
            {exp.location} • Hosted by {exp.host}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Contents Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Activity Breakdown
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {exp.overview}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              What's Covered in the Package
            </h2>
            <ul className="space-y-2.5">
              {exp.inclusions.map((inc, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <span className="text-blue-500 mr-2.5 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Booking Details Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Price Index
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {exp.price.split(" per")[0]}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {exp.price.split("₹1,200 ")[1]}
            </p>

            <div className="my-4 p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs font-mono text-gray-500">
              ⏱️ {exp.duration}
            </div>

            <button className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs">
              Check Session Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
