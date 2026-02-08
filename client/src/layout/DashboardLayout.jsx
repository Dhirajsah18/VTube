import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
}
