const TouristDashboard = () => {
  const bookings = [
    {
      id: 1,
      destination: "Orchha Temples Tour",
      date: "2026-09-12",
      status: "Confirmed",
    },
    {
      id: 2,
      destination: "Maheshwar Ghats Boat Ride",
      date: "2026-09-15",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Traveler!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your active itineraries and local bookings.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Upcoming Bookings
            </h2>
            <div className="overflow-hidden border border-gray-100 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {b.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {b.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            b.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-2">Need Inspiration?</h3>
            <p className="text-sm text-blue-100 mb-4">
              Explore custom heritage loops curated by local experts.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
              Explore Experiences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
