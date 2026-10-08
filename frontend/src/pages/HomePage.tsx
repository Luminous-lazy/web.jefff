import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ImpactMetrics {
  total_beneficiaries: number;
  active_programs: number;
  total_volunteer_hours: number;
  communities_served: number;
  monthly_growth_rate: number;
  donor_retention_rate: number;
}

export default function HomePage() {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then(setMetrics)
      .catch(console.error);
  }, []);

  const beneficiaries = metrics
    ? metrics.total_beneficiaries >= 1000
      ? `${(metrics.total_beneficiaries / 1000).toFixed(1)}k`
      : metrics.total_beneficiaries.toString()
    : "…";

  return (
    <>
      {/* ── Hero Section ── */}
      <section
        className="relative wireframe-border-b"
        style={{ borderColor: "#D1CDC7" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[716px]">
          {/* Left: Content */}
          <div
            className="lg:col-span-5 p-grid-margin flex flex-col justify-center wireframe-border-r"
            style={{ backgroundColor: "#FCFAF7" }}
          >
            <div className="mb-unit-xl">
              {/* HUD tag */}
              <span
                className="inline-block text-label-mono px-2 py-1 mb-unit-md border"
                style={{
                  backgroundColor: "rgba(209,205,199,0.3)",
                  borderColor: "#D1CDC7",
                  color: "#1c1c19",
                }}
              >
                SYS_STAT: OPERATIONAL
              </span>

              <h1
                className="text-headline-xl-mobile lg:text-headline-xl mb-unit-lg uppercase"
                style={{ color: "#5b4138" }}
              >
                Aashraya:<br />Redefining<br />Impact
              </h1>

              <p className="text-body-lg mb-unit-xl max-w-md" style={{ color: "#635d5a" }}>
                Architecting sustainable solutions for resilient communities. We deploy
                targeted interventions across critical infrastructure vectors.
              </p>

              <div className="flex flex-col sm:flex-row gap-gutter">
                <Link
                  to="/volunteer"
                  className="text-label-caps px-unit-lg py-unit-md uppercase tracking-widest transition-colors"
                  style={{ backgroundColor: "#ab3600", color: "#ffffff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff5f1f")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ab3600")}
                >
                  Deploy Resources
                </Link>
                <Link
                  to="/education"
                  className="text-label-mono px-unit-lg py-unit-md border flex items-center justify-center gap-2 transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#D1CDC7",
                    color: "#1c1c19",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ab3600";
                    e.currentTarget.style.color = "#ab3600";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#D1CDC7";
                    e.currentTarget.style.color = "#1c1c19";
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>terminal</span>
                  View Matrix
                </Link>
              </div>
            </div>

            {/* HUD: live stats from /api/impact */}
            <div
              className="mt-auto wireframe-border-t pt-unit-md flex justify-between items-center"
              style={{ borderColor: "#D1CDC7" }}
            >
              <div className="text-label-mono flex items-center gap-2" style={{ color: "#635d5a" }}>
                <span className="w-2 h-2 inline-block" style={{ backgroundColor: "#ab3600" }} />
                LIVE STATS
              </div>
              <div className="text-label-mono font-bold" style={{ color: "#1c1c19" }}>
                {beneficiaries} BENEFICIARIES
              </div>
            </div>
          </div>

          {/* Right: Hero image */}
          <div
            className="lg:col-span-7 relative min-h-[512px] lg:min-h-full"
            style={{ backgroundColor: "#e5e2dd" }}
          >
            <img
              alt="Community Impact"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(1)", mixBlendMode: "multiply", opacity: 0.8 }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfFdwXHkvwW9BY6mSbwsA90jWZo6MGLHMTw83Yi3o4gRDHxF0FDzYnwdq_bXKnekijQQjy2c32X2xhbfICadx1yWZx3IvjvAbiQS2jgzzhfErnlsAx2YTYMdprB_SVFh_HebZ0gD98gpD6yVOoCZyeoxFGn5JcIuvL3Nr_Yu1d3M0q_Y7JGSE0KE0A4KkbTx5icVjByDpp04F8-nK5aOxRkjze8sErBF1aLxl62BoTcfZYvC6QioiMlsCit6oXh_luPsK6EfG9wXu"
            />
            {/* Blueprint grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(209,205,199,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,205,199,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Core Pillars — aligned to backend hubs ── */}
      <section className="wireframe-border-b" style={{ backgroundColor: "#FCFAF7" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderColor: "#D1CDC7" }}
        >
          {[
            {
              idx: "01",
              icon: "home",
              title: "Shelter",
              desc: "Modular, climate-resilient housing units rapidly deployable in crisis zones. Structural integrity prioritized over aesthetic surplus.",
            },
            {
              idx: "02",
              icon: "water_drop",
              title: "Water",
              desc: "Advanced filtration and localized distribution networks. Securing the foundational resource for community viability.",
            },
            {
              idx: "03",
              icon: "menu_book",
              title: "Education",
              desc: "Connectivity hubs and decentralized learning structures. Equipping the next generation with operational knowledge.",
            },
          ].map(({ idx, icon, title, desc }, i) => (
            <div
              key={idx}
              className={`p-grid-margin relative group hover:bg-surface-container transition-colors cursor-pointer${i < 2 ? " md:border-r" : ""}`}
              style={{
                borderColor: "#D1CDC7",
                borderBottom: "1px solid #D1CDC7",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0ede8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div
                className="text-label-mono mb-unit-lg flex justify-between"
                style={{ color: "#635d5a" }}
              >
                <span>{idx}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#635d5a" }}>
                  {icon}
                </span>
              </div>
              <h3 className="text-headline-md mb-unit-md" style={{ color: "#1c1c19" }}>
                {title}
              </h3>
              <p className="text-body-md" style={{ color: "#635d5a" }}>
                {desc}
              </p>
              {/* Hover indicator */}
              <div
                className="mt-unit-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ height: 2, backgroundColor: "#ab3600" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section
        className="py-unit-xl px-grid-margin wireframe-border-b text-center"
        style={{ backgroundColor: "#f6f3ee", borderColor: "#D1CDC7" }}
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="material-symbols-outlined mb-unit-md block"
            style={{ fontSize: 40, color: "#ab3600" }}
          >
            target
          </span>
          <p
            className="text-label-mono leading-relaxed uppercase tracking-wider"
            style={{ color: "#5b4138", fontSize: 16, lineHeight: "1.8" }}
          >
            "We do not build monuments. We architect functional ecosystems.
            Every resource deployed is a calculated variable toward structural
            resilience and human elevation in the most demanding environments."
          </p>
          <div
            className="mt-unit-lg text-label-caps inline-block px-3 py-1 border"
            style={{ borderColor: "#D1CDC7", color: "#635d5a" }}
          >
            PROTOCOL // AASHRAYA_CORE
          </div>
        </div>
      </section>

      {/* ── Stats strip — live from backend ── */}
      {metrics && (
        <section
          className="wireframe-border-b"
          style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ borderColor: "#D1CDC7" }}>
            {[
              { label: "ACTIVE PROGRAMS", value: metrics.active_programs },
              { label: "VOLUNTEER HOURS", value: metrics.total_volunteer_hours.toLocaleString("en-IN") },
              { label: "COMMUNITIES", value: metrics.communities_served },
              { label: "GROWTH RATE", value: `${metrics.monthly_growth_rate}%` },
            ].map(({ label, value }) => (
              <div key={label} className="p-grid-margin" style={{ borderColor: "#D1CDC7" }}>
                <div className="text-label-mono mb-1" style={{ color: "#726D68" }}>{label}</div>
                <div
                  className="text-headline-lg tracking-tighter"
                  style={{ color: "#ab3600", fontFamily: "Geist, sans-serif" }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
