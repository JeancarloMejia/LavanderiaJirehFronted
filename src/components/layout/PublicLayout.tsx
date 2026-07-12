import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function PublicLayout() {
  return (
    <div className="bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}