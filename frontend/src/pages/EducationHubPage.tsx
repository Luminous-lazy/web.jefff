import { useEffect, useState } from "react";

interface ImpactMetrics {
  total_beneficiaries: number;
  total_funds_raised: number;
  total_volunteer_hours: number;
  total_items_donated: number;
  communities_served: number;
  active_programs: number;
  monthly_growth_rate: number;
  donor_retention_rate: number;
}

interface Donation {
  id: string;
  donor_name: string;
  type: "monetary" | "in_kind";
  amount: number | null;
  currency: string | null;
  hub: string;
  date: string;
  purpose: string;
  status: string;
  receipt_number: string | null;
}

const educationModules = [
  {
    tag: "VIDEO LECTURE // 45 MIN",
    tagIcon: "videocam",
    title: "Community Mapping Strategies",
    desc: "Learn advanced techniques for assessing community needs using open-source GIS tools.",
    footer: "01 // CORE",
    action: "ACCESS //",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjk3FJs5e57isahYA-M9XLUUdXrUPigntx_OGjeD4HzFayoFTiWjyNkLjmH5v9Z198YYONgYrPqkz4LxBejNLvVbr81qRiV7inr4ZVsJ1vRC0LBZSSpeHiVut4mULMGIoid2Ese-0gNPTaeqO2vZpiUQiaSa_gn2XGxKkKK9CY77nXlPT7RoLfxi8E7NIIPiKLCl8lpsxnHe3RpkCYEhZK0ajHM72M0HQUwndOIMcWhWmsUflxG-AjhN0v8Xxkv4D-T99fcDOXLv58",
  },
  {
    tag: "MANUAL // 120 PAGES",
    tagIcon: "description",
    title: "Crisis Intervention Protocol V.3",
    desc: "Standard operating procedures for immediate response in resource-scarce environments.",
    footer: "02 // FIELD",
    action: "DOWNLOAD //",
    image: null,
  },
];

export default function EducationHubPage() {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/impact").then((r) => r.json()),
      fetch("/api/donations").then((r) => r.json()),
    ])
      .then(([m, d]) => {
        setMetrics(m);
        setDonations(d);
      })
      .catch(console.error);
  }, []);

  const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

  // Real donation ledger entries
  const ledgerItems = donations
    .filter((d) => d.type === "monetary" && d.amount !== null)
    .slice(0, 6)
    .map((d) => ({
      id: d.receipt_number ?? d.id.slice(0, 8).toUpperCase(),
      amount: formatINR(Math.abs(d.amount ?? 0)),
      desc: d.purpose,
      hub: d.hub.replace("_", " ").toUpperCase(),
      status: d.status,
    }));

  return (
    <div
      className="flex-grow w-full max-w-[1440px] mx-auto px-grid-margin py-unit-xl grid grid-cols-1 md:grid-cols-12 gap-gutter relative"
      style={{ minHeight: "calc(100vh - 64px - 80px)" }}
    >
      {/* ── Live Tracker Header — real metrics ── */}
      <header className="col-span-1 md:col-span-12 mb-unit-lg">
        <div
          className="wireframe-border p-unit-md flex flex-col md:flex-row justify-between items-start md:items-center gap-unit-md"
          style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
        >
          <div>
            <h1 className="text-headline-xl mb-unit-xs" style={{ color: "#1c1c19" }}>
              GLOBAL METRICS
            </h1>
            <p className="text-label-mono uppercase" style={{ color: "#726D68" }}>
              Real-time systemic output indicators.
            </p>
          </div>
          <div className="flex gap-unit-md w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {metrics ? (
              <>
                <div
                  className="flex-shrink-0 flex flex-col items-end wireframe-border-r pr-unit-md"
                  style={{ borderColor: "#D1CDC7" }}
                >
                  <span className="text-label-mono" style={{ color: "#726D68" }}>TOTAL BENEFICIARIES</span>
                  <span
                    className="text-headline-lg tracking-tighter"
                    style={{ color: "#ab3600", fontFamily: "Geist, sans-serif" }}
                  >
                    {metrics.total_beneficiaries.toLocaleString("en-IN")}
                  </span>
                </div>
                <div
                  className="flex-shrink-0 flex flex-col items-end wireframe-border-r pr-unit-md"
                  style={{ borderColor: "#D1CDC7" }}
                >
                  <span className="text-label-mono" style={{ color: "#726D68" }}>VOLUNTEER HOURS</span>
                  <span
                    className="text-headline-lg tracking-tighter"
                    style={{ color: "#ab3600", fontFamily: "Geist, sans-serif" }}
                  >
                    {metrics.total_volunteer_hours.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end">
                  <span className="text-label-mono" style={{ color: "#726D68" }}>ACTIVE PROGRAMS</span>
                  <span
                    className="text-headline-lg tracking-tighter"
                    style={{ color: "#ab3600", fontFamily: "Geist, sans-serif" }}
                  >
                    {metrics.active_programs}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-label-mono" style={{ color: "#726D68" }}>LOADING TELEMETRY...</span>
            )}
          </div>
        </div>
      </header>

      {/* ── Left: Impact Ledger (real donation data) ── */}
      <aside className="col-span-1 md:col-span-4 flex flex-col gap-unit-md">
        <div
          className="wireframe-border flex flex-col h-full"
          style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
        >
          <div
            className="wireframe-border-b p-unit-md flex justify-between items-center"
            style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
          >
            <h2 className="text-label-mono font-bold uppercase" style={{ color: "#1c1c19" }}>
              Impact Ledger
            </h2>
            <span className="material-symbols-outlined" style={{ color: "#726D68" }}>receipt_long</span>
          </div>

          <div className="p-unit-md flex-grow overflow-y-auto max-h-[600px] flex flex-col gap-unit-sm">
            {ledgerItems.length === 0 ? (
              <div className="text-label-mono" style={{ color: "#726D68" }}>FETCHING DATA...</div>
            ) : (
              ledgerItems.map((item) => (
                <div
                  key={item.id}
                  className="wireframe-border p-unit-sm flex flex-col gap-unit-xs cursor-crosshair transition-colors"
                  style={{ backgroundColor: "#fcf9f4", borderColor: "#D1CDC7" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ab3600")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D1CDC7")}
                >
                  <div className="flex justify-between items-center text-label-mono">
                    <span style={{ color: "#726D68" }}>ID: {item.id}</span>
                    <span className="font-bold" style={{ color: "#1c1c19" }}>{item.amount}</span>
                  </div>
                  <div className="text-body-sm" style={{ color: "#5b4138" }}>
                    {item.desc}
                  </div>
                  <div className="flex items-center gap-unit-xs mt-unit-xs">
                    <div className="w-2 h-2" style={{ backgroundColor: "#ab3600" }} />
                    <span className="text-label-caps" style={{ color: "#ab3600" }}>
                      HUB: {item.hub}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="wireframe-border-t p-unit-sm"
            style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
          >
            <button
              className="w-full py-unit-sm text-label-mono uppercase transition-colors"
              style={{ backgroundColor: "#ab3600", color: "#ffffff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff5f1f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ab3600")}
            >
              View Full Ledger
            </button>
          </div>
        </div>
      </aside>

      {/* ── Right: Education Portal ── */}
      <section className="col-span-1 md:col-span-8 flex flex-col gap-unit-md">
        <div className="flex justify-between items-center mb-unit-sm">
          <h2 className="text-headline-md" style={{ color: "#1c1c19" }}>Education Portal</h2>
          <div className="flex gap-unit-sm">
            <span className="hud-chip">
              MODULES: {metrics?.active_programs ?? "—"}
            </span>
            <span className="hud-chip">WORKSHOPS: 12</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-md">
          {/* Module 1: Video card */}
          <article
            className="wireframe-border flex flex-col group relative overflow-hidden"
            style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
          >
            <div className="h-48 relative" style={{ backgroundColor: "#e5e2dd" }}>
              <img
                alt="Social worker training"
                className="w-full h-full object-cover transition-opacity"
                style={{ opacity: 0.8, mixBlendMode: "luminosity" }}
                src={educationModules[0].image!}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: "#ab3600" }}
                >
                  <span className="material-symbols-outlined" style={{ color: "#ffffff" }}>play_arrow</span>
                </div>
              </div>
            </div>
            <div className="p-unit-md flex-grow flex flex-col gap-unit-xs">
              <div className="flex items-center gap-unit-sm text-label-caps" style={{ color: "#726D68" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>videocam</span>
                <span>VIDEO LECTURE // 45 MIN</span>
              </div>
              <h3 className="text-body-lg font-bold" style={{ color: "#1c1c19" }}>
                Community Mapping Strategies
              </h3>
              <p className="text-body-sm" style={{ color: "#5b4138" }}>
                Learn advanced techniques for assessing community needs using open-source GIS tools.
              </p>
            </div>
            <div
              className="wireframe-border-t p-unit-sm flex justify-between items-center"
              style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
            >
              <span className="text-label-mono" style={{ color: "#726D68" }}>01 // CORE</span>
              <button
                className="text-label-mono transition-colors"
                style={{ color: "#ab3600" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                ACCESS // &gt;
              </button>
            </div>
          </article>

          {/* Module 2: PDF card */}
          <article
            className="wireframe-border flex flex-col group"
            style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
          >
            <div
              className="h-48 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: "#e5e2dd" }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: "radial-gradient(circle at center, #D1CDC7, transparent)" }}
              />
              <span className="material-symbols-outlined relative z-10" style={{ fontSize: 64, color: "#726D68" }}>
                picture_as_pdf
              </span>
            </div>
            <div className="p-unit-md flex-grow flex flex-col gap-unit-xs">
              <div className="flex items-center gap-unit-sm text-label-caps" style={{ color: "#726D68" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>description</span>
                <span>MANUAL // 120 PAGES</span>
              </div>
              <h3 className="text-body-lg font-bold" style={{ color: "#1c1c19" }}>
                Crisis Intervention Protocol V.3
              </h3>
              <p className="text-body-sm" style={{ color: "#5b4138" }}>
                Standard operating procedures for immediate response in resource-scarce environments.
              </p>
            </div>
            <div
              className="wireframe-border-t p-unit-sm flex justify-between items-center"
              style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
            >
              <span className="text-label-mono" style={{ color: "#726D68" }}>02 // FIELD</span>
              <button
                className="text-label-mono transition-colors"
                style={{ color: "#ab3600" }}
              >
                DOWNLOAD // v
              </button>
            </div>
          </article>

          {/* Module 3: Live Workshop (spans 2) */}
          <article
            className="wireframe-border flex flex-col group md:col-span-2 relative overflow-hidden"
            style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
          >
            {/* Skewed accent block */}
            <div
              className="absolute right-0 top-0 h-full w-1/3 hidden md:block"
              style={{
                backgroundColor: "rgba(171,54,0,0.08)",
                transform: "skewX(-12deg)",
                transformOrigin: "top",
              }}
            />
            <div className="p-unit-md flex flex-col md:flex-row gap-unit-md relative z-10">
              <div className="flex-grow flex flex-col gap-unit-xs">
                <div className="flex items-center gap-unit-sm text-label-caps" style={{ color: "#ab3600" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>groups</span>
                  <span>LIVE WORKSHOP // NEXT THURSDAY</span>
                </div>
                <h3 className="text-headline-md" style={{ color: "#1c1c19" }}>
                  Resource Allocation Simulation
                </h3>
                <p className="text-body-md max-w-2xl" style={{ color: "#5b4138" }}>
                  Participate in a real-time, ledger-driven simulation to optimize distribution
                  networks under simulated constraint scenarios. Mandatory for regional coordinators.
                </p>
              </div>
              <div className="flex items-center md:items-end justify-start md:justify-end min-w-[150px]">
                <button
                  className="wireframe-border text-label-mono py-unit-sm px-unit-md uppercase transition-colors w-full md:w-auto text-center"
                  style={{ borderColor: "#D1CDC7", color: "#1c1c19", backgroundColor: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e2dd")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Register Slot
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
