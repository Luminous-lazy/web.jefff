import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Donation {
  id: string;
  type: "monetary" | "in_kind";
  amount: number | null;
  currency: string | null;
  hub: string;
  status: string;
  purpose: string;
}

const ALLOCATION_VECTORS: {
  value: string;
  icon: string;
  title: string;
  desc: string;
  hubId: string;
}[] = [
  {
    value: "education",
    icon: "school",
    title: "Education Hub",
    desc: "Deploying digital curriculum nodes and scholarship support to remote learning outposts.",
    hubId: "education",
  },
  {
    value: "clothing",
    icon: "checkroom",
    title: "Clothing Drive",
    desc: "Seasonal clothing distribution across 47 communities. Winter provisions and school uniforms.",
    hubId: "clothing_drive",
  },
  {
    value: "volunteer",
    icon: "volunteer_activism",
    title: "Volunteer Drive",
    desc: "Training, outreach expansion and rapid-deployment reserve for volunteer operations.",
    hubId: "volunteer_drive",
  },
  {
    value: "general",
    icon: "account_balance",
    title: "General Fund",
    desc: "Algorithmically distributed based on immediate system needs and urgency indicators.",
    hubId: "general",
  },
];

// Impact calculation per hub
function calcImpact(amount: number, vec: string): string {
  if (vec === "education") return `> ${Math.floor(amount * 0.5)} Hours Digital Instruction`;
  if (vec === "clothing") return `> ${Math.floor(amount / 200)} Winter Kits Supplied`;
  if (vec === "volunteer") return `> ${Math.floor(amount * 1.2)} Volunteer Hours Enabled`;
  return `> Yield Optimized by Algorithm`;
}

export default function DonationHubPage() {
  const { user, login } = useAuth();
  const [selected, setSelected] = useState("education");
  const [amount, setAmount] = useState(50);
  const [recurring, setRecurring] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetch("/api/donations")
      .then((r) => r.json())
      .then(setDonations)
      .catch(console.error);
  }, []);

  // Total funds raised from real data
  const totalRaised = donations
    .filter((d) => d.type === "monetary" && d.amount !== null)
    .reduce((s, d) => s + (d.amount ?? 0), 0);

  const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div
      className="flex-grow max-w-[1440px] mx-auto w-full px-grid-margin py-unit-xl grid grid-cols-1 md:grid-cols-12 gap-0 border-x wireframe-border"
      style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
    >
      {/* ── Header ── */}
      <div
        className="col-span-1 md:col-span-12 pb-unit-lg wireframe-border-b mb-unit-lg"
        style={{ borderColor: "#D1CDC7" }}
      >
        <h1 className="text-headline-xl mb-2" style={{ color: "#1c1c19" }}>
          Deploy Capital.
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-body-lg max-w-2xl" style={{ color: "#635d5a" }}>
            Direct your funds to high-impact sectors. Every transaction is logged and
            auditable via our public ledger.
          </p>
          {totalRaised > 0 && (
            <div className="wireframe-border px-unit-md py-unit-sm" style={{ borderColor: "#D1CDC7", backgroundColor: "#f0ede8" }}>
              <div className="text-label-mono" style={{ color: "#726D68" }}>TOTAL_DEPLOYED</div>
              <div className="text-headline-md tracking-tighter" style={{ color: "#ab3600" }}>
                {formatINR(totalRaised)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Left: Configuration ── */}
      <div
        className="col-span-1 md:col-span-7 pr-0 md:pr-grid-margin wireframe-border-b md:border-b-0 md:border-r pb-unit-xl md:pb-0"
        style={{ borderColor: "#D1CDC7" }}
      >
        {/* 01 Frequency */}
        <div className="mb-unit-lg">
          <div className="text-label-mono mb-unit-sm uppercase" style={{ color: "#726D68" }}>
            01 // Frequency
          </div>
          <div className="flex wireframe-border p-1" style={{ borderColor: "#D1CDC7", backgroundColor: "#f6f3ee" }}>
            <button
              onClick={() => setRecurring(false)}
              className="flex-1 py-3 text-label-mono text-center transition-colors"
              style={
                !recurring
                  ? { backgroundColor: "#FCFAF7", borderColor: "#ab3600", border: "1px solid #ab3600", color: "#ab3600" }
                  : { backgroundColor: "transparent", color: "#635d5a" }
              }
            >
              One-time
            </button>
            <button
              onClick={() => setRecurring(true)}
              className="flex-1 py-3 text-label-mono text-center transition-colors"
              style={
                recurring
                  ? { backgroundColor: "#FCFAF7", borderColor: "#ab3600", border: "1px solid #ab3600", color: "#ab3600" }
                  : { backgroundColor: "transparent", color: "#635d5a" }
              }
            >
              Sustaining
            </button>
          </div>
        </div>

        {/* 02 Allocation Vector — real hubs */}
        <div className="mb-unit-lg">
          <div className="text-label-mono mb-unit-sm uppercase" style={{ color: "#726D68" }}>
            02 // Allocation Vector
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ border: "1px solid #D1CDC7", gap: "1px", backgroundColor: "#D1CDC7" }}
          >
            {ALLOCATION_VECTORS.map(({ value, icon, title, desc }) => {
              const isActive = selected === value;
              return (
                <button
                  type="button"
                  key={value}
                  aria-pressed={isActive}
                  className="relative flex flex-col text-left p-unit-md cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isActive ? "#FCFAF7" : "#f6f3ee",
                    boxShadow: isActive ? "inset 0 0 0 2px #ab3600" : "none",
                  }}
                  onClick={() => setSelected(value)}
                >
                  <div className="flex justify-between items-start mb-unit-md">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: isActive ? "#ab3600" : "#635d5a", fontSize: 24 }}
                    >
                      {icon}
                    </span>
                    <div
                      className="w-3 h-3"
                      style={{ backgroundColor: isActive ? "#ab3600" : "#cdc5c0" }}
                    />
                  </div>
                  <div className="text-headline-md mb-1" style={{ color: "#1c1c19" }}>{title}</div>
                  <div className="text-body-sm" style={{ color: "#635d5a" }}>{desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 03 Quantum (Amount) — INR */}
        <div>
          <div className="text-label-mono mb-unit-sm uppercase" style={{ color: "#726D68" }}>
            03 // Quantum
          </div>
          <div
            className="relative wireframe-border flex items-center"
            style={{ borderColor: "#D1CDC7", backgroundColor: "#f6f3ee" }}
          >
            <span
              className="text-headline-xl pl-unit-md"
              style={{ color: "#635d5a", fontFamily: "Geist, sans-serif" }}
            >
              ₹
            </span>
            <input
              type="number"
              value={amount}
              min={0}
              aria-label="Donation amount in rupees"
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full bg-transparent outline-none text-right py-unit-md pr-unit-md"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 48,
                lineHeight: "56px",
                fontWeight: 700,
                color: "#1c1c19",
                border: "none",
              }}
            />
          </div>
          <div className="flex gap-2 mt-unit-sm">
            {[500, 1000, 2500, 5000].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className="wireframe-border px-4 py-2 text-label-mono transition-colors"
                style={{ borderColor: "#D1CDC7", color: "#635d5a", backgroundColor: "#FCFAF7" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0ede8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FCFAF7")}
              >
                ₹{preset.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: HUD & Execute ── */}
      <div
        className="col-span-1 md:col-span-5 pl-0 md:pl-grid-margin pt-unit-xl md:pt-0 flex flex-col justify-between"
      >
        <div>
          {/* Impact Preview HUD */}
          <div
            className="wireframe-border p-unit-md mb-unit-lg relative overflow-hidden"
            style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
          >
            <div
              className="absolute top-0 right-0 w-16 h-16 opacity-20"
              style={{
                background: "radial-gradient(circle at top right, #ffb59c, transparent)",
                filter: "blur(20px)",
              }}
            />
            <div className="text-label-mono mb-unit-sm flex justify-between" style={{ color: "#5b4138" }}>
              <span>ESTIMATED_IMPACT_YIELD</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>analytics</span>
            </div>
            <div className="text-headline-md mb-2" style={{ color: "#ab3600" }}>
              {calcImpact(amount, selected)}
            </div>
            <div
              className="text-label-mono text-xs opacity-70 wireframe-border-t pt-2 mt-2"
              style={{ color: "#635d5a", borderColor: "#D1CDC7" }}
            >
              CALCULATION_MODEL: AASHRAYA_v3.1
            </div>
          </div>

          {/* Trust Ledger */}
          <div
            className="wireframe-border p-unit-md flex flex-col gap-3"
            style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center wireframe-border"
                style={{ borderColor: "#D1CDC7", backgroundColor: "#f0ede8" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#1c1c19" }}>
                  verified_user
                </span>
              </div>
              <div>
                <div className="text-label-mono" style={{ color: "#1c1c19" }}>98% EFFICIENCY RATING</div>
                <div className="text-body-sm" style={{ color: "#635d5a" }}>Verified by independent auditors.</div>
              </div>
            </div>
            <a
              href="#"
              className="text-label-mono flex items-center gap-1 transition-colors"
              style={{ color: "#ab3600", fontSize: 12 }}
            >
              VIEW_LEDGER_DATA{" "}
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Execute Button */}
        <div className="mt-unit-xl">
          {user ? (
            <button
              className="w-full text-label-mono py-4 px-6 uppercase tracking-widest transition-colors relative overflow-hidden border flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ab3600", color: "#ffffff", borderColor: "#ab3600" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff5f1f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ab3600")}
            >
              EXECUTE_TRANSFER
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>
            </button>
          ) : (
            <button
              onClick={login}
              className="w-full text-label-mono py-4 px-6 uppercase tracking-widest transition-colors relative overflow-hidden border flex items-center justify-center gap-2"
              style={{ backgroundColor: "#D1CDC7", color: "#1c1c19", borderColor: "#D1CDC7" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cdc5c0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D1CDC7")}
            >
              AUTHENTICATE_TO_EXECUTE
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
            </button>
          )}
          <div className="text-center mt-3 text-body-sm" style={{ color: "#726D68" }}>
            Secure encrypted transaction via Stripe protocol.
          </div>
        </div>
      </div>
    </div>
  );
}
