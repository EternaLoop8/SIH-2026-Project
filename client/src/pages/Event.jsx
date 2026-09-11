import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  IndianRupee,
  Users,
} from "lucide-react";

import { getEvents } from "../services/eventService.js";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const result = await getEvents();

        const eventData = Array.isArray(result?.data)
          ? result.data
          : [];

        setEvents(eventData);
        setFilteredEvents(eventData);
      } catch (error) {
        console.error("EVENT FETCH ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load events.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredEvents(events);
      return;
    }

    setFilteredEvents(
      events.filter(
        (event) =>
          event.category?.toLowerCase() ===
          filter.toLowerCase(),
      ),
    );
  }, [filter, events]);

  const categories = [
    "all",
    "culture",
    "festival",
    "food",
    "adventure",
    "music",
    "workshop",
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <section className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Local Experiences
          </p>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
            Events & Experiences
          </h1>

          <p className="mt-4 max-w-2xl text-slate-500">
            Discover local festivals, cultural performances,
            food experiences, workshops and adventures.
          </p>
        </section>

        {/* Filters */}

        <section className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
                filter === category
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Loading */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Events */}

        {!loading &&
          !error &&
          filteredEvents.length > 0 && (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => {
                const eventImage =
                  event.image?.url ||
                  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80";

                return (
                  <article
                    key={event._id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}

                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={eventImage}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold capitalize text-indigo-700 backdrop-blur">
                        {event.category}
                      </div>
                    </div>

                    {/* Content */}

                    <div className="p-5">
                      <h2 className="text-xl font-bold text-slate-900">
                        {event.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {event.description}
                      </p>

                      {/* Date */}

                      <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={16}
                          className="text-indigo-600"
                        />

                        {new Date(
                          event.date,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      {/* Location */}

                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <MapPin
                          size={16}
                          className="text-indigo-600"
                        />

                        {event.location}
                      </div>

                      {/* Participants */}

                      {event.maxParticipants && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                          <Users
                            size={16}
                            className="text-indigo-600"
                          />

                          Up to {event.maxParticipants} participants
                        </div>
                      )}

                      {/* Price */}

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm text-slate-500">
                          Starting from
                        </span>

                        <span className="flex items-center text-lg font-bold text-slate-900">
                          {event.price === 0 ? (
                            "Free"
                          ) : (
                            <>
                              <IndianRupee size={16} />
                              {event.price}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

        {/* Empty State */}

        {!loading &&
          !error &&
          filteredEvents.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-slate-700">
                No events found.
              </p>

              <p className="mt-2 text-slate-500">
                Try selecting another category.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}