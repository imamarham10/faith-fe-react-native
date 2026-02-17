import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useAuth } from "~/contexts/AuthContext";

const featureLinks = [
  { label: "Prayer Times", to: "/prayers" },
  { label: "Quran Reader", to: "/quran" },
  { label: "Dhikr Counter", to: "/dhikr" },
  { label: "Islamic Calendar", to: "/calendar" },
  { label: "Qibla Finder", to: "/qibla" },
  { label: "99 Names of Allah", to: "/names" },
  { label: "Spiritual Feelings", to: "/feelings" },
];

const guestAccountLinks = [
  { label: "Sign In", to: "/auth/login" },
  { label: "Create Account", to: "/auth/register" },
];

export default function Footer() {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="border-t border-border-light bg-surface-warm">
      <div className="container-faith py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-hero-gradient flex items-center justify-center">
                <span className="text-white text-lg">&#9789;</span>
              </div>
              <div>
                <span className="text-lg font-bold text-text">Faith</span>
                <span className="text-lg font-light text-primary ml-0.5">App</span>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Your comprehensive spiritual companion. Access prayer times, Quran,
              dhikr tracking, and more — all in one beautiful platform.
            </p>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">
              Features
            </h4>
            <ul className="space-y-2.5">
              {featureLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links - Only show Sign In/Create Account if NOT authenticated */}
          {!isAuthenticated && (
            <div>
              <h4 className="text-sm font-semibold text-text mb-4">
                Account
              </h4>
              <ul className="space-y-2.5">
                {guestAccountLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Unified Faith Service. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            Made with <Heart size={12} className="text-error fill-error" /> for the Ummah
          </p>
        </div>
      </div>
    </footer>
  );
}
