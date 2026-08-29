// src/components/map/MapView.jsx

export default function MapView({ activeSpots = [] }) {
  return (
    <div className="relative w-full h-full bg-slate-100 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-200">
      {/* Decorative Grid Lines to Mimic a Digital Map Canvas */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Visual Compass Anchor */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-3xl animate-bounce mb-2">🗺️</span>
        <h4 className="text-sm font-bold text-slate-800 tracking-tight">
          Interactive Route Map Panel
        </h4>
        <p className="text-[11px] text-slate-400 mt-1 max-w-xs font-medium">
          Leaflet / Google Maps integration space ready.
        </p>
      </div>

      {/* Dynamic Route Waypoints Badge Trace */}
      {activeSpots.length > 0 && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/90 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2 items-center">
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wide shrink-0">
            Waypoints:
          </span>
          {activeSpots.map((spot, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 shrink-0"
            >
              {idx > 0 && <span className="text-slate-300">→</span>}
              📍 {spot}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
