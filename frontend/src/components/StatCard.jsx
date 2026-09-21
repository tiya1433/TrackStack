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
    },
    violet: {
      icon: "bg-violet-500/10 text-violet-400 border-violet-500/10",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-400 border-cyan-500/10",
    },
  };

  const styles =
    accentStyles[accent] || accentStyles.indigo;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.05]">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        {/* Icon */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.icon}`}
        >
          <Icon size={20} />
        </div>

      </div>

      {/* Description */}
      <div className="relative mt-3">
        <p className="text-xs text-slate-600">
          {description}
        </p>
      </div>

      {/* Bottom indicator */}
      <div className="relative mt-5 flex items-center gap-1.5 border-t border-white/[0.06] pt-4">

        <ArrowUpRight
          size={14}
          className="text-emerald-400"
        />

        <span className="text-[11px] font-medium text-slate-500">
          Live data
        </span>

      </div>

    </div>
  );
}

export default StatCard;