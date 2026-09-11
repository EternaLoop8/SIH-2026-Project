import { useNavigate } from "react-router-dom";
import {
ArrowLeft,
CalendarDays,
IndianRupee,
Users,
Plus,
TrendingUp,
MapPin,
} from "lucide-react";

const BusinessDashboard = () => {
const navigate = useNavigate();

const metrics = [
{
label: "Active Listings",
value: "4",
icon: MapPin,
},
{
label: "Monthly Bookings",
value: "32",
icon: CalendarDays,
},
{
label: "Revenue (INR)",
value: "₹45,200",
icon: IndianRupee,
},
{
label: "Profile Views",
value: "1,248",
icon: Users,
},
];

const listings = [
{
id: 1,
title: "Traditional Malwa Food Experience",
category: "Food & Culture",
location: "Mandu",
bookings: 18,
status: "Active",
price: "₹650",
},
{
id: 2,
title: "Guided Heritage Walk",
category: "Heritage",
location: "Orchha",
bookings: 24,
status: "Active",
price: "₹900",
},
{
id: 3,
title: "Sunrise Boat Ride",
category: "Adventure",
location: "Maheshwar",
bookings: 12,
status: "Active",
price: "₹750",
},
{
id: 4,
title: "Local Folk Dance Evening",
category: "Culture",
location: "Mandu",
bookings: 8,
status: "Draft",
price: "₹400",
},
];

const recentBookings = [
{
id: 1,
customer: "Rahul Sharma",
experience: "Guided Heritage Walk",
date: "Sep 12, 2026",
amount: "₹900",
},
{
id: 2,
customer: "Priya Verma",
experience: "Traditional Malwa Food Experience",
date: "Sep 14, 2026",
amount: "₹650",
},
{
id: 3,
customer: "Arjun Patel",
experience: "Sunrise Boat Ride",
date: "Sep 15, 2026",
amount: "₹750",
},
];

return ( <div className="min-h-screen bg-slate-50"> <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


    {/* Header */}
    <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Business Console
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Track bookings, manage listings and monitor your business
          performance.
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

    {/* Metrics */}
    <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {metric.label}
                </p>

                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </section>

    {/* Revenue Highlight */}
    <section className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-md">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-indigo-100">
            <TrendingUp size={18} />
            <span className="text-sm font-semibold">
              Business Performance
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold">
            Your bookings increased by 18% this month
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Your local experiences are receiving more attention from
            travelers.
          </p>
        </div>

        <button
          onClick={() => navigate("/experience")}
          className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
        >
          View Experiences
        </button>
      </div>
    </section>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* Listings */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Your Experiences
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your active local experiences and listings.
              </p>
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={16} />
              Create Listing
            </button>
          </div>

          <div className="space-y-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-indigo-200 hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {listing.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {listing.category} • {listing.location}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {listing.price}
                    </p>

                    <p className="text-xs text-gray-500">
                      {listing.bookings} bookings
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      listing.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Bookings
          </h2>

          <div className="mt-5 space-y-5">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {booking.customer}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {booking.experience}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-indigo-600">
                    {booking.amount}
                  </p>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  {booking.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6">
          <h3 className="font-bold text-indigo-900">
            Grow Your Reach
          </h3>

          <p className="mt-2 text-sm text-indigo-700">
            Add more local experiences and connect with travelers
            planning trips to your destination.
          </p>

          <button
            onClick={() => navigate("/become-partner")}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Manage Business Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


);
};

export default BusinessDashboard;
