const BusinessDashboard = () => {
  const metrics = [
    { label: "Active Listings", value: "4" },
    { label: "Monthly Bookings", value: "32" },
    { label: "Revenue (INR)", value: "₹45,200" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Console</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track conversions, update active listings, and coordinate user groups.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500 truncate">
              {m.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Your Shared Experiences
          </h2>
          <button className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Create Listing
          </button>
        </div>
        <p className="text-sm text-gray-400 py-6 text-center border border-dashed border-gray-200 rounded-lg">
          No external actions required. All services operating normally.
        </p>
      </div>
    </div>
  );
};

export default BusinessDashboard;
