import { useEffect, useState } from "react";

import DestinationHero from "../components/destination/DestinationHero";
import DestinationCard from "../components/destination/DestinationCard";

import { getDestinations } from "../services/destinationService";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);

        const result = await getDestinations();

        setDestinations(result.data);
        setFilteredDestinations(result.data);

      } catch (error) {
        console.error(error);

        setError(
          "Unable to load destinations. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Search logic
  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredDestinations(destinations);
      return;
    }

    const results = destinations.filter((destination) => {
      const nameMatch = destination.name
        ?.toLowerCase()
        .includes(term);

      const stateMatch = destination.state
        ?.toLowerCase()
        .includes(term);

      const tagMatch = destination.tags?.some((tag) =>
        tag.toLowerCase().includes(term)
      );

      return nameMatch || stateMatch || tagMatch;
    });

    setFilteredDestinations(results);
  };

  return (
    <main className="bg-slate-50">

      {/* Hero */}
      <DestinationHero
        onSearch={handleSearch}
      />

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
              Explore India
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find your next experience
            </h2>

            <p className="mt-3 max-w-2xl text-slate-500">
              Discover destinations, local culture and
              experiences beyond the usual tourist spots.
            </p>
          </div>

          {!loading && (
            <p className="text-sm font-medium text-slate-500">
              {filteredDestinations.length}{" "}
              {filteredDestinations.length === 1
                ? "destination"
                : "destinations"}
            </p>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-107.5 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Results */}
        {!loading &&
          !error &&
          filteredDestinations.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}

            </div>
          )}

        {/* No results */}
        {!loading &&
          !error &&
          filteredDestinations.length === 0 && (
            <div className="py-20 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                🔍
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                No destinations found
              </h3>

              <p className="mt-2 text-slate-500">
                Try searching for another destination,
                state or experience.
              </p>

            </div>
          )}

      </section>

    </main>
  );
}