import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "./ProgressBar";

function ProjectCard({
  id,
  name,
  description,
  progress = 0,
  completedTasks = 0,
  totalTasks = 0,
  status = "active",
  dueDate,
  color = "indigo",
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const safeProgress = Math.min(
    100,
    Math.max(0, Number(progress) || 0)
  );

  const safeCompletedTasks = Number(completedTasks) || 0;
  const safeTotalTasks = Number(totalTasks) || 0;

  const displayStatus =
    status === "active"
      ? "Active"
      : status === "completed"
        ? "Completed"
        : status;

  const handleOpenProject = () => {
    navigate(`/tasks?project=${id}`);
  };

  return (
    <div
      onClick={handleOpenProject}
      className={`group relative cursor-pointer overflow-visible rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:bg-white/[0.055] ${
        showMenu ? "z-50" : "z-0"
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between">

        <div className="flex items-center gap-3">

          {/* Project Icon */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-sm font-bold text-indigo-300">
            {name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          {/* Project Name */}
          <div>
            <h3 className="font-semibold text-slate-100">
              {name}
            </h3>

            <span
              className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                status === "completed"
                  ? "border-emerald-400/10 bg-emerald-400/5 text-emerald-400"
                  : "border-indigo-400/10 bg-indigo-400/5 text-indigo-300"
              }`}
            >
              {displayStatus}
            </span>
          </div>

        </div>

        {/* More Menu */}
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() =>
              setShowMenu((current) => !current)
            }
            className="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300"
          >
            <MoreHorizontal size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-9 z-[200] w-36 overflow-hidden rounded-xl border border-white/[0.1] bg-[#10121b] p-1 shadow-2xl">

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onEdit?.();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onDelete?.();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2 size={14} />
                Delete
              </button>

            </div>
          )}
        </div>

      </div>

      {/* Description */}
      <p className="relative mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
        {description || "No description provided."}
      </p>

      {/* Progress */}
      <div className="relative mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-xs font-medium text-slate-500">
            Progress
          </span>

          <span className="text-xs font-semibold text-indigo-300">
            {safeProgress}%
          </span>

        </div>

        <ProgressBar
          value={safeProgress}
          color={color}
        />

      </div>

      {/* Task Statistics */}
      <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

        <div className="flex items-center gap-1.5 text-xs text-slate-500">

          <CheckCircle2
            size={14}
            className={
              safeProgress === 100
                ? "text-emerald-400"
                : "text-slate-500"
            }
          />

          <span>
            {safeCompletedTasks}/{safeTotalTasks} tasks
          </span>

        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600">

          <CalendarDays size={13} />

          <span>
            {dueDate || "No deadline"}
          </span>

        </div>

      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-5 right-5 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">

        <ArrowUpRight
          size={15}
          className="text-indigo-400"
        />

      </div>

    </div>
  );
}

export default ProjectCard;