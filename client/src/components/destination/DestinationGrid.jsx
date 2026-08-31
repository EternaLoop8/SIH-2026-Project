import { useEffect, useState } from "react";
import { getDestinations } from "../../services/destinationService.js";
import DestinationCard from "./DestinationCard";

export default function DestinationGrid() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getDestinations();

        // Safely extract data block if success flag is true
        if (result && result.success) {
          setDestinations(result.data);
        } else {
          setError("Failed to process server properties.");
        }
      } catch (err) {
        console.error("Failed to fetch destinations pipeline:", err);
        setError("Network configuration error. Check your server connection.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-500">
        Loading dynamic destinations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-red-500">
        {error}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-400">
        No destinations found in the database.
      </div>
    );
  }

  // 2. Calculate the slice of destinations for the current page
  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDestinations = destinations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 3. Navigation Handlers
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section>
      <h1 className="font-bold text-4xl pl-8">Trending Places</h1>
      <div className="pl-8">
        <ul className="flex gap-3 justify-left p-1">
          <span className="text-gray-500">Popular:</span>
          <li className="font-light text-gray-400 px-1 border rounded-2xl cursor-pointer hover:text-gray-500">
            Mandu
          </li>
          <li className="font-light text-gray-400 px-1 border rounded-2xl cursor-pointer hover:text-gray-500">
            Orchha
          </li>
          <li className="font-light text-gray-400 px-1 border rounded-2xl cursor-pointer hover:text-gray-500">
            Sanchi
          </li>
          <li className="font-light text-gray-400 px-1 border rounded-2xl cursor-pointer hover:text-gray-500">
            Khajuraho
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {currentDestinations.map((dest) => (
          <DestinationCard key={dest._id} destination={dest} />
        ))}
      </div>
       {/* Arrow Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4 pb-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-100 border rounded-lg text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
          >
            &larr; Previous
          </button>
          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-100 border rounded-lg text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
