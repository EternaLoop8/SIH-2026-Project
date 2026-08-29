import { useState } from "react";
import TripPlanner from "../components/trip/TripPlanner";
import Itinerary from "../components/trip/Itinerary";
import BudgetSummary from "../components/trip/BudgetSummary"; // Adjusted based on your tree or trip folder
import MapView from "../components/map/MapView";

export default function PlanTrip() {
  // State tracking if the itinerary data has been compiled yet
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  // Triggered when TripPlanner form submits successfully
  const handleTripGeneration = (formData) => {
    setLoading(true);

    // Simulating an API call to your tripService backend
    setTimeout(() => {
      setGeneratedTrip({
        info: formData,
        days: [
          {
            dayNum: 1,
            spots: [
              "Historic Gateway Sights",
              "Local Craft Market Bazaar",
              "Traditional Food Street",
            ],
          },
          {
            dayNum: 2,
            spots: ["Nature Wilderness Eco-Trail", "Museum Extravaganza"],
          },
        ],
        budgetTotal: formData.budget || 5000,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            AI Smart Travel Planner
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Customize, manage, and calculate budgets for your upcoming local
            expeditions.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Always visible Form Parameters */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
              ⚙️ Adjust Parameters
            </h2>
            {/* Pass state handler up to the form element */}
            <TripPlanner
              onSubmitSuccess={handleTripGeneration}
              isSubmitting={loading}
            />
          </div>

          {/* Right Column (Spans 2 fields): Displays live updates or static placeholder */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="bg-white rounded-2xl p-16 border text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4" />
                <p className="text-slate-600 font-bold text-sm">
                  Mapping routes and parsing local data tracks...
                </p>
              </div>
            ) : !generatedTrip ? (
              /* Initial State Frame */
              <div className="bg-slate-100/50 rounded-2xl p-16 border-2 border-dashed border-slate-200 text-center">
                <span className="text-3xl block mb-2">🗺️</span>
                <h3 className="text-base font-bold text-slate-700">
                  No Trip Generated Yet
                </h3>
                <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                  Fill out your available time, target budget metrics, and
                  personal interests on the left to review your automated layout
                  timeline.
                </p>
              </div>
            ) : (
              /* Live Data Frame: Mounts Map, Itineraries, and Budget Blocks side-by-side */
              <div className="space-y-6 animate-fadeIn">
                {/* Visual Mapping Interface */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 overflow-hidden h-64">
                  <MapView
                    activeSpots={generatedTrip.days.flatMap((d) => d.spots)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Timeline Cards Lists */}
                  <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <Itinerary scheduleDays={generatedTrip.days} />
                  </div>

                  {/* Pricing and Costs Breakdowns Summary */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <BudgetSummary totalAllocated={generatedTrip.budgetTotal} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
