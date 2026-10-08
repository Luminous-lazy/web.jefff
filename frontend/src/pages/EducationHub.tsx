import { useEffect } from "react";

export default function EducationHub() {
  useEffect(() => {
    // Add staggered animation classes on mount
    const elements1 = document.querySelectorAll(".stagger-1");
    const elements2 = document.querySelectorAll(".stagger-2");
    const elements3 = document.querySelectorAll(".stagger-3");
    const elements4 = document.querySelectorAll(".stagger-4");

    setTimeout(() => {
      elements1.forEach(el => {
        el.classList.remove("opacity-0", "translate-y-4");
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 50);

    setTimeout(() => {
      elements2.forEach(el => {
        el.classList.remove("opacity-0", "translate-y-4");
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 100);

    setTimeout(() => {
      elements3.forEach(el => {
        el.classList.remove("opacity-0", "translate-y-4");
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 150);

    setTimeout(() => {
      elements4.forEach(el => {
        el.classList.remove("opacity-0", "translate-y-4");
        el.classList.add("opacity-100", "translate-y-0");
      });
    }, 200);
  }, []);

  return (
    <div className="bg-[#F5F0E6] text-[#4A443F] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#F97316]/30 selection:text-white">
      {/* Terminal Margin Strings */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] text-[#4A443F]/40 font-mono hidden lg:block tracking-[0.2em] z-0 pointer-events-none">
        &gt; // CYBERNETICS // IMPACT
      </div>
      <div className="fixed right-6 bottom-1/4 -rotate-90 origin-right text-[10px] text-[#4A443F]/40 font-mono hidden lg:block tracking-[0.2em] z-0 pointer-events-none">
        [_SOULS.PROTOCOL_]
      </div>

      <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto z-10 relative">
        {/* Hero Section */}
        <section className="py-10 stagger-1 opacity-0 translate-y-4 transition-all duration-500 ease-out flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#4A443F]/20 rounded-full bg-[#FAF7F2] text-[#4A443F]/70 font-semibold text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
            LIVE METRICS
          </div>
          <h1 className="text-5xl font-extrabold text-[#4A443F] mb-4 tracking-tight">
            Operational Impact Ledger
          </h1>
          <p className="text-lg text-[#4A443F]/80">
            Transparent quantification of humanistic intervention. Measuring the true scale of tactical empathy and systemic change across all active nodes.
          </p>
        </section>

        {/* Key Metrics Bento Grid */}
        <section className="py-10 stagger-2 opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric Card 1 */}
            <div className="border border-[#4A443F]/20 bg-[#FAF7F2] rounded-lg p-6 relative group overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F97316]"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#F97316]">group</span>
                <span className="text-xs text-[#4A443F]/50 font-mono">NODE.01</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#F97316] font-mono mb-2">150k+</h3>
              <p className="font-semibold text-sm text-[#4A443F]">Lives Touched</p>
              <p className="text-[#4A443F]/70 mt-2 text-sm">Direct beneficiaries across 12 operational sectors.</p>
            </div>

            {/* Metric Card 2 */}
            <div className="border border-[#4A443F]/20 bg-[#FAF7F2] rounded-lg p-6 relative group overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F97316]"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#F97316]">hub</span>
                <span className="text-xs text-[#4A443F]/50 font-mono">NODE.02</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#F97316] font-mono mb-2">42</h3>
              <p className="font-semibold text-sm text-[#4A443F]">Active Nodes</p>
              <p className="text-[#4A443F]/70 mt-2 text-sm">Distributed operational centers globally.</p>
            </div>

            {/* Metric Card 3 */}
            <div className="border border-[#4A443F]/20 bg-[#FAF7F2] rounded-lg p-6 relative group overflow-hidden shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F97316]"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#F97316]">monitoring</span>
                <span className="text-xs text-[#4A443F]/50 font-mono">NODE.03</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#F97316] font-mono mb-2">12.4m</h3>
              <p className="font-semibold text-sm text-[#4A443F]">Total Investment (USD)</p>
              <p className="text-[#4A443F]/70 mt-2 text-sm">Capital deployed into grassroots infrastructure.</p>
            </div>
          </div>
        </section>

        {/* Featured Success Stories */}
        <section className="py-10 stagger-3 opacity-0 translate-y-4 transition-all duration-500 ease-out">
          <h2 className="text-2xl font-bold text-[#4A443F] mb-6 border-b border-[#4A443F]/20 pb-2 inline-block">
            Field Deployments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Story Card 1 */}
            <div className="border border-[#4A443F]/20 rounded-lg overflow-hidden bg-[#FAF7F2] group hover:border-[#F97316] transition-colors duration-300 shadow-sm">
              <div className="h-64 relative bg-[#F5F0E6] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida/AP1WRLt6RPi_gkix0qZHsMYyhr7W567zRW_-xW3vKx9ekfK-VTa58e01z6CGhyoIo-6UgrTzSjPXeTZeoan4Hle-p3U8kI5KqQBYtnMilGe9wIxo2lFG7looCqI1b6bjsj3svtceBz-0RlRmQ1Yp_oUGys4Mv1U2d1LrgUfQphHbc6PYdia2iawb4AExsmEv-wtOii2qwgyX-1m0cCvH4CQChgebt7SOGRjgZqoPWDesuf5G5xwUdxBC6IeKDg"
                  alt="Digital Literacy"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#F5F0E6]/90 px-2 py-1 text-xs font-mono text-[#4A443F] border border-[#4A443F]/20">
                  PHASE_4
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#4A443F] mb-2">Digital Literacy Node</h3>
                <p className="text-[#4A443F]/80 mb-4">
                  Deploying phygital education units to remote sectors, bridging the technological divide with mobile solar-powered infrastructure.
                </p>
                <a href="#" className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:underline">
                  Read Field Report <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="border border-[#4A443F]/20 rounded-lg overflow-hidden bg-[#FAF7F2] group hover:border-[#F97316] transition-colors duration-300 shadow-sm">
              <div className="h-64 relative bg-[#F5F0E6] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsFr6m1Lfl0fLRsh9qGN8RCCeJ_kSAKrlLzbhmlcO9UcTX8Aq3c2L5S8VTxT0O95XZxj2lfq5qgX1arlTnHDHh51HAJ8zTC9Z9zBQqH1rIW8iZJQzPbd0WqsOIXZxj0CPP7pDZNitZfEMU3XpOlNqqtrTUHy_zEZZPYo64XR0l5qYbG4Vq3r-uBp8LpphmuGno2CeS608s3rPrHZUvGawgIPL6RntFJ-seWxwU8HgQGLgn9qaW-pr3H"
                  alt="Urban Forest Expansion"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#F5F0E6]/90 px-2 py-1 text-xs font-mono text-[#4A443F] border border-[#4A443F]/20">
                  ECO_GRID
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#4A443F] mb-2">Urban Forest Expansion</h3>
                <p className="text-[#4A443F]/80 mb-4">
                  Community-led Miyawaki forest projects regenerating urban ecologies and improving local air quality metrics.
                </p>
                <a href="#" className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:underline">
                  Read Field Report <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Chronology */}
        <section className="py-10 stagger-4 opacity-0 translate-y-4 transition-all duration-500 ease-out max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#4A443F] mb-10 text-center">
            Chronological Deployment
          </h2>
          <div className="relative border-l border-[#4A443F]/20 ml-4 md:ml-1/2">
            {/* Timeline Item 1 */}
            <div className="mb-10 ml-8 relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#F97316] border-4 border-[#F5F0E6]"></div>
              <div className="text-sm font-mono text-[#4A443F]/50 mb-1">2024 - Q1</div>
              <h4 className="text-lg font-bold text-[#4A443F] mb-1">Protocol v2.0 Launch</h4>
              <p className="text-[#4A443F]/80">Global rollout of the integrated impact tracking system, connecting all distributed nodes.</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="mb-10 ml-8 relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#FAF7F2] border-4 border-[#F5F0E6]"></div>
              <div className="text-sm font-mono text-[#4A443F]/50 mb-1">2022 - Q3</div>
              <h4 className="text-lg font-bold text-[#4A443F] mb-1">Vastra Sahyog Initiative</h4>
              <p className="text-[#4A443F]/80">Establishment of the dignified clothing distribution network across 15 urban centers.</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="ml-8 relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#FAF7F2] border-4 border-[#F5F0E6]"></div>
              <div className="text-sm font-mono text-[#4A443F]/50 mb-1">2020 - Q1</div>
              <h4 className="text-lg font-bold text-[#4A443F] mb-1">Initial Node Activation</h4>
              <p className="text-[#4A443F]/80">Foundation of Aashraya Impact Hub and deployment of the first educational support units.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FAF7F2] border-t border-[#4A443F]/10 z-10 relative">
        <div className="text-xl font-bold text-[#4A443F]">
          Aashraya Impact Hub
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="text-[#4A443F]/70 hover:text-[#F97316] transition-colors font-semibold text-sm">Privacy Schema</a>
          <a href="#" className="text-[#4A443F]/70 hover:text-[#F97316] transition-colors font-semibold text-sm">Operational Ledger</a>
          <a href="#" className="text-[#4A443F]/70 hover:text-[#F97316] transition-colors font-semibold text-sm">Field Access</a>
          <a href="#" className="text-[#4A443F]/70 hover:text-[#F97316] transition-colors font-semibold text-sm">Contact Node</a>
        </div>
        <div className="text-sm text-[#4A443F]/50 text-center md:text-right font-mono opacity-70">
          © 2024 AASHRAYA IMPACT HUB | [_SOULS.PROTOCOL_]
        </div>
      </footer>
    </div>
  );
}
