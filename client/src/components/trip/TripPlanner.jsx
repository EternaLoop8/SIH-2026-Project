import { useState } from "react";

export default function TripPlanner() {
  const [days, setDays] = useState("1 Day");
  const [budget, setBudget] = useState(3000);
  const [interests, setInterests] = useState([]);

  const INTEREST_OPTIONS = [
    "Heritage",
    "Food",
    "Adventure",
    "Culture",
    "Shopping",
  ];

  const toggleInterest = (tag) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log({ days, budget, interests });
    alert(`Generating your personalized ${days} itinerary under ₹${budget}!`);
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          Trip Planner CTA
        </h2>
        <p className="text-sm text-slate-500 mt-1">Plan a Trip Around You</p>
      </div>

      <form
        onSubmit={handleFormSubmission}
        className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 space-y-6"
      >
        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            How much time do you have?
          </label>
          <div className="flex gap-2">
            {["1 Day", "2 Days", "3 Days"].map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDays(d)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  days === d
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                [ {d} ]
              </button>
            ))}
          </div>
        </div>

        {/* Budget Numerical Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            What's your budget?
          </label>
          <div className="relative rounded-xl shadow-xs">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold text-sm">
              ₹
            </span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-sm font-semibold text-slate-800 focus:outline-indigo-600"
            />
          </div>
        </div>

        {/* Multi-checkbox Interests Layer */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            What are you interested in?
          </label>
          <div className="space-y-2.5">
            {INTEREST_OPTIONS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group text-sm font-medium text-slate-600"
              >
                <input
                  type="checkbox"
                  checked={interests.includes(item)}
                  onChange={() => toggleInterest(item)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="group-hover:text-slate-900 transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submission Execution Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer text-sm shadow-sm tracking-wide"
        >
          [ Create My Trip ]
        </button>
      </form>
    </section>
  );
}
