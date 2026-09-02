import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading"; // Make sure path matches your file structure

// Synchronous Page Views
import Home from "./pages/Home";
import PlanTrip from "./pages/PlanTrip";

// Lazy-loaded Dashboards and Auth Views (Bundle Optimization)
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const TouristDashboard = lazy(
  () => import("./pages/dashboard/TouristDashboard"),
);
const BusinessDashboard = lazy(
  () => import("./pages/dashboard/BusinessDashboard"),
);
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Explore = lazy(() => import("./pages/Explore"));
const Experience = lazy(() => import("./pages/Experience"));
const Business = lazy(() => import("./pages/Business"));
const Event = lazy(() => import("./pages/Event"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/business" element={<Business />} />
          <Route path="/event" element={<Event />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          {/* Authentication Access Gateways */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Role-Based Panel Ecosystems */}
          <Route path="/tourist-dashboard" element={<TouristDashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Fallback Missing Destination Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
