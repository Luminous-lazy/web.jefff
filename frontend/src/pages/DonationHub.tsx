import { useEffect } from "react";

export default function DonationHub() {
  useEffect(() => {
    // Intersection Observer for fade-in-up animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });

    // Staggered entry logic
    const staggerContainers = [
      document.getElementById("projects-grid"),
      document.getElementById("transparency-list"),
    ];

    const staggerObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".stagger-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("opacity-100", "translate-y-0");
                item.classList.remove("opacity-0", "translate-y-5");
              }, index * 100);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    staggerContainers.forEach((container) => {
      if (container) staggerObserver.observe(container);
    });
  }, []);

  return (
    <div className="bg-[#F5F0E6] text-[#4A443F] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#F97316]/30 selection:text-[#4A443F]">
      {/* Easter Eggs */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[#4A443F]/60 font-mono text-xs tracking-[0.2em] pointer-events-none z-10 hidden xl:block">
        [_ALLOCATION.CORE_]
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[#4A443F]/60 font-mono text-xs tracking-[0.2em] pointer-events-none z-10 hidden xl:block">
        &gt; // DIGNITY_PROTOCOLS
      </div>

      <div className="pt-24 pb-12">
        {/* Header Section */}
        <header className="max-w-7xl mx-auto px-6 py-20 fade-in-up opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#4A443F] drop-shadow-sm tracking-tight">
                Support Our <span className="text-[#F97316]">Mission</span>.
              </h1>
              <p className="text-lg md:text-xl text-[#4A443F]/80 max-w-2xl">
                Your strategic investment drives sustainable change. We channel resources directly into high-impact initiatives, ensuring every contribution builds institutional stability and profound community transformation.
              </p>
              <div className="pt-4">
                <button className="bg-[#F97316] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:-translate-y-[2px] transition-all duration-500 flex items-center gap-2 w-max">
                  Make a Contribution
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg relative group bg-[#FAF7F2] border border-[#4A443F]/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQOqCow3X9b-_GsFjBWiKz4Q_16qMK0zkcq8gvNqSR-DUdm9M-_TLaohGVH8aLxQTSoQ2z3wJXQyxC8j4_knJBCndhkXxN2HE1Kkpm1UP6xQHCwuFu7mPsqnxsi21xanEQZGNSFtRyAjyHRy1Vt1tQxtNbXoqe2wzXmXisIiaA-mfYD7_HSpgY4GJ0L_1qfc_9o5JcD4cQ2bdzD4lCj8LFTz44WtMCChfgQ47yblo41y6bS96q2eIjJoqlfxNZpkHREWVZj2nDDA"
                alt="Community"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E6]/80 via-transparent to-transparent"></div>
            </div>
          </div>
        </header>

        {/* Impact Projects Grid Section */}
        <section className="bg-[#FAF7F2]/50 py-24 border-y border-[#4A443F]/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-2 mb-12 fade-in-up opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-4xl font-bold text-[#4A443F]">Active Initiatives</h2>
              <p className="text-[#4A443F]/70 text-lg">Select an impact area to direct your funding.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
              {/* Card 1 */}
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group bg-[#FAF7F2] backdrop-blur-md border border-[#4A443F]/20 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:border-[#F97316]/60 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Z5X6WaI2dih4b-bDkQnckzb4pcxf-Ydbl1N0Lb95ftRnpMItkaYUrzS1hsJ8NnJXiio2Z3eZ_J_Pjhq4X2sDNOX3DZ9OYiOAVe4rovaZfB98OLjttBbHYTz54FggEpzVXm8usk2c-vWy8mqsLogILAdWIank3ClHy_20KKmVcpeVzMTBgmqw2BEmkzJ5b3TbP3uZ9tX91Ioh3aff90QHDg_vbkgAA3Eqx9b_I8aBtD-tU9ruwFKOlRNNKxzvQyZDyMVqXxhqxw"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt="Education"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A443F]/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full font-semibold text-xs text-[#4A443F] flex items-center gap-1 border border-[#4A443F]/10">
                    <span className="material-symbols-outlined text-base text-[#F97316]">school</span> Education
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-2xl font-bold text-[#4A443F]">Rural Education Access</h3>
                  <p className="text-[#4A443F]/70 flex-grow">Establishing modern learning centers and providing technological resources to remote communities.</p>
                  <div className="w-full flex flex-col gap-2 mt-4">
                    <div className="flex justify-between font-semibold text-xs text-[#4A443F]/80">
                      <span>$45,000 Raised</span>
                      <span>Goal: $100k</span>
                    </div>
                    <div className="w-full h-2 bg-[#4A443F]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-transparent border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#F97316] hover:text-white transition-all duration-500">
                    Fund Project
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group bg-[#FAF7F2] backdrop-blur-md border border-[#4A443F]/20 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:border-[#F97316]/60 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN7tcpckMfXILnV8xN5jzXFsfZZ9p2s0ukMDHyB_p-oMgzHJBFm6nwWCbzUjcHUU7II-OM1a4ok5npStYeKrCMntmwHcHXVkgZay8vWpm8CkTgxa66Sv72drVZ-oawvU4DYtlFZk7G-sUzrtwTn5D-9Ifr_4PABoOMWEZPPj2TpsejD4Z04vm4zDrLcSyecIyj24b0rj1jNecxbx2rg3OmEZ7ZenZraCo8o-KBInmaUQqMhFbCD4y-ypF13HRvvLFyaRaXFIZd8g"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt="Infrastructure"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A443F]/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full font-semibold text-xs text-[#4A443F] flex items-center gap-1 border border-[#4A443F]/10">
                    <span className="material-symbols-outlined text-base text-[#F97316]">water_drop</span> Infrastructure
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-2xl font-bold text-[#4A443F]">Clean Water Systems</h3>
                  <p className="text-[#4A443F]/70 flex-grow">Implementing sustainable, high-yield water purification infrastructure in drought-affected regions.</p>
                  <div className="w-full flex flex-col gap-2 mt-4">
                    <div className="flex justify-between font-semibold text-xs text-[#4A443F]/80">
                      <span>$82,000 Raised</span>
                      <span>Goal: $150k</span>
                    </div>
                    <div className="w-full h-2 bg-[#4A443F]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-transparent border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#F97316] hover:text-white transition-all duration-500">
                    Fund Project
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group bg-[#FAF7F2] backdrop-blur-md border border-[#4A443F]/20 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:border-[#F97316]/60 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4R4y9l5UGsBB_S7upelHqrlSOiIGlX3SKaHrESrItj3HKQChWwRsjeSlatX__mGBwH7HpodpP-fI0CCstMZ3mzsqlLn3jzM7mdxAPhS8efTw-8fgm2rp384BttxiSKwoFDOg1qVYK64S7PjHDI6F_BEIW3D6tfx6zjrYMrdCph4ipLW3uBNBIZ6f8oOM1BL1nrg_wAEnhcqn8WBBwwAPLetfoApqVhzBSfYXIcbYOK15NfpndYWNrS6RshUN2XBbKeqFVXubZCw"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt="Health"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A443F]/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full font-semibold text-xs text-[#4A443F] flex items-center gap-1 border border-[#4A443F]/10">
                    <span className="material-symbols-outlined text-base text-[#F97316]">medical_services</span> Health
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-2xl font-bold text-[#4A443F]">Mobile Medical Aid</h3>
                  <p className="text-[#4A443F]/70 flex-grow">Deploying state-of-the-art mobile clinics to provide critical healthcare access and professional triage.</p>
                  <div className="w-full flex flex-col gap-2 mt-4">
                    <div className="flex justify-between font-semibold text-xs text-[#4A443F]/80">
                      <span>$115,000 Raised</span>
                      <span>Goal: $120k</span>
                    </div>
                    <div className="w-full h-2 bg-[#4A443F]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-transparent border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#F97316] hover:text-white transition-all duration-500">
                    Fund Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up opacity-0 translate-y-8 transition-all duration-700 ease-out order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-[#4A443F] mb-6">Financial Transparency</h2>
              <p className="text-lg text-[#4A443F]/70 mb-10">
                We operate with structural integrity. Our allocation model ensures that the vast majority of capital is deployed directly to strategic impact areas.
              </p>
              
              <ul className="flex flex-col gap-4" id="transparency-list">
                <li className="stagger-item opacity-0 translate-y-5 transition-all duration-500 flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-[#4A443F]/20 hover:bg-[#FAF7F2]/80 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0 border border-[#F97316]/30 shadow-sm">
                    <span className="material-symbols-outlined text-[#F97316]">public</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A443F] uppercase tracking-wider">85% Direct Impact</h4>
                    <p className="text-[#4A443F]/60 mt-1 text-sm">Funds deployed strictly to programmatic infrastructure, material resources, and operational execution in the field.</p>
                  </div>
                </li>
                <li className="stagger-item opacity-0 translate-y-5 transition-all duration-500 flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-[#4A443F]/20 hover:bg-[#FAF7F2]/80 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#4A443F]/20">
                    <span className="material-symbols-outlined text-[#4A443F]/80">assured_workload</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A443F] uppercase tracking-wider">10% Strategic Growth</h4>
                    <p className="text-[#4A443F]/60 mt-1 text-sm">Investment in platform expansion, strategic partnerships, and long-term organizational sustainability.</p>
                  </div>
                </li>
                <li className="stagger-item opacity-0 translate-y-5 transition-all duration-500 flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-[#4A443F]/20 hover:bg-[#FAF7F2]/80 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#4A443F]/20">
                    <span className="material-symbols-outlined text-[#4A443F]/80">admin_panel_settings</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A443F] uppercase tracking-wider">5% Core Operations</h4>
                    <p className="text-[#4A443F]/60 mt-1 text-sm">Essential administrative oversight, compliance, and maintaining our secure, high-tier technological infrastructure.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="fade-in-up opacity-0 translate-y-8 transition-all duration-700 ease-out order-1 lg:order-2 bg-[#FAF7F2] backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-[#4A443F]/20 shadow-sm flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
              {/* Conceptual visual representation of data allocation */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #4A443F 1px, transparent 0)", backgroundSize: "24px 24px" }}
              ></div>
              <div className="relative z-10 text-center flex flex-col gap-4">
                <span className="material-symbols-outlined text-[64px] text-[#F97316] font-light">account_balance</span>
                <div className="text-6xl font-extrabold text-[#4A443F]">100%</div>
                <div className="font-bold text-sm text-[#F97316] tracking-widest uppercase">Audited Accountability</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full py-12 bg-[#FAF7F2] border-t border-[#4A443F]/10 relative z-10 transition-opacity duration-300 hover:opacity-80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold text-[#4A443F]/80 tracking-widest">
            © 2024 AASHRAYA IMPACT HUB. ENGINEERED FOR HUMANITY.
          </div>
          <div className="flex gap-6 text-sm font-medium text-[#4A443F]/80">
            <a href="#" className="hover:text-[#F97316] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Support</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
