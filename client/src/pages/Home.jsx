import Navbar from "../components/common/Navbar";
import Hero from "../components/common/Hero";
import DestinationHero from "../components/destination/DestinationHero";
import DestinationGrid from "../components/destination/DestinationGrid";
import ExperienceGrid from "../components/experience/ExperienceGrid";
import BusinessGrid from "../components/business/BusinessGrid";
import Testimonial from "../components/common/Testimonial";
import Footer from "../components/common/Footer";
import EventGrid from "../components/event/EventGrid";
import TripPlanner from "../components/trip/TripPlanner";

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white antialiased">
      {/* Global Navigation Hub */}
      <Navbar />

      {/* Primary Hero Layout & Slider Element */}
      <Hero />

      {/* Destination Showcase Blocks */}
      <DestinationGrid />
      <DestinationHero />

      {/* Localized Venture & Event Curations */}
      <ExperienceGrid />
      <BusinessGrid />
      <EventGrid />

      {/* Interactive Exploration Toolsets */}
      <TripPlanner />

      {/* Validation & Footer Foundation */}
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
