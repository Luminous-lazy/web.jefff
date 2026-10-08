import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Hub {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

interface Volunteer {
  id: string;
  name: string;
  hub: string;
  role: string;
  skills: string[];
  hours_contributed: number;
  status: string;
}

// Urgency mapping based on volunteer count per hub
const urgencyMap: Record<string, { label: string; color: string }> = {
  education:      { label: "HIGH",   color: "#ab3600" },
  clothing_drive: { label: "MED",    color: "#1c1c19" },
  volunteer_drive:{ label: "LOW",    color: "#726D68" },
};

export default function VolunteerHubPage() {
  const { user, login } = useAuth();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/hubs").then((r) => r.json()),
      fetch("/api/volunteers").then((r) => r.json()),
    ])
      .then(([h, v]) => {
        setHubs(h);
        setVolunteers(v);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const activeCount = volunteers.filter((v) => v.status === "active").length;
  const openMissions = hubs.length;

  return (
    <div className="flex flex-col md:flex-row w-full wireframe-border-r border-l" style={{ borderColor: "#D1CDC7", minHeight: "calc(100vh - 64px - 80px)" }}>
      {/* ── Left: Deployment Board ── */}
      <div className="w-full md:w-2/3 flex flex-col">
        {/* Header */}
        <div
          className="p-grid-margin wireframe-border-b"
          style={{ backgroundColor: "#f0ede8" }}
        >
          <h1
            className="text-headline-xl uppercase mb-unit-sm tracking-tight"
            style={{ color: "#1c1c19" }}
          >
            DEPLOYMENT BOARD
          </h1>
          <p className="text-label-mono" style={{ color: "#726D68" }}>
            SYSTEM STATUS: ACTIVE // OPEN MISSIONS: {openMissions} // OPERATIVES: {activeCount}
          </p>
        </div>

        {/* Table header */}
        <div
          className="flex items-center px-grid-margin py-unit-sm wireframe-border-b"
          style={{ backgroundColor: "#f6f3ee" }}
        >
          <div className="w-12 text-label-mono" style={{ color: "#726D68" }}>IDX</div>
          <div className="flex-grow text-label-mono" style={{ color: "#726D68" }}>MISSION LOG</div>
          <div className="w-32 text-label-mono text-right" style={{ color: "#726D68" }}>URGENCY</div>
        </div>

        {/* Mission rows — real hubs from /api/hubs */}
        {loading ? (
          <div className="p-grid-margin text-label-mono" style={{ color: "#726D68" }}>
            LOADING...
          </div>
        ) : (
          hubs.map((hub, i) => {
            const urgency = urgencyMap[hub.id] ?? { label: "MED", color: "#1c1c19" };
            const hubVolunteers = volunteers.filter((v) => v.hub === hub.id && v.status === "active");
            const hubSkills = [...new Set(hubVolunteers.flatMap((v) => v.skills))].slice(0, 2);
            return (
              <div
                key={hub.id}
                className="flex flex-col sm:flex-row items-start sm:items-center px-grid-margin py-unit-md wireframe-border-b group cursor-pointer transition-colors"
                style={{ borderColor: "#D1CDC7" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f6f3ee")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="w-12 text-label-mono mb-2 sm:mb-0" style={{ color: "#726D68" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-grow flex flex-col gap-1 w-full sm:w-auto">
                  <h3
                    className="text-headline-md transition-colors"
                    style={{ color: "#1c1c19" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ab3600")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1c1c19")}
                  >
                    {hub.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-label-mono flex items-center gap-1" style={{ color: "#726D68" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                      {hub.tagline}
                    </span>
                    {hubSkills.map((s) => (
                      <span key={s} className="hud-chip">{s}</span>
                    ))}
                    {hubVolunteers.length > 0 && (
                      <span className="hud-chip">{hubVolunteers.length} ACTIVE</span>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-32 flex justify-end mt-2 sm:mt-0 items-center gap-2">
                  <span className="text-label-caps" style={{ color: urgency.color }}>
                    {urgency.label}
                  </span>
                  <div className="w-3 h-3" style={{ backgroundColor: urgency.color }} />
                </div>
              </div>
            );
          })
        )}

        {/* Map placeholder */}
        <div
          className="h-64 wireframe-border-b relative overflow-hidden flex items-center justify-center p-grid-margin"
          style={{ backgroundColor: "#f0ede8", borderColor: "#D1CDC7" }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#D1CDC7 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="z-10 text-center">
            <span className="material-symbols-outlined block mb-2" style={{ fontSize: 48, color: "#726D68" }}>
              map
            </span>
            <p className="text-label-mono" style={{ color: "#726D68" }}>
              SCHEMATIC MAP DATA UNAVAILABLE IN THIS SECTOR
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Application Panel ── */}
      <div
        className="w-full md:w-1/3 wireframe-border-l flex flex-col"
        style={{ backgroundColor: "#FCFAF7", borderColor: "#D1CDC7" }}
      >
        <div
          className="p-grid-margin wireframe-border-b"
          style={{ backgroundColor: "#f6f3ee", borderColor: "#D1CDC7" }}
        >
          <h2 className="text-headline-md mb-1" style={{ color: "#1c1c19" }}>
            INITIALIZE DEPLOYMENT
          </h2>
          <p className="text-label-mono" style={{ color: "#726D68" }}>
            SUBMIT CREDENTIALS FOR ASSIGNMENT
          </p>
        </div>

        <form className="flex-grow p-grid-margin flex flex-col gap-unit-lg">
          {/* Operative Name */}
          <div className="flex flex-col gap-2">
            <label className="text-label-caps flex items-center gap-2" style={{ color: "#1c1c19" }}>
              <span className="w-2 h-2 inline-block" style={{ backgroundColor: "#ab3600" }} />
              OPERATIVE NAME
            </label>
            <input
              type="text"
              placeholder="ENTER FULL DESIGNATION"
              className="w-full bg-transparent text-label-mono py-2 px-0 placeholder-muted-text outline-none"
              style={{
                borderBottom: "1px solid #D1CDC7",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                color: "#1c1c19",
                fontFamily: "JetBrains Mono, monospace",
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#ab3600")}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#D1CDC7")}
            />
          </div>

          {/* Communication link */}
          <div className="flex flex-col gap-2">
            <label className="text-label-caps flex items-center gap-2" style={{ color: "#1c1c19" }}>
              <span className="w-2 h-2 inline-block" style={{ backgroundColor: "#ab3600" }} />
              COMMUNICATION LINK
            </label>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent text-label-mono py-2 px-0 outline-none"
              style={{
                borderBottom: "1px solid #D1CDC7",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                color: "#1c1c19",
                fontFamily: "JetBrains Mono, monospace",
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#ab3600")}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#D1CDC7")}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-label-caps flex items-center gap-2" style={{ color: "#1c1c19" }}>
              <span className="w-2 h-2 inline-block" style={{ backgroundColor: "#1c1c19" }} />
              SPECIALIZED SKILLS
            </label>
            <textarea
              placeholder="LIST RELEVANT CAPABILITIES..."
              className="w-full wireframe-border text-label-mono p-3 h-24 resize-none outline-none"
              style={{
                backgroundColor: "#f6f3ee",
                borderColor: "#D1CDC7",
                color: "#1c1c19",
                fontFamily: "JetBrains Mono, monospace",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#ab3600")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#D1CDC7")}
            />
          </div>

          <div className="mt-auto pt-unit-lg">
            {user ? (
              <button
                type="button"
                className="w-full text-label-mono py-4 px-6 transition-colors uppercase flex justify-between items-center group"
                style={{ backgroundColor: "#ab3600", color: "#ffffff" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff5f1f")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ab3600")}
              >
                <span>TRANSMIT REQUEST</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={login}
                className="w-full text-label-mono py-4 px-6 transition-colors uppercase flex justify-between items-center group"
                style={{ backgroundColor: "#D1CDC7", color: "#1c1c19" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cdc5c0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D1CDC7")}
              >
                <span>AUTHENTICATE TO TRANSMIT</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
              </button>
            )}
            <p className="text-label-caps text-center mt-unit-sm" style={{ color: "#726D68" }}>
              SECURE CONNECTION ESTABLISHED
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
