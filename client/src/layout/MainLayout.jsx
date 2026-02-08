import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
