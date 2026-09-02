import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDestinationById } from "../services/destinationDetailService.js";

export default function DestinationDetails() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Destination ID:", id);

        if (!id) {
          throw new Error("Destination ID is missing from the URL.");
        }

        const result = await getDestinationById(id);

        console.log("GET DESTINATION RESPONSE:", result);

        if (!result?.success) {
          throw new Error(
            result?.message || "Failed to fetch destination details."
          );
        }

        if (!result?.data) {
          throw new Error("No destination data received from server.");
        }

        const details = result.data;

        /*
         * Backend GET response structure:
         *
         * {
         *   success: true,
         *   data: {
         *     destinationId: {
         *       _id,
         *       title,
         *       location,
         *       duration,
         *       price,
         *       ...
         *     },
         *     description,
         *     images,
         *     tourGuide,
         *     highlights,
         *     included,
         *     excluded
         *   }
         * }
         */

        const parentDestination = details.destinationId || {};

        /*
         * Combine Destination + DestinationDetail
         * into one object for easy rendering.
         */
        const formattedDestination = {
          ...parentDestination,

          description: details.description || "",
          images: Array.isArray(details.images)
            ? details.images
            : [],

          tourGuide: details.tourGuide || {},

          highlights: Array.isArray(details.highlights)
            ? details.highlights
            : [],

          included: Array.isArray(details.included)
            ? details.included
            : [],

          excluded: Array.isArray(details.excluded)
            ? details.excluded
            : [],

          detailId: details._id,
        };

        console.log(
          "FORMATTED DESTINATION:",
          formattedDestination
        );

        setDestination(formattedDestination);

        if (
          formattedDestination.images.length > 0 &&
          formattedDestination.images[0]?.url
        ) {
          setActiveImage(
            formattedDestination.images[0].url
          );
        }
      } catch (err) {
        console.error("DESTINATION FETCH ERROR:", err);

        console.error(
          "Backend response:",
          err.response?.data
        );

        console.error(
          "HTTP status:",
          err.response?.status
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to fetch destination details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-emerald-600 animate-spin" />

          <p className="text-gray-500">
            Loading destination...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">

          <div className="text-5xl mb-4">
            😕
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Unable to load destination
          </h2>

          <p className="text-gray-600 mb-6">
            {error ||
              "Destination details could not be found."}
          </p>

          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Return to Destinations
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // SAFE DATA
  // =====================================================

  const images = Array.isArray(destination.images)
    ? destination.images
    : [];

  const highlights = Array.isArray(
    destination.highlights
  )
    ? destination.highlights
    : [];

  const included = Array.isArray(destination.included)
    ? destination.included
    : [];

  const excluded = Array.isArray(destination.excluded)
    ? destination.excluded
    : [];

  const languages = Array.isArray(
    destination.tourGuide?.languages
  )
    ? destination.tourGuide.languages
    : [];

  // =====================================================
  // LOCATION
  // =====================================================

  /*
   * Your backend returns location like:
   *
   * location: {
   *   latitude: ...,
   *   longitude: ...,
   *   _id: ...
   * }
   *
   * React cannot render this object directly.
   */

  let displayLocation = "Madhya Pradesh, India";

  if (typeof destination.location === "string") {
    displayLocation = destination.location;
  } else if (
    destination.location &&
    typeof destination.location === "object"
  ) {
    const latitude = destination.location.latitude;
    const longitude = destination.location.longitude;

    if (
      latitude !== undefined &&
      longitude !== undefined
    ) {
      displayLocation = `${latitude}, ${longitude}`;
    }
  }

  // =====================================================
  // OTHER DESTINATION DATA
  // =====================================================

  const displayTitle =
    typeof destination.title === "string"
      ? destination.title
      : "Destination";

  const displayDuration =
    typeof destination.duration === "string"
      ? destination.duration
      : "Flexible Packages";

  let displayPrice = "₹3,499";

  if (
    typeof destination.price === "number"
  ) {
    displayPrice = `₹${destination.price.toLocaleString(
      "en-IN"
    )}`;
  } else if (
    typeof destination.price === "string"
  ) {
    displayPrice = `₹${destination.price}`;
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            BREADCRUMB
        ================================================== */}

        <nav className="mb-6 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-indigo-600 transition"
          >
            Destinations
          </Link>

          <span className="mx-2">
            /
          </span>

          <span className="text-gray-800 font-medium">
            {displayTitle}
          </span>

        </nav>

        {/* =================================================
            HEADER
        ================================================== */}

        <header className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {displayTitle}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">

            <span className="flex items-center gap-1 font-medium text-gray-900">
              📍 {displayLocation}
            </span>

            <span className="hidden sm:inline text-gray-300">
              |
            </span>

            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wider">
              {displayDuration}
            </span>

          </div>

        </header>

        {/* =================================================
            MAIN GRID
        ================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="lg:col-span-2 space-y-8">

            {/* =================================================
                IMAGE GALLERY
            ================================================== */}

            <figure className="space-y-3">

              <div className="aspect-video overflow-hidden rounded-2xl bg-gray-200 shadow-md">

                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={displayTitle}
                    className="w-full h-[400px] object-cover transition-all duration-300"
                    onError={() => {
                      console.error(
                        "Failed to load image:",
                        activeImage
                      );
                    }}
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}

              </div>

              {/* Thumbnails */}

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">

                  {images.map((image, index) => {

                    const imageUrl =
                      typeof image === "string"
                        ? image
                        : image?.url;

                    if (!imageUrl) {
                      return null;
                    }

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
                        className={`
                          relative
                          w-24
                          h-16
                          flex-shrink-0
                          rounded-lg
                          overflow-hidden
                          border-2
                          transition
                          ${
                            activeImage === imageUrl
                              ? "border-indigo-600 scale-95"
                              : "border-transparent opacity-75 hover:opacity-100"
                          }
                        `}
                      >

                        <img
                          src={imageUrl}
                          alt={`${displayTitle} ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />

                      </button>
                    );
                  })}

                </div>
              )}

            </figure>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <article className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Experience
              </h2>

              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {destination.description ||
                  "No description available."}
              </p>

            </article>

            {/* =================================================
                HIGHLIGHTS
            ================================================== */}

            {highlights.length > 0 && (

              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Experience Highlights
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {highlights.map((item, index) => {

                    let itemText = "";

                    if (typeof item === "string") {
                      itemText = item;
                    } else if (
                      item &&
                      typeof item === "object"
                    ) {
                      itemText =
                        item.name ||
                        item.title ||
                        item.description ||
                        JSON.stringify(item);
                    }

                    return (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-gray-600 text-sm"
                      >

                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>

                        <span>
                          {itemText}
                        </span>

                      </li>
                    );
                  })}

                </ul>

              </section>

            )}

            {/* =================================================
                INCLUDED / EXCLUDED
            ================================================== */}

            {(included.length > 0 ||
              excluded.length > 0) && (

              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">

                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Package Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                  {/* INCLUDED */}

                  {included.length > 0 && (

                    <div>

                      <h3 className="font-bold text-emerald-700 mb-3">
                        Included
                      </h3>

                      <ul className="space-y-2">

                        {included.map(
                          (item, index) => {

                            const itemText =
                              typeof item ===
                              "string"
                                ? item
                                : item?.name ||
                                  item?.title ||
                                  JSON.stringify(
                                    item
                                  );

                            return (
                              <li
                                key={index}
                                className="flex gap-2 text-sm text-gray-600"
                              >

                                <span className="text-emerald-500">
                                  ✓
                                </span>

                                <span>
                                  {itemText}
                                </span>

                              </li>
                            );
                          }
                        )}

                      </ul>

                    </div>

                  )}

                  {/* EXCLUDED */}

                  {excluded.length > 0 && (

                    <div>

                      <h3 className="font-bold text-red-600 mb-3">
                        Not Included
                      </h3>

                      <ul className="space-y-2">

                        {excluded.map(
                          (item, index) => {

                            const itemText =
                              typeof item ===
                              "string"
                                ? item
                                : item?.name ||
                                  item?.title ||
                                  JSON.stringify(
                                    item
                                  );

                            return (
                              <li
                                key={index}
                                className="flex gap-2 text-sm text-gray-600"
                              >

                                <span className="text-red-500">
                                  ✕
                                </span>

                                <span>
                                  {itemText}
                                </span>

                              </li>
                            );
                          }
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              </section>

            )}

            {/* =================================================
                TOUR GUIDE
            ================================================== */}

            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">

              <img
                src={
                  destination.tourGuide?.avatar ||
                  "/default-avatar.png"
                }
                alt={
                  destination.tourGuide?.name ||
                  "Tour Guide"
                }
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-100 shadow-inner"
              />

              <div className="flex-1 text-center sm:text-left space-y-1">

                <span className="text-xs uppercase font-bold tracking-wider text-indigo-600">
                  Your Dedicated Local Guide
                </span>

                <h3 className="text-lg font-bold text-gray-900">
                  {destination.tourGuide?.name ||
                    "Assigned Guide Partner"}
                </h3>

                <p className="text-sm text-gray-500 font-medium">
                  {destination.tourGuide?.experience ||
                    "Regional Scholar Expert"}
                </p>

                {languages.length > 0 && (

                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">

                    {languages.map(
                      (language, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded text-xs font-medium"
                        >
                          {typeof language ===
                          "string"
                            ? language
                            : JSON.stringify(
                                language
                              )}
                        </span>
                      )
                    )}

                  </div>

                )}

              </div>

              {/* Rating */}

              <div className="bg-emerald-50 px-4 py-3 rounded-xl text-center self-center">

                <div className="text-xs text-emerald-800 font-bold uppercase">
                  Guide Rating
                </div>

                <div className="text-2xl font-black text-emerald-600">
                  ★{" "}
                  {destination.tourGuide?.rating ??
                    "5.0"}
                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <aside className="lg:col-span-1">

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6 space-y-6">

              {/* PRICE */}

              <div>

                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                  Price Starting From
                </span>

                <div className="flex items-baseline gap-1 mt-1">

                  <span className="text-3xl font-black text-gray-900">
                    {displayPrice}
                  </span>

                  <span className="text-sm text-gray-500 font-medium">
                    / person
                  </span>

                </div>

              </div>

              {/* DETAILS */}

              <div className="border-t border-gray-100 pt-4 space-y-3">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Duration
                  </span>

                  <span className="font-semibold text-gray-900">
                    {displayDuration}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Location
                  </span>

                  <span className="font-semibold text-gray-900 text-right">
                    {displayLocation}
                  </span>

                </div>

              </div>

            </div>

          </aside>

        </section>

      </div>
    </main>
  );
}
