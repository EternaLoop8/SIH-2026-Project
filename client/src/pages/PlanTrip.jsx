import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  IndianRupee,
  Sparkles,
} from "lucide-react";

import { getDestinations } from "../services/destinationService.js";
import { createTrip } from "../services/tripPlannerService.js";

export default function PlanTrip() {
  const [destinations, setDestinations] = useState([]);

  const [formData, setFormData] = useState({
    destinationId: "",
    startDate: "",
    numberOfDays: 3,
    budget: "moderate",
    interests: [],
  });

  const [trip, setTrip] = useState(null);

  const [loadingDestinations, setLoadingDestinations] =
    useState(true);

  const [loadingTrip, setLoadingTrip] =
    useState(false);

  const [error, setError] = useState("");

  const interestsList = [
    "Culture",
    "Food",
    "Adventure",
    "Nature",
    "History",
    "Music",
  ];

  // Fetch destinations

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const result = await getDestinations();

        const data = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];

        setDestinations(data);
      } catch (error) {
        console.error(
          "DESTINATION FETCH ERROR:",
          error,
        );

        setError(
          "Unable to load destinations.",
        );
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists =
        prev.interests.includes(interest);

      return {
        ...prev,

        interests: exists
          ? prev.interests.filter(
              (item) => item !== interest,
            )
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingTrip(true);
      setError("");

      const result = await createTrip({
        ...formData,
        numberOfDays: Number(
          formData.numberOfDays,
        ),
      });

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create trip.",
        );
      }

      setTrip(result.data);
    } catch (error) {
      console.error(
        "TRIP PLANNER ERROR:",
        error,
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to generate trip.",
      );
    } finally {
      setLoadingTrip(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <section className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            <Sparkles size={16} />
            Smart Trip Planning
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
            Plan Your Perfect Trip
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Select your destination, travel duration
            and interests. We will create a
            personalized itinerary using local
            experiences and events.
          </p>
        </section>

        {/* Planner */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Form */}

          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Trip Preferences
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Destination */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin
                    size={16}
                    className="text-indigo-600"
                  />

                  Destination
                </label>

                <select
                  name="destinationId"
                  value={formData.destinationId}
                  onChange={handleChange}
                  required
                  disabled={
                    loadingDestinations
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select destination
                  </option>

                  {destinations.map(
                    (destination) => (
                      <option
                        key={destination._id}
                        value={destination._id}
                      >
                        {destination.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Start Date */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays
                    size={16}
                    className="text-indigo-600"
                  />

                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Number of Days */}

              <div>
                <label className="mb-2 text-sm font-semibold text-slate-700">
                  Number of Days
                </label>

                <input
                  type="number"
                  name="numberOfDays"
                  min="1"
                  max="30"
                  value={
                    formData.numberOfDays
                  }
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Budget */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <IndianRupee
                    size={16}
                    className="text-indigo-600"
                  />

                  Budget Preference
                </label>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="budget">
                    Budget Friendly
                  </option>

                  <option value="moderate">
                    Moderate
                  </option>

                  <option value="luxury">
                    Luxury
                  </option>
                </select>
              </div>

              {/* Interests */}

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  What interests you?
                </label>

                <div className="flex flex-wrap gap-2">
                  {interestsList.map(
                    (interest) => {
                      const selected =
                        formData.interests.includes(
                          interest,
                        );

                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() =>
                            toggleInterest(
                              interest,
                            )
                          }
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            selected
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingTrip}
                className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingTrip
                  ? "Creating Your Trip..."
                  : "Create My Trip"}
              </button>

            </form>
          </section>

          {/* Trip Result */}

          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            {!trip && !loadingTrip && (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 text-5xl">
                  🗺️
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Your Itinerary Will Appear Here
                </h2>

                <p className="mt-3 max-w-sm text-sm text-slate-500">
                  Choose your preferences and create
                  a personalized trip plan.
                </p>
              </div>
            )}

            {loadingTrip && (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                  <p className="mt-4 text-slate-500">
                    Building your itinerary...
                  </p>
                </div>
              </div>
            )}

            {trip && (
              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {trip.title}
                </h2>

                <p className="mt-2 text-slate-500">
                  {trip.numberOfDays} day trip
                </p>

                <div className="mt-6 space-y-5">
                  {trip.itinerary?.map(
                    (dayPlan) => (
                      <div
                        key={dayPlan.day}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                      >
                        <h3 className="font-bold text-indigo-700">
                          Day {dayPlan.day}
                        </h3>

                        <div className="mt-3 space-y-2">
                          {dayPlan.activities?.map(
                            (
                              activity,
                              index,
                            ) => (
                              <div
                                key={`${activity.id}-${index}`}
                                className="rounded-xl bg-white p-3 text-sm shadow-sm"
                              >
                                <span className="font-semibold text-slate-800">
                                  {activity.title}
                                </span>

                                <span className="ml-2 text-xs capitalize text-indigo-600">
                                  {activity.type}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-6 rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm text-indigo-700">
                    Estimated activity cost
                  </p>

                  <p className="mt-1 text-2xl font-bold text-indigo-900">
                    ₹
                    {trip.estimatedCost?.toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </div>
            )}

          </section>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}