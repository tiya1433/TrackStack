import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#05060a] text-slate-100">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="pointer-events-none fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;