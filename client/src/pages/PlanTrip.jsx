import { useState } from "react";
import TripPlanner from "../components/planner/TripPlanner";
import TripItinerary from "../components/planner/tripItinerary";

const PlanTrip = () => {
  const [activePlan, setActivePlan] = useState(null);

  const handlePlanGeneration = (data) => {
    setActivePlan(data);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner Branding Section */}
      <header className="mb-12 text-center max-w-xl mx-auto">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
          Smart AI Planner
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Plan Your Next Adventure
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Input your travel length constraints, prioritize budget allocation boundaries, and auto-build itineraries.
        </p>
      </header>

      {/* Synchronized Columns Dashboard Split Layout */}
      <div className="grid gap-10 lg:grid-cols-12 items-start max-w-6xl mx-auto">
        {/* Left Interactive Controller */}
        <div className="lg:col-span-5">
          <TripPlanner onGenerate={handlePlanGeneration} />
        </div>

        {/* Right Adaptive Display Board */}
        <main className="lg:col-span-7">
          <TripItinerary plannerData={activePlan} />
        </main>
      </div>
    </div>
  );
};

export default PlanTrip;
