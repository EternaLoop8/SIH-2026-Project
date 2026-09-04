import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/common/Loading";

// Synchronous Page Views
import Home from "./pages/Home";
import PlanTrip from "./pages/PlanTrip";

// Lazy-loaded Dashboards and Auth Views (Bundle Optimization)
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const BecomePartner = lazy(() => import("./pages/auth/BecomePartner"));
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

const DestinationDetails = lazy(() => import("./pages/DestinationDetail"));

const App = () => {
  return (
    <AuthProvider>
      <Router>
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
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />

            <Route path="/destination/:id" element={<DestinationDetails />} />

            {/* Authentication Access Gateways */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/become-partner" element={<BecomePartner />} />

            {/* Role-Based Panel Ecosystems */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tourist-dashboard" element={<TouristDashboard />} />
              <Route
                path="/business-dashboard"
                element={<BusinessDashboard />}
              />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Strictly Authorized Routing Layers (Admin-Only Restriction) */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin/settings"
                element={<div>Admin Settings Panel</div>}
              />
            </Route>

            {/* Fallback Missing Destination Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
