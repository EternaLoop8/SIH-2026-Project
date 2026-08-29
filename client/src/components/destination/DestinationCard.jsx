import { MapPin, CalendarDays, ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  const {
    _id,
    name,
    state,
    image,
    tags = [],
    estimatedDays,
    bestTimeToVisit,
  } = destination;

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
          }
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Location */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
            <MapPin size={13} />
            {state}
          </span>
        </div>

        {/* Days */}
        {estimatedDays && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <Clock3 size={13} />
              {estimatedDays}{" "}
              {estimatedDays === 1 ? "Day" : "Days"}
            </span>
          </div>
        )}

        {/* Destination name */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-bold text-white">
            {name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium capitalize text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Best time */}
        {bestTimeToVisit && (
          <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} className="text-indigo-600" />

            <span>
              Best time:{" "}
              <span className="font-medium text-slate-700">
                {bestTimeToVisit}
              </span>
            </span>
          </div>
        )}

        {/* Button */}
        <Link
          to={`/destination/${_id}`}
          className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-600"
        >
          Explore Destination

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/button:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}