import { useState } from "react";

const Explore = () => {
  const [filter, setFilter] = useState("all");

  const regionalHubs = [
    {
      id: 1,
      name: "Mandu",
      category: "heritage",
      desc: "A fortress town celebrated for its ancient Afghan architectural gems and romantic folklore.",
      img: "https://unsplash.com",
    },
    {
      id: 2,
      name: "Maheshwar",
      category: "culture",
      desc: "A serene riverside town famous for its magnificent Holkar ghats and delicate handloom weaving.",
      img: "https://unsplash.com",
    },
    {
      id: 3,
      name: "Orchha",
      category: "heritage",
      desc: "The historic bundle kingdom heartland marked by riverside spires, chhatris, and grand places.",
      img: "https://unsplash.com",
    },
    {
      id: 4,
      name: "Pachmarhi",
      category: "nature",
      desc: "A lush hill station sanctuary offering hidden waterfalls, ancient caves, and viewing cliffs.",
      img: "https://unsplash.com",
    },
  ];

  const filteredHubs =
    filter === "all"
      ? regionalHubs
      : regionalHubs.filter((h) => h.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Regional Wonders
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Unpack destinations rich in heritage frameworks, architectural loops,
          and hidden local ecosystems.
        </p>
      </header>

      {/* Segment Filter Selection Switches */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-gray-100 pb-4">
        {[
          { key: "all", label: "Show All Locations" },
          { key: "heritage", label: "Ancient Heritage" },
          { key: "culture", label: "Cultural Hubs" },
          { key: "nature", label: "Nature Escapes" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
              filter === btn.key
                ? "bg-gray-900 border-gray-900 text-white shadow-xs"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Interactive Grid Index */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHubs.map((hub) => (
          <div
            key={hub.id}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="aspect-16/11 bg-gray-50 overflow-hidden relative">
              <img
                src={hub.img}
                alt={hub.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 text-gray-700 rounded-sm">
                {hub.category}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {hub.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
                  {hub.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50">
                <a
                  href={`/explore/${hub.name.toLowerCase()}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Explore Circuit{" "}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
