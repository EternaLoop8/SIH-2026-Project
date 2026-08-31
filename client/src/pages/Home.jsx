import Navbar from "../components/common/Navbar";
import Hero from "../components/common/Hero";
import DestinationGrid from "../components/destination/DestinationGrid";
import ExperienceGrid from "../components/experience/ExperienceGrid";
import BusinessGrid from "../components/business/BusinessGrid";
import Testimonial from "../components/common/Testimonial";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white antialiased">
      {/* Global Navigation Hub */}
      <Navbar />

      {/* Primary Hero Layout & Slider Element */}
      <Hero />

      {/* Destination Showcase Blocks */}
      <DestinationGrid />

      {/* Localized Venture & Event Curations */}
      <ExperienceGrid />
      <BusinessGrid />


      {/* Validation & Footer Foundation */}
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
