import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceFilter from "./ExperienceFilter";

// Immersive dataset containing categories matching the filter configurations
const MOCK_EXPERIENCES = [
  {
    id: 1,
    title: "Guided Sunrise Hot Air Balloon Expedition",
    category: "Adventure",
    duration: "3 hrs",
    price: 240,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://unsplash.com",
    isPopular: true,
  },
  {
    id: 2,
    title: "Traditional Kyoto Tea Ceremony & Kimono Experience",
    category: "Culture",
    duration: "2 hrs",
    price: 85,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://unsplash.com",
    isPopular: false,
  },
  {
    id: 3,
    title: "Authentic Street Food Tour & Market Walk",
    category: "Food & Drink",
    duration: "4 hrs",
    price: 65,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://unsplash.com",
    isPopular: true,
  },
  {
    id: 4,
    title: "Secret Waterfalls Deep Wilderness Trekking",
    category: "Nature",
    duration: "6 hrs",
    price: 110,
    rating: 4.7,
    reviewsCount: 52,
    image: "https://unsplash.com",
    isPopular: false,
  },
];

export default function ExperienceGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Compute live list values on component evaluation cycles
  const filteredExperiences =
    selectedCategory === "All"
      ? MOCK_EXPERIENCES
      : MOCK_EXPERIENCES.filter((exp) => exp.category === selectedCategory);

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
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </section>
  );
}
