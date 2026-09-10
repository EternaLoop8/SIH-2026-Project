import { useNavigate } from "react-router-dom";

export default function ExperienceCard({ experience }) {
if (!experience) return null;

const navigate = useNavigate();

const {
_id,
title,
Categories = [],
duration,
price,
rating = 0,
reviewCount = 0,
image,
isPopular,
} = experience;

const imageUrl =
image?.url ||
"https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80";

const currencySign = "₹";

const displayRating =
typeof rating === "number"
? rating.toFixed(1)
: Number(rating || 0).toFixed(1);

const handleNavigate = () => {
if (!_id) {
console.error("Experience ID is missing:", experience);
return;
}


navigate(`/experience/${_id}`);


};

return ( <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
{/* Image */} <div className="relative h-48 shrink-0 overflow-hidden">
<img
src={imageUrl}
alt={title || "Experience"}
className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
/>


    {/* Popular Badge */}
    {isPopular && (
      <div className="absolute left-4 top-4 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
        Best Seller
      </div>
    )}

    {/* Duration */}
    {duration && (
      <div className="absolute bottom-4 right-4 rounded-xl bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
        ⏱️ {duration} {duration === 1 ? "Hr" : "Hrs"}
      </div>
    )}
  </div>

  {/* Content */}
  <div className="flex flex-1 flex-col justify-between p-5">
    <div>
      {/* Category and Rating */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-bold uppercase tracking-wider text-indigo-600">
          {Array.isArray(Categories) && Categories.length > 0
            ? Categories[0]
            : "Experience"}
        </span>

        <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-700">
          <span className="text-amber-500">★</span>

          {displayRating}

          <span className="text-xs font-normal text-slate-400">
            ({reviewCount})
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-4 min-h-14 line-clamp-2 text-lg font-bold text-slate-800">
        {title || "Untitled Experience"}
      </h3>
    </div>

    {/* Price and Button */}
    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
      <div>
        <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
          From
        </span>

        <span className="text-xl font-extrabold text-slate-900">
          {price !== undefined && price !== null
            ? `${currencySign}${price}`
            : "N/A"}
        </span>

        <span className="text-xs font-medium text-slate-500">
          {" "}
          / person
        </span>
      </div>

      <button
        type="button"
        onClick={handleNavigate}
        className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        View Details
      </button>
    </div>
  </div>
</div>


);
}