import { useState } from "react";
import BusinessCard from "./BusinessCard";
import BusinessProfile from "./BusinessProfile";

// Mock Dataset of Local Businesses
const LOCAL_BUSINESSES = [
  {
    id: "b1",
    name: "The Daily Grind Cafe",
    category: "Coffee & Bakery",
    rating: 4.8,
    reviewCount: 245,
    neighborhood: "Downtown",
    image: "https://unsplash.com",
    isOpen: true,
    description:
      "A cozy corner spot serving artisanal, locally-roasted coffee, loose-leaf teas, and fresh house-baked pastries every morning. Perfect for remote work or a casual catch-up.",
    address: "124 Main Street, Downtown, NY 10001",
    phone: "(555) 234-5678",
    website: "thedailygrindcafe.com",
    tags: ["Free WiFi", "Outdoor Seating", "Vegan Options"],
    hours: {
      Monday: "7 AM - 6 PM",
      Tuesday: "7 AM - 6 PM",
      Wednesday: "7 AM - 6 PM",
      Thursday: "7 AM - 8 PM",
      Friday: "7 AM - 9 PM",
      Saturday: "8 AM - 9 PM",
      Sunday: "8 AM - 4 PM",
    },
  },
  {
    id: "b2",
    name: "Apex Fitness Hub",
    category: "Gym & Wellness",
    rating: 4.9,
    reviewCount: 182,
    neighborhood: "West End",
    image: "https://unsplash.com",
    isOpen: true,
    description:
      "State-of-the-art strength training equipment, functional fitness zones, and daily high-intensity group classes led by elite certified personal trainers.",
    address: "580 Parkway Blvd, West End, NY 10003",
    phone: "(555) 876-5432",
    website: "apexfitnesshub.com",
    tags: ["24/7 Access", "Showers", "Personal Training"],
    hours: {
      Monday: "Open 24 Hours",
      Tuesday: "Open 24 Hours",
      Wednesday: "Open 24 Hours",
      Thursday: "Open 24 Hours",
      Friday: "Closes at 10 PM",
      Saturday: "6 AM - 8 PM",
      Sunday: "8 AM - 6 PM",
    },
  },
  {
    id: "b3",
    name: "Bella Italia Ristorante",
    category: "Restaurant",
    rating: 4.7,
    reviewCount: 310,
    neighborhood: "Little Italy",
    image: "https://unsplash.com",
    isOpen: false,
    description:
      "An upscale dining experience bringing old-world Italian tradition right to your neighborhood. Famous for wood-fired pizzas and family-recipe pasta sauces.",
    address: "42 Mulberry St, Little Italy, NY 10013",
    phone: "(555) 345-6789",
    website: "bellaitaliany.com",
    tags: ["Wine Bar", "Takeout Available", "Romantic Vibe"],
    hours: {
      Monday: "Closed",
      Tuesday: "4 PM - 10 PM",
      Wednesday: "4 PM - 10 PM",
      Thursday: "4 PM - 10 PM",
      Friday: "4 PM - 11 PM",
      Saturday: "12 PM - 11 PM",
      Sunday: "12 PM - 9 PM",
    },
  },
];

export default function BusinessGrid() {
  // 🟢 Track which business is selected for profile view. Initialized to null.
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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
        {LOCAL_BUSINESSES.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            // 🟢 Pass click handler to capture business instance details
            onViewProfile={() => setSelectedBusiness(business)}
          />
        ))}
      </div>
    </section>
  );
}
