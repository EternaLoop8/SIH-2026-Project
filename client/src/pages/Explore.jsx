import { useEffect, useState } from "react";
import DestinationCard from "../components/destination/DestinationCard";
import { getDestinations } from "../services/destinationService";

const Explore = () => {
  const [filter, setFilter] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const result = await getDestinations();
        
        // Strict normalization: extract array regardless of backend format wrapper
        let dataArray = [];
        if (result && Array.isArray(result.data)) {
          dataArray = result.data;
        } else if (Array.isArray(result)) {
          dataArray = result;
        } else if (result && typeof result === "object") {
          // If response wraps the array in another key like 'destinations'
          dataArray = Object.values(result).find(val => Array.isArray(val)) || [];
        }

        setDestinations(dataArray);
        setFilteredDestinations(dataArray);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setError("Unable to load destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Safely sync filters without crashing if destinations isn't an array
  useEffect(() => {
    const safeDestinations = Array.isArray(destinations) ? destinations : [];
    
    if (filter === "all") {
      setFilteredDestinations(safeDestinations);
    } else {
      setFilteredDestinations(
        safeDestinations.filter((dest) => dest?.category?.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, destinations]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Dynamic Header Section */}
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Explore India
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Regional Wonders
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Discover frameworks, historical structures, local culture, and experiences beyond the usual tourist spots.
          </p>
        </div>

        {/* Counter Pill */}
        {!loading && !error && (
          <div className="inline-flex items-center self-start rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 md:self-end">
            {filteredDestinations.length}{" "}
            {filteredDestinations.length === 1 ? "destination" : "destinations"}
          </div>
        )}
      </header>

      {/* Styled Filter Controls */}
      <nav className="mb-8 flex flex-wrap gap-2.5" aria-label="Destination Categories">
        {["all", "heritage", "nature", "culture"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 capitalize ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Core Display Area */}
      <main className="rounded-3xl bg-slate-50 border border-slate-100 p-6 sm:p-10">
        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 w-full animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {/* Error Notification */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <p className="font-semibold text-red-800">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-xs font-bold uppercase tracking-wider text-red-600 hover:underline"
            >
              Reload Page
            </button>
          </div>
        )}

        {/* Successful Grid Results */}
        {!loading && !error && filteredDestinations.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination._id || destination.id} destination={destination} />
            ))}
          </div>
        )}

        {/* Empty Search State */}
        {!loading && !error && filteredDestinations.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-xl shadow-inner">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No destinations found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try choosing another regional filter or checking back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
