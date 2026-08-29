import { Search, MapPin } from "lucide-react";
import { useState } from "react";

const DestinationHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-slate-950">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="Beautiful travel destination"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[620px] max-w-6xl items-center px-6 py-20 lg:px-8">

        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Discover India differently
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Don't just visit.
            <br />

            <span className="text-indigo-400">
              Experience it.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Discover local people, authentic food, hidden places,
            cultural experiences and the stories behind every destination.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row"
          >

            <div className="flex flex-1 items-center gap-3 px-4">
              <MapPin
                size={21}
                className="shrink-0 text-indigo-600"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Mandu, Maheshwar, Orchha..."
                className="w-full py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Search size={18} />
              Search
            </button>
          </form>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span className="mr-1 text-slate-400">
              Popular:
            </span>

            {["Mandu", "Maheshwar", "Orchha", "Khajuraho"].map(
              (place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => {
                    setSearchTerm(place);
                    onSearch(place);
                  }}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 transition hover:bg-white/15"
                >
                  {place}
                </button>
              )
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DestinationHero;