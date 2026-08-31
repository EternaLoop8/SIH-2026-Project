export default function Testimonial() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        
        {/* Header Block */}
        <div className="md:col-span-1 flex flex-col justify-center">
          <h2 className="text-sm font-semibold tracking-wider text-amber-600 uppercase mb-2">
            The Soul of Travel
          </h2>
          <h3 className="text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Why we do what we do.
          </h3>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            We believe India’s truest stories aren’t found in crowded tourist hubs, but in the quiet heritage of its smaller towns.
          </p>
        </div>

        {/* Pillars / Testimonial Values */}
        <div className="md:col-span-2 grid gap-8 sm:grid-cols-2">
          
          {/* Card 1: Roots & Heritage */}
          <div className="flex flex-col justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Reconnect with your roots</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Uncover hidden histories. We take you past the major landmarks straight into the small towns guarding centuries of forgotten Indian heritage.
              </p>
            </div>
          </div>

          {/* Card 2: Community Connection */}
          <div className="flex flex-col justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Belong, don't just visit</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Sit down with local artisans, share meals with community elders, and experience the warmth of true Indian hospitality firsthand.
              </p>
            </div>
          </div>

          {/* Card 3: Authentic Experiences */}
          <div className="flex flex-col justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Purely local flavors</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                No curated tourist traps. Discover authentic local traditions, regional culinary secrets, and crafts passed down through generations.
              </p>
            </div>
          </div>

          {/* Card 4: Supporting Make in India */}
          <div className="flex flex-col justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Travel with purpose</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Every journey directly empowers rural entrepreneurs and tourism businesses, proudly keeping our rich culture and heritage thriving.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
