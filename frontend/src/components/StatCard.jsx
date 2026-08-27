import { ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "indigo",
}) {
  const accentStyles = {
    indigo: {
      icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/10",
      glow: "group-hover:shadow-indigo-500/10",
    },
    violet: {
      icon: "bg-violet-500/10 text-violet-400 border-violet-500/10",
      glow: "group-hover:shadow-violet-500/10",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
      glow: "group-hover:shadow-emerald-500/10",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-400 border-cyan-500/10",
      glow: "group-hover:shadow-cyan-500/10",
    },
  };

  const style = accentStyles[accent] || accentStyles.indigo;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05] hover:shadow-2xl ${style.glow}`}
    >
      {/* Gloss highlight */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl transition-all duration-500 group-hover:bg-white/[0.06]" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.icon}`}
        >
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1 text-xs text-slate-600">
        <ArrowUpRight size={13} className="text-emerald-400" />
        <span className="text-emerald-400">12%</span>
        <span>from last week</span>
      </div>
    </div>
  );
}

export default StatCard;