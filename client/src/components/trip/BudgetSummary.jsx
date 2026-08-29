// src/components/trip/BudgetSummary.jsx

export default function BudgetSummary({ totalAllocated }) {
  // Mock breakdown metrics based on target allocations
  const stayCost = Math.round(totalAllocated * 0.4);
  const foodCost = Math.round(totalAllocated * 0.3);
  const activitiesCost = Math.round(totalAllocated * 0.2);
  const savingsTrack = totalAllocated - (stayCost + foodCost + activitiesCost);

  return (
    <div>
      <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
        💰 Budget Summary
      </h3>

      <div className="space-y-4">
        {/* Total Header Card */}
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Total Allocated
          </span>
          <span className="text-2xl font-black">₹{totalAllocated}</span>
        </div>

        {/* Cost Breakdowns Rows */}
        <div className="space-y-2 text-xs font-semibold text-slate-600">
          <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
            <span>🏨 Stays & Lodges</span>
            <span className="text-slate-900 font-bold">₹{stayCost}</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
            <span>🍔 Food & Dining</span>
            <span className="text-slate-900 font-bold">₹{foodCost}</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
            <span>🎟️ Activity Entry</span>
            <span className="text-slate-900 font-bold">₹{activitiesCost}</span>
          </div>
          <div className="flex justify-between p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <span>🛡️ Emergency Buffer</span>
            <span className="font-extrabold">₹{savingsTrack}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
