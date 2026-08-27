import { Bell, Menu, Search, Sparkles } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#05060a]/70 px-4 backdrop-blur-2xl sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden w-64 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 transition focus-within:border-indigo-500/30 focus-within:bg-white/[0.05] sm:flex">
          <Search size={16} className="text-slate-600" />

          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full bg-transparent text-sm text-slate-300 outline-none placeholder:text-slate-600"
          />

          <kbd className="hidden rounded border border-white/[0.08] px-1.5 py-0.5 text-[10px] text-slate-600 md:block">
            /
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-indigo-500/10 bg-indigo-500/5 px-3 py-1.5 md:flex">
          <Sparkles size={13} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">
            Focus mode
          </span>
        </div>

        <button className="relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-white">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
        </button>

        <div className="flex items-center gap-3 border-l border-white/[0.08] pl-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-200">
              Tiyasa
            </p>

            <p className="text-[11px] text-slate-600">
              Developer
            </p>
          </div>

          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-sm font-semibold text-indigo-300">
            T

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#05060a] bg-emerald-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;