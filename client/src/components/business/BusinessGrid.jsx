import { useState, useEffect } from "react";
import BusinessCard from "./BusinessCard";
import BusinessProfile from "./BusinessProfile";
import { getBusiness } from "../../services/businessService";

export default function BusinessGrid() {
  // 💡 State variables to manage business collection data pipeline structures
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getBusiness();

        // 💡 Safely extract data block if success flag is true
        if (result && result.success) {
          setBusinesses(result.data);
        } else {
          setError("Failed to process server properties.");
        }
      } catch (err) {
        console.error("Failed to fetch business pipeline:", err);
        setError("Network configuration error. Check your server connection.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Operational State Interceptors
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-500">
        Loading dynamic businesses...
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

  if (businesses.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-400">
        No businesses found in the database.
      </div>
    );
  }

  // 1. CONDITIONAL VIEW: If a business card was clicked, show ONLY its full profile layout
  if (selectedBusiness) {
    return (
      <div className="animate-fadeIn">
        <BusinessProfile
          business={selectedBusiness}
          onBack={() => setSelectedBusiness(null)} // Resets back to list view
        />
      </div>
    );
  }

  // 2. Calculate the slice of destinations for the current page
  const totalPages = Math.ceil(businesses.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBusinesses = businesses.slice(
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

  // 2. LIST VIEW: Default container rendering the full catalog of business items
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Typography Title */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Featured Local Businesses
        </h2>
        <p className="mt-2 text-slate-600">
          Support verified local establishments, shops, and service providers in
          your community.
        </p>
      </div>

      {/* Grid Wrapper rendering individual cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentBusinesses.map((biz) => (
          <BusinessCard
            key={biz._id} // Maps cleanly to MongoDB unique identifier string
            business={biz}
            // 🟢 Triggers conditional logic to open profile detail layout
            onViewProfile={() => setSelectedBusiness(biz)}
          />
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
