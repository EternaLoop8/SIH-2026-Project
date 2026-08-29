import { useState, useEffect } from "react";

// Mock slider data with real placeholder images
const SLIDES = [
  { image: "https://unsplash.com", alt: "Mandu historic architecture" },
  { image: "https://unsplash.com", alt: "Maheshwar ghats by the river" },
  { image: "https://unsplash.com", alt: "Orchha temples and culture" }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Move navigation functions above useEffect
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  // 2. Setup the automatic timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]); // Re-runs when currentIndex changes to reset the 5s window on manual click

  return (
    <section className="bg-linear-to-b from-blue-50/30 to-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Typography Content Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Don't just visit a place.{" "}
            <span className="block mt-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Experience it.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover local people, food, culture, hidden experiences, and businesses that make every destination unique.
          </p>
        </div>

        {/* Enhanced Rectangular Image Slider */}
        <div className="w-full relative aspect-16/7 rounded-2xl overflow-hidden shadow-xl group mb-12 bg-gray-100">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover transform scale-100 transition-transform duration-5000ms ease-out"
                style={{ transform: index === currentIndex ? 'scale(1.03)' : 'scale(1)' }}
              />
            </div>
          ))}

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-105 duration-200"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-105 duration-200"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Progress Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Discovery & Tags Section */}
        <div className="w-full max-w-4xl border border-gray-100 bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Explore</h2>
              <p className="text-xs text-gray-400">Discover regional wonders</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end w-full sm:w-auto">
            <span className="text-sm font-semibold text-gray-400 mr-1">Popular:</span>
            {["Mandu", "Maheshwar", "Orchha", "Khajuraho"].map((tag) => (
              <button
                key={tag}
                className="text-xs font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
