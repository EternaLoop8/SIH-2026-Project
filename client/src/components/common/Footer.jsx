export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Block */}
        <div>
          <span className="text-xl font-black tracking-tight text-white block mb-3">
            LOGO
          </span>
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
              <a
                href="#experiences"
                className="hover:text-white transition-colors"
              >
                Experiences
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-white transition-colors">
                Events
              </a>
            </li>
            <li>
              <a
                href="#businesses"
                className="hover:text-white transition-colors"
              >
                Businesses
              </a>
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
              <a href="#partner" className="hover:text-white transition-colors">
                Become a Partner
              </a>
            </li>
            <li>
              <a href="#login" className="hover:text-white transition-colors">
                Partner Login
              </a>
            </li>
          </ul>
        </div>

        {/* Corporate Legal Info */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            About
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 border-t border-slate-900/60 text-xs font-medium flex justify-between items-center text-slate-600">
        <p>&copy; {new Date().getFullYear()} YourProject</p>
      </div>
    </footer>
  );
}
