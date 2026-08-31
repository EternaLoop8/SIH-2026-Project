import { useEffect, useState } from "react";
import EventCard from "../components/event/EventCard";
import { getEvents } from "../services/eventService";

const Event = () => {
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const result = await getEvents();
        
        let dataArray = [];
        if (result && Array.isArray(result.data)) {
          dataArray = result.data;
        } else if (Array.isArray(result)) {
          dataArray = result;
        } else if (result && typeof result === "object") {
          dataArray = Object.values(result).find(val => Array.isArray(val)) || [];
        }

        setEvents(dataArray);
        setFilteredEvents(dataArray);
      } catch (error) {
        console.error("Events Fetch Error:", error);
        setError("Unable to load regional events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const safeEvents = Array.isArray(events) ? events : [];
    
    if (filter === "all") {
      setFilteredEvents(safeEvents);
    } else {
      setFilteredEvents(
        safeEvents.filter((evt) => evt?.category?.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, events]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Layout */}
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Happening Now
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Festivals & Local Events
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Keep up with live seasonal celebrations, community gatherings, heritage expositions, and pop-up experiences.
          </p>
        </div>

        {!loading && !error && (
          <div className="inline-flex items-center self-start rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 md:self-end">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </div>
        )}
      </header>

      {/* Categories Panel */}
      <nav className="mb-8 flex flex-wrap gap-2.5" aria-label="Event Categories">
        {["all", "culture", "heritage", "food", "music"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 capitalize ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Main Container Layout */}
      <main className="rounded-3xl bg-slate-50 border border-slate-100 p-6 sm:p-10">
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-28 w-full animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <p className="font-semibold text-red-800">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-xs font-bold uppercase tracking-wider text-red-600 hover:underline">
              Reload Page
            </button>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-xl shadow-inner">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No events found</h3>
            <p className="mt-1 text-sm text-slate-500">Try changing your festival categories filter.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Event;
