import { useState } from "react";

export default function TripPlanner({ onGenerate }) {
  const [days, setDays] = useState("1 Day");
  const [budget, setBudget] = useState(3000);
  const [interests, setInterests] = useState([]);

  const INTEREST_OPTIONS = ["Heritage", "Food", "Adventure", "Culture", "Shopping"];

  const toggleInterest = (tag) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onGenerate({ days, budget, interests });
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      className="bg-white border border-slate-200/80 shadow-xl shadow-slate-100 rounded-3xl p-6 space-y-6"
    >
      {/* Duration Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-3">
          How much time do you have?
        </label>
        <div className="flex gap-2">
          {["1 Day", "2 Days", "3 Days"].map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => setDays(d)}
              className={`flex-1 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                days === d
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Numerical Input */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-2">
          What's your total budget?
        </label>
        <div className="relative rounded-xl">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold text-base">
            ₹
          </span>
          <input
            type="number"
            min="500"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-sm font-semibold text-slate-800 focus:border-indigo-600 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Multi-checkbox Interests Layer */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-3">
          What are you interested in?
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {INTEREST_OPTIONS.map((item) => {
            const isChecked = interests.includes(item);
            return (
              <label
                key={item}
                className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer group text-xs font-bold transition-all select-none ${
                  isChecked
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleInterest(item)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 cursor-pointer"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all duration-150 cursor-pointer text-sm shadow-md shadow-indigo-100 tracking-wide active:scale-[0.99]"
      >
        Create My Trip
      </button>
    </form>
  );
}
