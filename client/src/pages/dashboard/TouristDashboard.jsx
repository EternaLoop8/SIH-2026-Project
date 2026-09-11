import { useNavigate } from "react-router-dom";
import {
ArrowLeft,
CalendarDays,
MapPin,
Compass,
Ticket,
} from "lucide-react";

const TouristDashboard = () => {
const navigate = useNavigate();

const bookings = [
{
id: 1,
destination: "Orchha Temples Heritage Tour",
location: "Orchha, Madhya Pradesh",
date: "2026-09-12",
status: "Confirmed",
price: "₹1,200",
},
{
id: 2,
destination: "Maheshwar Ghats Boat Ride",
location: "Maheshwar, Madhya Pradesh",
date: "2026-09-15",
status: "Pending",
price: "₹750",
},
{
id: 3,
destination: "Mandu Cultural Evening",
location: "Mandu, Madhya Pradesh",
date: "2026-09-22",
status: "Confirmed",
price: "₹500",
},
{
id: 4,
destination: "Local Malwa Food Experience",
location: "Indore, Madhya Pradesh",
date: "2026-10-02",
status: "Completed",
price: "₹900",
},
];

const stats = [
{
label: "Upcoming Trips",
value: "3",
icon: CalendarDays,
},
{
label: "Total Bookings",
value: "12",
icon: Ticket,
},
{
label: "Places Explored",
value: "7",
icon: MapPin,
},
];

return ( <div className="min-h-screen bg-slate-50"> <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
{/* Header */} <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start"> <div> <h1 className="text-3xl font-bold text-gray-900">
Welcome back, Traveler! </h1>


        <p className="mt-1 text-sm text-gray-500">
          Manage your active itineraries, bookings, and travel experiences.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
      >
        <ArrowLeft size={17} />
        Go Back to Home
      </button>
    </header>

    {/* Statistics */}
    <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </section>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Bookings */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Your Bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep track of your upcoming travel experiences.
              </p>
            </div>

            <button
              onClick={() => navigate("/experience")}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Explore more
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Experience
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.destination}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} />
                          {booking.location}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {booking.date}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-700">
                        {booking.price}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-md">
          <Compass size={28} className="mb-4" />

          <h3 className="text-lg font-bold">
            Need Inspiration?
          </h3>

          <p className="mb-5 mt-2 text-sm text-blue-100">
            Discover local experiences, cultural activities and hidden
            destinations curated for your next trip.
          </p>

          <button
            onClick={() => navigate("/experience")}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Explore Experiences
          </button>
        </div>

        {/* Upcoming Trip */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Next Trip
          </p>

          <h3 className="mt-2 text-lg font-bold text-gray-900">
            Orchha Heritage Weekend
          </h3>

          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <p>📅 September 12, 2026</p>
            <p>📍 Orchha, Madhya Pradesh</p>
            <p>🕒 3 Days</p>
          </div>

          <button
            onClick={() => navigate("/plan")}
            className="mt-5 w-full rounded-lg border border-indigo-200 bg-indigo-50 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            View Trip Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

);
};

export default TouristDashboard;
