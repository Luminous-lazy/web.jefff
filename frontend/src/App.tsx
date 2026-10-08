import { Routes, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import VolunteerHubPage from "./pages/VolunteerHubPage";
import DonationHubPage from "./pages/DonationHubPage";
import EducationHubPage from "./pages/EducationHubPage";

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col antialiased"
      style={{ backgroundColor: "#fcf9f4", color: "#1c1c19" }}
    >
      <TopNavBar />
      <main className="flex-grow w-full max-w-[1440px] mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerHubPage />} />
          <Route path="/donate" element={<DonationHubPage />} />
          <Route path="/education" element={<EducationHubPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
