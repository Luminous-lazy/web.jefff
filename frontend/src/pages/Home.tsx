import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Staggered Animations for Elements
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const items = container.querySelectorAll(".stagger-item");

          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("opacity-100", "translate-y-0");
              item.classList.remove("opacity-0", "translate-y-5");
            }, index * 100);
          });

          obs.unobserve(container);
        }
      });
    }, observerOptions);

    const staggerContainers = document.querySelectorAll(".stagger-container");
    staggerContainers.forEach((container) => {
      observer.observe(container);
    });
  }, []);

  return (
    <div className="bg-[#F5F0E6] text-[#4A443F] min-h-screen flex flex-col font-sans relative selection:bg-[#F97316]/30 selection:text-white">
      {/* Easter Eggs */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-xs opacity-30 text-[#4A443F] tracking-[0.2em] z-0 pointer-events-none hidden lg:block">
        &gt; // CYBERNETICS // INITIATIVE
      </div>
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right font-mono text-xs opacity-30 text-[#4A443F] tracking-[0.2em] z-0 pointer-events-none hidden lg:block"
        style={{ animationDelay: "1s" }}
      >
        [_SOULS.PROTOCOL_]
      </div>

      <div className="flex-grow z-10 relative">
        {/* Hero Section */}
        <section
          className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#F5F0E6]/80 backdrop-blur-[2px] p-6 overflow-hidden animate-fade-in-up"
          id="hero-section"
        >
          <div className="relative z-10 max-w-3xl w-full bg-[#FAF7F2]/80 backdrop-blur-md p-10 md:p-12 rounded-3xl border border-[#4A443F]/10 flex flex-col items-center text-center gap-8 shadow-xl shrink-0">
            <div className="font-mono text-[12px] text-[#F97316] tracking-widest uppercase">
              [_SOULS.PROTOCOL.V1_]
            </div>
            <h1 className="text-[40px] md:text-[64px] font-bold tracking-[-0.03em] leading-[48px] md:leading-[72px] text-[#4A443F] drop-shadow-sm">
              Aashraya Impact Hub
            </h1>
            <p className="text-[18px] leading-[30px] font-normal text-[#4A443F]/80 max-w-2xl">
              Join Aashraya Impact Hub in orchestrating scalable, meaningful change. We connect visionary volunteers with localized projects designed to create lasting institutional and social stability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 pb-2">
              <button className="bg-[#F97316] text-white text-[14px] font-semibold tracking-[0.05em] uppercase px-8 py-4 rounded-full hover:-translate-y-[2px] shadow-sm hover:shadow-md transition-all duration-300">
                Join the Movement
              </button>
              <button className="bg-transparent border-2 border-[#F97316] text-[#F97316] text-[14px] font-semibold tracking-[0.05em] uppercase px-8 py-4 rounded-full hover:bg-[#F97316]/10 transition-all duration-300">
                Explore Initiatives
              </button>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section
          className="px-6 py-24 relative animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-container" id="metrics-container">
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 bg-[#FAF7F2]/80 backdrop-blur-md border border-[#4A443F]/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#F97316] mb-4">groups</span>
                <h3 className="text-4xl font-bold text-[#4A443F] mb-2">50k+</h3>
                <p className="text-[#4A443F]/80 uppercase tracking-wider text-sm font-semibold">Lives Impacted</p>
              </div>
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 bg-[#FAF7F2]/80 backdrop-blur-md border border-[#4A443F]/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#F97316] mb-4">public</span>
                <h3 className="text-4xl font-bold text-[#4A443F] mb-2">120+</h3>
                <p className="text-[#4A443F]/80 uppercase tracking-wider text-sm font-semibold">Local Initiatives</p>
              </div>
              <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 bg-[#FAF7F2]/80 backdrop-blur-md border border-[#4A443F]/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#F97316] mb-4">volunteer_activism</span>
                <h3 className="text-4xl font-bold text-[#4A443F] mb-2">15k+</h3>
                <p className="text-[#4A443F]/80 uppercase tracking-wider text-sm font-semibold">Active Volunteers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Media Gallery */}
        <section
          className="px-6 py-24 max-w-7xl mx-auto relative z-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 bg-[#FAF7F2]/80 p-6 rounded-2xl backdrop-blur-sm border border-[#4A443F]/10 shadow-sm">
            <div>
              <h2 className="text-3xl font-bold text-[#4A443F] mb-2">Live Media Gallery</h2>
              <p className="text-[#4A443F]/80">Real moments from our community activities worldwide.</p>
            </div>
            <a href="#" className="text-[#F97316] font-semibold text-sm flex items-center gap-2 hover:opacity-80 transition-opacity">
              View All Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container" id="gallery-container">
            {/* Gallery Card 1 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDxDMt3Pl9LF8l1X3thRSUnoLK9vD2_F92amrWvNSIFF-VzH69ZiuqyyDL8DAyaPUX7NJelMTrn03ZtitUkLoAGaAeS4g2x-Fa30YkPnGkYstE-fgWCmoRURaqNBTQkxbbN2bJ1rbHnVK1C8E_W5oQObxptgUfyisQzvllIoyC90rvUNf2an_MSV1Bjtxk7ZlnbRqSBXnagUsYWW1YYq6bSE1cyBZcB9-Ue-9qGtvN1jGowPocs_k-Aaq5c4jUMu2St_yZB_7phQ" alt="Urban Renewal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Urban Renewal</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Community Garden Setup</h4>
              </div>
            </div>

            {/* Gallery Card 2 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Z5X6WaI2dih4b-bDkQnckzb4pcxf-Ydbl1N0Lb95ftRnpMItkaYUrzS1hsJ8NnJXiio2Z3eZ_J_Pjhq4X2sDNOX3DZ9OYiOAVe4rovaZfB98OLjttBbHYTz54FggEpzVXm8usk2c-vWy8mqsLogILAdWIank3ClHy_20KKmVcpeVzMTBgmqw2BEmkzJ5b3TbP3uZ9tX91Ioh3aff90QHDg_vbkgAA3Eqx9b_I8aBtD-tU9ruwFKOlRNNKxzvQyZDyMVqXxhqxw" alt="Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Education</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Youth Tech Mentorship</h4>
              </div>
            </div>

            {/* Gallery Card 3 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDxDMt3Pl9LF8l1X3thRSUnoLK9vD2_F92amrWvNSIFF-VzH69ZiuqyyDL8DAyaPUX7NJelMTrn03ZtitUkLoAGaAeS4g2x-Fa30YkPnGkYstE-fgWCmoRURaqNBTQkxbbN2bJ1rbHnVK1C8E_W5oQObxptgUfyisQzvllIoyC90rvUNf2an_MSV1Bjtxk7ZlnbRqSBXnagUsYWW1YYq6bSE1cyBZcB9-Ue-9qGtvN1jGowPocs_k-Aaq5c4jUMu2St_yZB_7phQ" alt="Environment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Environment</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Riverbank Restoration</h4>
              </div>
            </div>
            
            {/* Gallery Card 4 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC18_y2jZ7dmYpHamg7aK656BBYLFJR0e55d3NAGaeeqp1dtxAXlQcOt06nSkd4XGjVS6lVK9vcSnvvB3sYnyprx0WRkvpSJGbcsXHcB4vMwjEzK3EBunEV-djib-d8uKdj5-5EcQmUwIU3_JzZe8Kq9HF4tTeyaJqJ2AyzfhvcMN1nhd9Eji6MIoJJ0BkKM6f31R8VCbDTqOLWxnj77Bc4PqUbQ6WE8b0soKzkVcRA6-BWHv64Cbcf5wxJiOYGeW9oaMVGJbWfeQ" alt="Healthcare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Healthcare</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Rural Health Camp</h4>
              </div>
            </div>

            {/* Gallery Card 5 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Z5X6WaI2dih4b-bDkQnckzb4pcxf-Ydbl1N0Lb95ftRnpMItkaYUrzS1hsJ8NnJXiio2Z3eZ_J_Pjhq4X2sDNOX3DZ9OYiOAVe4rovaZfB98OLjttBbHYTz54FggEpzVXm8usk2c-vWy8mqsLogILAdWIank3ClHy_20KKmVcpeVzMTBgmqw2BEmkzJ5b3TbP3uZ9tX91Ioh3aff90QHDg_vbkgAA3Eqx9b_I8aBtD-tU9ruwFKOlRNNKxzvQyZDyMVqXxhqxw" alt="Disaster Relief" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Disaster Relief</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Modular Housing Build</h4>
              </div>
            </div>

            {/* Gallery Card 6 */}
            <div className="stagger-item opacity-0 translate-y-5 transition-all duration-500 group relative bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4A443F]/10 hover:-translate-y-2 shadow-sm hover:shadow-md cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa-TAtPMWVAuXWJMZ2ueD8hJO4M9NeZge_HTKy0M_rl9VZFHBuRDb65ITIHcENLywf1lqDsrGcAItEdS3vpN--lM4-20IInI-cyvv62JY7zLEc1XeAfVjPjnFexmTOyenVLCgKMykseaUsaLBfo6bBhqdnKwKQZzrMm3QQmuXhXnj5JHfBzkd2orOmXJ6WQp_1UKgYky2Ac_bziJkFsajYHRQZb22iA9YsOd_puf4ajkJ1LAYhzWmd6m_mhzyO85sv2HSkyZ6y6g" alt="Empowerment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-[#F97316] font-semibold text-xs mb-1">Empowerment</p>
                <h4 className="text-[#4A443F] font-bold text-lg">Senior Digital Literacy</h4>
              </div>
            </div>

          </div>
        </section>
      </div>

      <footer className="w-full py-10 bg-[#FAF7F2] border-t border-[#4A443F]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
