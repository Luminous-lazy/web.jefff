import { useEffect, useState } from "react";
import { api } from "../api";
import type { Hub, Volunteer, Student, Donation, ImpactMetrics } from "../api";

const CAMPAIGNS = [
  { id: "education", name: "Aashraya Vidhyalaya", icon: "📚", goalLabel: "Enroll 2,000 students", goalValue: 2000, color: "#059669" },
  { id: "clothing_drive", name: "Paridhaan 3.0", icon: "👕", goalLabel: "Collect 50,000 items", goalValue: 50000, color: "#f97316" },
  { id: "volunteer_drive", name: "Volunteer Recruitment Drive", icon: "🤝", goalLabel: "500 active volunteers", goalValue: 500, color: "#0ea5e9" },
];

export default function AdminDashboard() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [impact, setImpact] = useState<ImpactMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getHubs(), api.getVolunteers(), api.getStudents(), api.getDonations(), api.getImpact()])
      .then(([h, v, s, d, i]) => { setHubs(h); setVolunteers(v); setStudents(s); setDonations(d); setImpact(i); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  const activeVols = volunteers.filter((v) => v.status === "active").length;
  const totalFunds = donations.filter((d) => d.type === "monetary" && d.amount).reduce((s, d) => s + (d.amount ?? 0), 0);

  const topVolunteers = [...volunteers].sort((a, b) => b.hours_contributed - a.hours_contributed).slice(0, 5);

  const hoursByHub: Record<string, number> = {};
  for (const v of volunteers) { hoursByHub[v.hub] = (hoursByHub[v.hub] ?? 0) + v.hours_contributed; }
  const maxHours = Math.max(...Object.values(hoursByHub), 1);

  const recentDonations = [...donations].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const recentStudents = [...students].sort((a, b) => b.enrollment_date.localeCompare(a.enrollment_date)).slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="animate-premium-fade">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl">📊</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Real-time operational analytics across all hubs</p>
          </div>
        </div>
      </header>

      {/* ═══ KPI Strip ═════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-premium-fade delay-75">
        {[
          { label: "Volunteers", value: activeVols, icon: "🤝" },
          { label: "Students", value: students.length, icon: "🎓" },
          { label: "Donations", value: donations.length, icon: "💝" },
          { label: "Funds Raised", value: `₹${(totalFunds / 100000).toFixed(1)}L`, icon: "💰" },
          { label: "Growth Rate", value: `${impact?.monthly_growth_rate ?? 0}%`, icon: "📈" },
          { label: "Retention", value: `${impact?.donor_retention_rate ?? 0}%`, icon: "🎯" },
        ].map((kpi, idx) => (
          <div key={kpi.label} className="stat-card animate-premium-fade" style={{ animationDelay: `${idx * 50}ms` }}>
            <span className="text-lg">{kpi.icon}</span>
            <p className="mt-2 text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-gray-400">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* ═══ Campaign Performance ══════════════════════════ */}
      <section className="animate-premium-fade delay-200">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">Campaign Performance</h2>
        <p className="text-xs text-gray-400 mt-0.5 mb-5">Progress towards quarterly targets</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {CAMPAIGNS.map((camp, i) => {
            const hub = hubs.find((h) => h.id === camp.id);
            const currentValue = camp.id === "education" ? hub?.stats.students_enrolled ?? 0
              : camp.id === "clothing_drive" ? hub?.stats.items_collected ?? 0
              : hub?.stats.active_volunteers ?? 0;
            const pct = Math.min(Math.round((currentValue / camp.goalValue) * 100), 100);
            return (
              <div key={camp.id} className="card p-5 animate-premium-fade" style={{ animationDelay: `${250 + i * 80}ms` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{camp.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900">{camp.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">{camp.goalLabel}</p>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {currentValue > 1000 ? `${(currentValue / 1000).toFixed(1)}k` : currentValue}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: camp.color }}>{pct}%</span>
                </div>
                <div className="progress-track h-2.5 rounded-lg">
                  <div className="h-full rounded-lg transition-all duration-1000" style={{ width: `${pct}%`, background: camp.color }} />
                </div>
                <div className="flex justify-between mt-2 text-[0.625rem] text-gray-400">
                  <span>Current</span>
                  <span>Goal: {camp.goalValue > 1000 ? `${(camp.goalValue / 1000).toFixed(0)}k` : camp.goalValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ Two-column ════════════════════════════════════ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Volunteer Stats */}
        <section className="space-y-5 animate-premium-fade delay-300">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Volunteer Statistics</h2>

          {/* Hours bar chart */}
          <div className="card p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Hours by Hub</h3>
            <div className="space-y-3">
              {Object.entries(hoursByHub).map(([hubId, hours]) => {
                const pct = Math.round((hours / maxHours) * 100);
                const hubData = hubs.find((h) => h.id === hubId);
                return (
                  <div key={hubId}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-600 capitalize">{hubId.replace(/_/g, " ")}</span>
                      <span className="text-gray-900 font-semibold">{hours.toLocaleString()}h</span>
                    </div>
                    <div className="progress-track h-3 rounded-lg">
                      <div className="h-full rounded-lg transition-all duration-1000" style={{ width: `${pct}%`, background: hubData?.color ?? "#f97316" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">🏆 Top Volunteers</h3>
            <div className="space-y-3">
              {topVolunteers.map((vol, rank) => (
                <div key={vol.id} className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    rank === 0 ? "bg-amber-100 text-amber-600" :
                    rank === 1 ? "bg-gray-100 text-gray-600" :
                    rank === 2 ? "bg-orange-100 text-orange-600" :
                    "bg-gray-50 text-gray-400"
                  }`}>{rank + 1}</span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: vol.avatar_color }}>{vol.name.charAt(0)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-900 truncate">{vol.name}</p>
                    <p className="text-[0.625rem] text-gray-400">{vol.role}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{vol.hours_contributed}h</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="animate-premium-fade delay-400">
          <h2 className="text-base font-bold text-gray-900 tracking-tight mb-5">Recent Activity</h2>
          <div className="card p-5">
            <div className="space-y-5">
              {recentDonations.map((d) => (
                <div key={d.id} className="timeline-item">
                  <div className="timeline-dot" style={{ borderColor: d.type === "monetary" ? "#10b981" : "#f97316" }} />
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900">{d.type === "monetary" ? "💰" : "👕"} {d.donor_name}</p>
                      <p className="text-[0.6875rem] text-gray-400 line-clamp-1">{d.purpose}</p>
                      <p className="text-[0.625rem] text-gray-300 mt-0.5">{d.date}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-gray-900">
                      {d.type === "monetary" ? `₹${(d.amount ?? 0).toLocaleString()}` : `${d.items_count} items`}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-100 my-1" />
              {recentStudents.map((s) => (
                <div key={s.id} className="timeline-item">
                  <div className="timeline-dot" style={{ borderColor: "#0ea5e9" }} />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">🎓 {s.name} enrolled</p>
                    <p className="text-[0.6875rem] text-gray-400">{s.grade} at {s.center}</p>
                    <p className="text-[0.625rem] text-gray-300 mt-0.5">{s.enrollment_date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══ Hub Health ════════════════════════════════════ */}
      <section className="animate-premium-fade delay-500">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">Hub Health</h2>
        <p className="text-xs text-gray-400 mt-0.5 mb-5">Operational metrics across all initiatives</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {hubs.map((hub, i) => {
            const hubVols = volunteers.filter((v) => v.hub === hub.id);
            const hubActiveVols = hubVols.filter((v) => v.status === "active").length;
            const hubDons = donations.filter((d) => d.hub === hub.id);
            const hubFunds = hubDons.filter((d) => d.type === "monetary" && d.amount).reduce((s, d) => s + (d.amount ?? 0), 0);
            return (
              <div key={hub.id} className="card p-5 animate-premium-fade" style={{ animationDelay: `${550 + i * 80}ms` }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{hub.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{hub.name}</h3>
                    <p className="text-[0.6rem] text-gray-400">{hub.tagline}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(hub.stats).slice(0, 2).map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-gray-50 p-2.5 text-center">
                      <p className="text-base font-bold" style={{ color: hub.color }}>
                        {typeof v === "number" && v > 1000 ? `${(v / 1000).toFixed(1)}k` : v}
                        {k.includes("rate") && "%"}
                      </p>
                      <p className="text-[0.5rem] text-gray-400 uppercase">{k.replace(/_/g, " ")}</p>
                    </div>
                  ))}
                  <div className="rounded-xl bg-gray-50 p-2.5 text-center">
                    <p className="text-base font-bold text-gray-900">{hubActiveVols}</p>
                    <p className="text-[0.5rem] text-gray-400 uppercase">Volunteers</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2.5 text-center">
                    <p className="text-base font-bold text-amber-600">₹{(hubFunds / 1000).toFixed(0)}k</p>
                    <p className="text-[0.5rem] text-gray-400 uppercase">Funds</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
