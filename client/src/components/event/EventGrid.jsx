import { useState } from "react";
import EventCard from "./EventCard";
import EventList from "./EventList";

const MOCK_EVENTS = [
  {
    id: 1,
    date: "28",
    month: "AUG",
    title: "Malwa Cultural Evening",
    location: "Mandu",
    time: "6:00 PM",
    type: "Cultural Programs",
  },
  {
    id: 2,
    date: "02",
    month: "SEP",
    title: "Handloom Pottery Workshop",
    location: "Bhopal",
    time: "11:00 AM",
    type: "Workshops",
  },
  {
    id: 3,
    date: "15",
    month: "SEP",
    title: "Indore Food Festival",
    location: "Chappan Dukan",
    time: "5:00 PM",
    type: "Food Events",
  },
];

export default function EventGrid() {
  const [category, setCategory] = useState("All Festivals");

  const filteredEvents =
    category === "All Festivals"
      ? MOCK_EVENTS
      : MOCK_EVENTS.filter((evt) => evt.type === category);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6">
        <span className="text-xs font-black tracking-widest text-indigo-600 uppercase block mb-1">
          📅 7. Upcoming Events
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          What's Happening Nearby?
        </h2>
      </div>

      <EventList activeCategory={category} onCategoryChange={setCategory} />

      {filteredEvents.length === 0 ? (
        <p className="text-center text-xs font-medium text-slate-400 py-10 bg-slate-50 border border-dashed rounded-xl">
          No events scheduled in this track right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
