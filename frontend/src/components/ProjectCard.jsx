import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import ProgressBar from "./ProgressBar";

function ProjectCard({
  name,
  description,
  progress,
  completedTasks,
  totalTasks,
  status,
  dueDate,
  color = "indigo",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.055]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-sm font-bold text-indigo-300">
            {name.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-100">
              {name}
            </h3>

            <span
              className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                status === "Completed"
                  ? "border-emerald-400/10 bg-emerald-400/5 text-emerald-400"
                  : "border-indigo-400/10 bg-indigo-400/5 text-indigo-300"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <button className="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="relative mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      {/* Progress */}
      <div className="relative mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Progress
          </span>

          <span className="text-xs font-semibold text-slate-300">
            {progress}%
          </span>
        </div>

        <ProgressBar value={progress} color={color} />
      </div>

      {/* Footer */}
      <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <CheckCircle2 size={14} className="text-slate-500" />

          <span>
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <CalendarDays size={13} />

          <span>{dueDate}</span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-5 right-5 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowUpRight size={15} className="text-indigo-400" />
      </div>
    </div>
  );
}

export default ProjectCard;