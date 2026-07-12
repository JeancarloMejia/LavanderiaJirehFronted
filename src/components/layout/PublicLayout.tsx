import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function PublicLayout() {
  return (
    <div className="bg-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}