import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceFilter from "./ExperienceFilter";
import { getExperience } from "../../services/experienceService.js"; // 💡 Import your active service file

export default function ExperienceGrid() {
  const [experiences, setExperiences] = useState([]); // 💡 FIXED: Active database storage replacing MOCK array data
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // 1. Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchPipelineData = async () => {
      try {
        const result = await getExperience();
        
        // Unpack nested payload matching your standard { success: true, data: [...] } structure
        if (result && result.success) {
          setExperiences(result.data);
        } else {
          setError("Could not parse matching experiences list from server.");
        }
      } catch (err) {
        console.error("API Error fetching experience profiles:", err);
        setError("Network error connecting to experiences repository data system.");
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineData();
  }, []);

  // Compute live list values based on whether the 'Categories' schema array contains the selected value
  const filteredExperiences =
    selectedCategory === "All"
      ? experiences
      : experiences.filter((exp) => 
          exp.Categories && exp.Categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
        );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-500">
        Loading local experiences portfolio...
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

  // 2. Calculate the slice of destinations for the current page
  const totalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentExperiences = experiences.slice(
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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Unforgettable Local Experiences
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Bespoke tours and curated adventures hosted by verified local guides.
        </p>
      </div>

      {/* Mounting Filter Context Bar */}
      <ExperienceFilter
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Visual Render Window Fallback Layout */}
      {filteredExperiences.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">
            No experiences found for this filter.
          </p>
        </div>
      ) : (
        /* Structural CSS Grid Display Wrapper */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentExperiences.map((exp) => (
            <ExperienceCard key={exp._id} experience={exp} /> // 💡 FIXED: Uses unique MongoDB '_id' parameter 
          ))}
        </div>
      )}

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
