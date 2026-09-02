import { useNavigate } from "react-router-dom";
import Logo1 from "../../assets/Logo1.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Block */}
        <div>

            <img className="w-24 h-auto mb-3 "
            src={Logo1} alt="Logo" />

          <p className="text-xs font-medium text-slate-500 tracking-wide">
            Discover • Experience • Connect
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            Explore
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button
                onClick={()=> navigate("/experience")}
                className="hover:text-white transition-colors"
              >
                Experiences
              </button>
            </li>
            <li>
              <button
                onClick={()=> navigate("/event")}
                className="hover:text-white transition-colors"
              >
                Events
              </button>
            </li>
            <li>
              <button
                onClick={()=> navigate("/business")}
                className="hover:text-white transition-colors"
              >
                Business
              </button>
            </li>
          </ul>
        </div>

        {/* B2B Partner Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            For Businesses
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button
                onClick={()=> navigate("/resister")}
                className="hover:text-white transition-colors"
              >
                Become a Partner
              </button>
            </li>
            <li>
              <button
                onClick={()=> navigate("/login")}
                className="hover:text-white transition-colors"
              >
                Login
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate Legal Info */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            About Us 
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button  
                onClick={() => navigate("/contact-us")}
                className="hover:text-white transition-colors">
                Contact Us
              </button>
            </li>
            <li>
              <button  
                onClick={() => navigate("/privacy-policy")}
                className="hover:text-white transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button  
                onClick={() => navigate("/terms-and-conditions")}
                className="hover:text-white transition-colors">
                Terms and Conditions
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 border-t border-slate-900/60 text-xs font-medium flex justify-between items-center text-slate-600">
        <p>&copy; {new Date().getFullYear()} YatraSetu</p>
      </div>
    </footer>
  );
}
