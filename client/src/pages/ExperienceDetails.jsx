import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
MapPin,
Star,
Tag,
IndianRupee,
ArrowLeft,
} from "lucide-react";

import { getExperienceDetailById } from "../services/experienceDetailService.js";

export default function ExperienceDetails() {
const { id } = useParams();

const [experience, setExperience] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [activeImage, setActiveImage] = useState("");

useEffect(() => {
const fetchExperienceDetails = async () => {
try {
setLoading(true);
setError("");


    if (!id) {
      throw new Error("Experience ID is missing from the URL.");
    }

    console.log("Experience ID:", id);

    const result = await getExperienceDetailById(id);

    console.log("EXPERIENCE DETAIL RESPONSE:", result);

    if (!result?.success) {
      throw new Error(
        result?.message || "Failed to fetch experience details."
      );
    }

    if (!result?.data) {
      throw new Error("No experience data received from server.");
    }

    const details = result.data;

    setExperience(details);

    if (
      Array.isArray(details.images) &&
      details.images.length > 0
    ) {
      const firstImage = details.images[0];

      setActiveImage(
        typeof firstImage === "string"
          ? firstImage
          : firstImage?.url || ""
      );
    }
  } catch (err) {
    console.error("EXPERIENCE FETCH ERROR:", err);
    console.error("Backend response:", err.response?.data);

    setError(
      err.response?.data?.message ||
        err.message ||
        "Unable to fetch experience details."
    );
  } finally {
    setLoading(false);
  }
};

fetchExperienceDetails();


}, [id]);

// =========================
// LOADING
// =========================

if (loading) {
return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center"> <div className="flex flex-col items-center gap-4"> <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />


      <p className="text-slate-500">
        Loading experience...
      </p>
    </div>
  </div>
);


}

// =========================
// ERROR
// =========================

if (error || !experience) {
return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4"> <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"> <div className="mb-4 text-5xl">
😕 </div>


      <h2 className="mb-3 text-2xl font-bold text-slate-900">
        Unable to load experience
      </h2>

      <p className="mb-6 text-slate-600">
        {error || "Experience details could not be found."}
      </p>

      <Link
        to="/experience"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
      >
        <ArrowLeft size={16} />
        Back to Experiences
      </Link>
    </div>
  </div>
);


}

// =========================
// SAFE DATA
// =========================

const images = Array.isArray(experience.images)
? experience.images
: [];

const tags = Array.isArray(experience.tags)
? experience.tags
: [];

const displayTitle =
typeof experience.title === "string"
? experience.title
: "Experience";

const displayDescription =
typeof experience.description === "string"
? experience.description
: "No description available.";

const displayRating =
typeof experience.rating === "number"
? experience.rating
: null;

const displayPrice =
typeof experience.price === "number"
? experience.price.toLocaleString("en-IN")
: experience.price || null;

return ( <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8"> <div className="mx-auto max-w-7xl">


    {/* BACK BUTTON */}

    <Link
      to="/experience"
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
    >
      <ArrowLeft size={17} />
      Back to Experiences
    </Link>

    {/* HEADER */}

    <header className="mb-8">
      <div className="mb-3 flex flex-wrap items-center gap-3">

        {displayRating !== null && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-700">
            <Star size={15} fill="currentColor" />
            {displayRating}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        {displayTitle}
      </h1>
    </header>

    {/* MAIN CONTENT */}

    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* LEFT CONTENT */}

      <div className="space-y-8 lg:col-span-2">

        {/* IMAGE GALLERY */}

        <section>
          <div className="aspect-video overflow-hidden rounded-3xl bg-slate-200 shadow-md">

            {activeImage ? (
              <img
                src={activeImage}
                alt={displayTitle}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                No image available
              </div>
            )}

          </div>

          {/* IMAGE THUMBNAILS */}

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

              {images.map((image, index) => {
                const imageUrl =
                  typeof image === "string"
                    ? image
                    : image?.url;

                if (!imageUrl) return null;

                return (
                  <button
                    key={
                      image?.public_id ||
                      image?._id ||
                      index
                    }
                    type="button"
                    onClick={() =>
                      setActiveImage(imageUrl)
                    }
                    className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImage === imageUrl
                        ? "border-indigo-600"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${displayTitle} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}

            </div>
          )}
        </section>

        {/* DESCRIPTION */}

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="mb-4 text-xl font-bold text-slate-900">
            About This Experience
          </h2>

          <p className="whitespace-pre-line leading-relaxed text-slate-600">
            {displayDescription}
          </p>

        </section>

        {/* TAGS */}

        {tags.length > 0 && (
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-4 flex items-center gap-2">
              <Tag size={20} className="text-indigo-600" />

              <h2 className="text-xl font-bold text-slate-900">
                Experience Categories
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">

              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                >
                  {tag}
                </span>
              ))}

            </div>

          </section>
        )}

      </div>

      {/* RIGHT SIDEBAR */}

      <aside className="lg:col-span-1">

        <div className="sticky top-6 space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-md">

          {/* PRICE */}

          <div>

            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Price
            </span>

            <div className="mt-2 flex items-center gap-1">

              <IndianRupee
                size={28}
                className="text-indigo-600"
              />

              <span className="text-3xl font-black text-slate-900">

                {displayPrice || "Contact for price"}

              </span>

            </div>

            {displayPrice && (
              <p className="mt-1 text-sm text-slate-500">
                Per person
              </p>
            )}

          </div>

          {/* RATING */}

          {displayRating !== null && (
            <div className="border-t border-slate-100 pt-5">

              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Rating
              </span>

              <div className="mt-2 flex items-center gap-2">

                <Star
                  size={22}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-xl font-bold text-slate-900">
                  {displayRating} / 5
                </span>

              </div>

            </div>
          )}

          {/* ACTION */}

          <button
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Book This Experience
          </button>

        </div>

      </aside>

    </section>
  </div>
</main>


);
}
