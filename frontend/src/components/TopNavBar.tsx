import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/volunteer", label: "Volunteer", end: false },
  { to: "/education", label: "Education", end: false },
  { to: "/donate", label: "Donate", end: false },
];

export default function TopNavBar() {
  const { user, login, logout } = useAuth();
  const [impact, setImpact] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then((d) => setImpact(d.total_beneficiaries ?? null))
      .catch(() => null);
  }, []);

  const impactLabel = impact
    ? impact >= 1000
      ? `${(impact / 1000).toFixed(1)}k`
      : impact.toString()
    : "24.8k";

  return (
    <nav
      className="wireframe-border-b sticky top-0 z-50"
      style={{ backgroundColor: "#FCFAF7" }}
    >
      <div className="flex justify-between items-center px-grid-margin w-full h-16 max-w-[1440px] mx-auto">
        {/* Brand */}
        <NavLink
          to="/"
          className="text-headline-md font-bold tracking-tighter transition-colors"
          style={{ color: "#ab3600", fontFamily: "Geist, sans-serif" }}
        >
          AASHRAYA
        </NavLink>

        {/* Desktop nav — JetBrains Mono labels */}
        <div className="hidden md:flex gap-unit-md items-center h-full">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="h-full flex items-center px-2 text-label-mono transition-colors"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#ab3600",
                      borderBottom: "2px solid #ab3600",
                    }
                  : { color: "#635d5a" }
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* HUD badge — live impact */}
        <div className="hidden md:flex items-center gap-4">
          <div
            className="text-label-mono border px-unit-sm py-unit-xs"
            style={{ borderColor: "#D1CDC7", color: "#ab3600", fontFamily: "JetBrains Mono, monospace" }}
          >
            IMPACT: {impactLabel}
          </div>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={logout}
              className="text-label-mono px-3 py-1 border hover:bg-[#eae6e1] transition-colors"
              style={{ borderColor: "#D1CDC7", color: "#635d5a", fontFamily: "JetBrains Mono, monospace" }}
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={login}
              className="text-label-mono px-3 py-1 border hover:bg-[#eae6e1] transition-colors"
              style={{ borderColor: "#D1CDC7", color: "#ab3600", fontFamily: "JetBrains Mono, monospace" }}
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-label-mono"
          style={{ color: "#ab3600" }}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
