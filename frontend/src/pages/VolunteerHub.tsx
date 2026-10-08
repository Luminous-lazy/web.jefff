import { useEffect } from "react";

export default function VolunteerHub() {
  useEffect(() => {
    // Intersection Observer for fade-in animations
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
  }, []);

  return (
    <div className="bg-[#F5F0E6] text-[#4A443F] min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Micro-decorations */}
      <div className="fixed left-6 top-1/3 -rotate-90 origin-left text-[#4A443F] font-mono text-xs opacity-40 tracking-widest pointer-events-none z-0">
        &gt; [COMMUNITY_STITCH]
      </div>
      <div className="fixed right-6 bottom-1/3 rotate-90 origin-right text-[#4A443F] font-mono text-xs opacity-40 tracking-widest pointer-events-none z-0">
        // SYNC_ACTIVE
      </div>

      <div className="flex-grow flex flex-col gap-24 pb-24 relative z-10">
        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-6 w-full pt-16 md:pt-24 opacity-0 translate-y-8 fade-in-up transition-all duration-700 ease-out">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4A443F] max-w-4xl tracking-tight">
            Volunteer Hub: Real Change Starts With You
          </h1>
          <p className="text-lg md:text-xl text-[#4A443F]/80 mt-6 max-w-2xl">
            Join a sophisticated network of dedicated individuals driving high-impact initiatives. Your expertise is the catalyst for sustainable transformation.
          </p>
        </section>

        {/* Active Initiatives (Bento Grid Style) */}
        <section className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-3xl font-bold text-[#4A443F] mb-10 opacity-0 translate-y-8 fade-in-up transition-all duration-700 ease-out">
            Active Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div
              className="bg-[#FAF7F2] border border-[#4A443F]/20 rounded-xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(74,68,63,0.15)] hover:border-[#F97316] transition-all duration-500 ease-out opacity-0 translate-y-8 fade-in-up flex flex-col"
              style={{ transitionDelay: "50ms" }}
            >
              <div className="h-64 overflow-hidden relative bg-[#F5F0E6]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDxDMt3Pl9LF8l1X3thRSUnoLK9vD2_F92amrWvNSIFF-VzH69ZiuqyyDL8DAyaPUX7NJelMTrn03ZtitUkLoAGaAeS4g2x-Fa30YkPnGkYstE-fgWCmoRURaqNBTQkxbbN2bJ1rbHnVK1C8E_W5oQObxptgUfyisQzvllIoyC90rvUNf2an_MSV1Bjtxk7ZlnbRqSBXnagUsYWW1YYq6bSE1cyBZcB9-Ue-9qGtvN1jGowPocs_k-Aaq5c4jUMu2St_yZB_7phQ"
                  alt="Community Building"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-100"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#4A443F] mb-2 group-hover:text-[#F97316] transition-colors">
                  Urban Renewal Project
                </h3>
                <p className="text-[#4A443F]/80 mb-8 flex-grow">
                  Strategic planning and execution for revitalizing public spaces in underserved metropolitan sectors. Seeking architectural and logistical expertise.
                </p>
                <a
                  href="#"
                  className="inline-block self-start font-semibold text-sm bg-transparent border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-[#F97316]/10 transition-all duration-300"
                >
                  Apply Now
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="bg-[#FAF7F2] border border-[#4A443F]/20 rounded-xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(74,68,63,0.15)] hover:border-[#F97316] transition-all duration-500 ease-out opacity-0 translate-y-8 fade-in-up flex flex-col"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="h-64 overflow-hidden relative bg-[#F5F0E6]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Z5X6WaI2dih4b-bDkQnckzb4pcxf-Ydbl1N0Lb95ftRnpMItkaYUrzS1hsJ8NnJXiio2Z3eZ_J_Pjhq4X2sDNOX3DZ9OYiOAVe4rovaZfB98OLjttBbHYTz54FggEpzVXm8usk2c-vWy8mqsLogILAdWIank3ClHy_20KKmVcpeVzMTBgmqw2BEmkzJ5b3TbP3uZ9tX91Ioh3aff90QHDg_vbkgAA3Eqx9b_I8aBtD-tU9ruwFKOlRNNKxzvQyZDyMVqXxhqxw"
                  alt="Tech Education"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-100"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#4A443F] mb-2 group-hover:text-[#F97316] transition-colors">
                  Tech Literacy Initiative
                </h3>
                <p className="text-[#4A443F]/80 mb-8 flex-grow">
                  Empowering the next generation with foundational coding and digital literacy skills. Seeking industry professionals for structured mentorship.
                </p>
                <a
                  href="#"
                  className="inline-block self-start font-semibold text-sm bg-transparent border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-[#F97316]/10 transition-all duration-300"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Spotlight */}
        <section className="max-w-7xl mx-auto px-6 w-full">
          <div className="bg-[#FAF7F2] border border-[#4A443F]/20 rounded-xl p-8 md:p-24 relative overflow-hidden opacity-0 translate-y-8 fade-in-up transition-all duration-700 ease-out shadow-sm">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F97316] to-transparent pointer-events-none"></div>
            <h2 className="text-4xl font-bold text-[#4A443F] mb-10 relative z-10">
              Volunteer Spotlight
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa-TAtPMWVAuXWJMZ2ueD8hJO4M9NeZge_HTKy0M_rl9VZFHBuRDb65ITIHcENLywf1lqDsrGcAItEdS3vpN--lM4-20IInI-cyvv62JY7zLEc1XeAfVjPjnFexmTOyenVLCgKMykseaUsaLBfo6bBhqdnKwKQZzrMm3QQmuXhXnj5JHfBzkd2orOmXJ6WQp_1UKgYky2Ac_bziJkFsajYHRQZb22iA9YsOd_puf4ajkJ1LAYhzWmd6m_mhzyO85sv2HSkyZ6y6g"
                    alt="Sarah Jenkins"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-3xl font-bold text-[#4A443F] mb-2">
                  Dr. Elena Rostova
                </h3>
                <p className="font-mono text-sm text-[#F97316] uppercase tracking-wider mb-6">
                  Strategic Healthcare Director
                </p>
                <p className="text-lg text-[#4A443F]/80 mb-8 border-l-4 border-[#F97316]/50 pl-6 py-2 italic">
                  "The infrastructure we build today dictates the resilience of our communities tomorrow. Volunteering with Aashraya isn't just charity; it's high-stakes structural engineering for society."
                </p>
                <a
                  href="#"
                  className="inline-flex items-center font-semibold text-sm text-[#F97316] hover:text-[#4A443F] transition-colors duration-300 border-b-2 border-[#F97316] hover:border-[#4A443F] pb-1"
                >
                  Read Full Story <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full py-10 mt-10 bg-[#FAF7F2] border-t border-[#4A443F]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-bold text-[#4A443F]/80 tracking-widest uppercase">
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
