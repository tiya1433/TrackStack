import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#05060a]/70 px-4 backdrop-blur-2xl sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right - Profile */}
      <div className="flex items-center">
        <button
          onClick={() => navigate("/profile")}
          className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-white/[0.05]"
          title="Open Profile"
        >
          {/* User Information */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-200 transition group-hover:text-white">
              {username}
            </p>

            <p className="text-[11px] text-slate-600 group-hover:text-slate-500">
              Developer
            </p>
          </div>

          {/* Avatar */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-sm font-semibold text-indigo-300 transition group-hover:border-indigo-400/40 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
            {initial}

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#05060a] bg-emerald-400" />
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;