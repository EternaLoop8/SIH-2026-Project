import DestinationCard from './DestinationCard';

// Mock Data
const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: 'The Santorini Caldera',
    location: 'Greece',
    price: 1200,
    rating: 4.9,
    image: 'https://unsplash.com'
  },
  {
    id: 2,
    name: 'Kyoto Bamboo Forest',
    location: 'Japan',
    price: 1450,
    rating: 4.8,
    image: 'https://unsplash.com'
  },
  {
    id: 3,
    name: 'Amalfi Coast Vibe',
    location: 'Italy',
    price: 1600,
    rating: 4.9,
    image: 'https://unsplash.com'
  }
];

export default function DestinationGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trending Destinations
          </h2>
          <p className="mt-2 text-slate-600">
            Handpicked immersive escapes chosen by our global community.
          </p>
        </div>
        <button className="shrink-0 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View All Places
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_DESTINATIONS.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
