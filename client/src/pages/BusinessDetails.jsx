import { useState } from "react";

const BusinessDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample static data representing a heritage property storefront
  const business = {
    name: "The Orchha Heritage Homestay",
    category: "Boutique Stay & Dining",
    rating: 4.9,
    reviewsCount: 142,
    location: "Near Laxmi Narayan Temple, Orchha, Madhya Pradesh",
    priceRange: "₹3,500 - ₹7,000 per night",
    phone: "+91 98765 43210",
    email: "contact@orchhaheritage.com",
    about:
      "Experience true Bundelkhandi hospitality in a restored 150-year-old ancestral villa. Our family-run homestay blends historic architecture with modern sustainable amenities, offering authentic homemade regional meals cooked with locally grown organic ingredients.",
    amenities: [
      "Free Wi-Fi",
      "Traditional Organic Meals",
      "Guided Heritage Walks",
      "Air Conditioning",
      "Bicycle Rentals",
      "Rooftop Terrace View",
    ],
    gallery: [
      "https://unsplash.com",
      "https://unsplash.com",
      "https://unsplash.com",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50/50">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-medium text-gray-400 mb-4 flex items-center space-x-2">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
        <span>/</span>
        <a href="/explore" className="hover:text-blue-600">
          Businesses
        </a>
        <span>/</span>
        <span className="text-gray-600 truncate">{business.name}</span>
      </nav>

      {/* Main Container Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Visual Layout and Detailed Tabbed Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider">
              {business.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
              {business.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-gray-800">{business.rating}</span>
              <span className="mx-1 text-gray-300">•</span>
              <span>({business.reviewsCount} verified reviews)</span>
            </p>
          </div>

          {/* Business Image Row Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl overflow-hidden shadow-xs">
            <div className="sm:col-span-2 aspect-16/10 bg-gray-100">
              <img
                src={business.gallery[0]}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col gap-3">
              <div className="flex-1 bg-gray-100 aspect-16/10">
                <img
                  src={business.gallery[1]}
                  alt="Interior view"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-gray-100 aspect-16/10">
                <img
                  src={business.gallery[2]}
                  alt="Dining space"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Navigation Control Tabs */}
          <div className="border-b border-gray-200 flex space-x-6 text-sm font-medium">
            {["overview", "amenities", "location"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-all border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Workspace Renders */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">
                  About the Venue
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {business.about}
                </p>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Features & Services
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {business.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <span className="text-green-500 text-xs">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {business.location}
                </p>
                <div className="w-full aspect-16/6 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                  🗺️ Map visualization container placeholder
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column Sidebar: Contact & Conversion Action Deck */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-xs sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Inquire & Contact
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Handled directly with host vendor without platform premiums.
            </p>

            <div className="space-y-3 border-t border-b border-gray-100 py-4 mb-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400">Rate Index:</span>
                <span className="font-semibold text-gray-900">
                  {business.priceRange.split(" per")[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hotline:</span>
                <span className="font-mono text-gray-900">
                  {business.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-blue-600 break-all">
                  {business.email}
                </span>
              </div>
            </div>

            <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer">
              Connect to Host Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
