import { useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

function TaskCard({
  id,
  title,
  description,
  project,
  project_id,
  status,
  priority,
  dueDate,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      className:
        "text-emerald-400 bg-emerald-400/5 border-emerald-400/10",
      label: "Completed",
    },

    in_progress: {
      icon: Clock3,
      className:
        "text-indigo-400 bg-indigo-400/5 border-indigo-400/10",
      label: "In Progress",
    },

    todo: {
      icon: Circle,
      className:
        "text-slate-500 bg-white/[0.03] border-white/[0.08]",
      label: "Todo",
    },
  };

  const priorityConfig = {
    high: "text-rose-400 bg-rose-400/5 border-rose-400/10",
    medium:
      "text-amber-400 bg-amber-400/5 border-amber-400/10",
    low: "text-slate-400 bg-white/[0.03] border-white/[0.08]",
  };

  const currentStatus =
    statusConfig[status] || statusConfig.todo;

  const StatusIcon = currentStatus.icon;

  // =========================
  // Change Status
  // =========================

  const handleStatusClick = () => {
    if (!onStatusChange) {
      return;
    }

    let nextStatus;

    if (status === "todo") {
      nextStatus = "in_progress";
    } else if (status === "in_progress") {
      nextStatus = "completed";
    } else {
      nextStatus = "todo";
    }

    onStatusChange(id, nextStatus);
  };

  return (
    <div
      className={`group relative flex items-center gap-4 border-b border-white/[0.06] px-4 py-4 transition-all duration-300 last:border-b-0 hover:bg-white/[0.025] sm:px-5 ${
        showMenu ? "z-50" : "z-0"
      }`}
    >

      {/* Status button */}
      <button
        type="button"
        onClick={handleStatusClick}
        title="Click to change status"
        className="shrink-0 rounded-full transition-transform hover:scale-110"
      >
        <StatusIcon
          size={19}
          className={
            currentStatus.className.split(" ")[0]
          }
        />
      </button>

      {/* Task information */}
      <div className="min-w-0 flex-1">

        <h3
          className={`truncate text-sm font-medium ${
            status === "completed"
              ? "text-slate-500 line-through"
              : "text-slate-200"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-600">
          {project ||
            `Project #${project_id}`}
        </p>

      </div>

      {/* Priority */}
      <span
        className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase sm:inline-flex ${
          priorityConfig[priority] ||
          priorityConfig.low
        }`}
      >
        {priority}
      </span>

      {/* Due date */}
      {dueDate && (
        <div className="hidden items-center gap-1.5 text-xs text-slate-600 md:flex">
          <CalendarDays size={13} />
          {dueDate}
        </div>
      )}

      {/* Status */}
      <span
        className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-medium lg:inline-flex ${currentStatus.className}`}
      >
        {currentStatus.label}
      </span>

      {/* More menu */}
      <div className="relative z-[60] shrink-0">

        <button
          type="button"
          onClick={() =>
            setShowMenu((current) => !current)
          }
          className={`rounded-lg p-1.5 text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300 ${
            showMenu
              ? "opacity-100 bg-white/[0.06] text-slate-300"
              : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Task actions"
        >
          <MoreHorizontal size={17} />
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-10 z-[200] w-36 rounded-xl border border-white/[0.1] bg-[#10121b] p-1 shadow-2xl shadow-black/60">

            {/* Edit */}
            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                onEdit?.();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Pencil size={14} />
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                onDelete?.();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default TaskCard;