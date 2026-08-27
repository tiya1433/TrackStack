import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
} from "lucide-react";

function TaskCard({
  title,
  project,
  status,
  priority,
  dueDate,
  onStatusChange,
}) {
  const statusConfig = {
    Completed: {
      icon: CheckCircle2,
      className: "text-emerald-400 bg-emerald-400/5 border-emerald-400/10",
    },
    "In Progress": {
      icon: Clock3,
      className: "text-indigo-400 bg-indigo-400/5 border-indigo-400/10",
    },
    Todo: {
      icon: Circle,
      className: "text-slate-500 bg-white/[0.03] border-white/[0.08]",
    },
  };

  const priorityConfig = {
    High: "text-rose-400 bg-rose-400/5 border-rose-400/10",
    Medium: "text-amber-400 bg-amber-400/5 border-amber-400/10",
    Low: "text-slate-400 bg-white/[0.03] border-white/[0.08]",
  };

  const currentStatus = statusConfig[status] || statusConfig.Todo;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="group flex items-center gap-4 border-b border-white/[0.06] px-4 py-4 transition-all duration-300 last:border-b-0 hover:bg-white/[0.025] sm:px-5">
      {/* Status button */}
      <button
        onClick={() => {
          if (!onStatusChange) return;

          const nextStatus =
            status === "Todo"
              ? "In Progress"
              : status === "In Progress"
                ? "Completed"
                : "Todo";

          onStatusChange(nextStatus);
        }}
        title="Click to change status"
        className="shrink-0 rounded-full transition-transform hover:scale-110"
      >
        <StatusIcon
          size={19}
          className={currentStatus.className.split(" ")[0]}
        />
      </button>

      {/* Task information */}
      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-sm font-medium ${
            status === "Completed"
              ? "text-slate-500 line-through"
              : "text-slate-200"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-600">
          {project}
        </p>
      </div>

      {/* Priority */}
      <span
        className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-medium sm:inline-flex ${
          priorityConfig[priority] || priorityConfig.Low
        }`}
      >
        {priority}
      </span>

      {/* Due date */}
      <div className="hidden items-center gap-1.5 text-xs text-slate-600 md:flex">
        <CalendarDays size={13} />
        {dueDate}
      </div>

      {/* Status */}
      <span
        className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-medium lg:inline-flex ${currentStatus.className}`}
      >
        {status}
      </span>

      {/* More */}
      <button
        type="button"
        className="shrink-0 rounded-lg p-1.5 text-slate-600 opacity-0 transition group-hover:opacity-100 hover:bg-white/[0.06] hover:text-slate-300"
      >
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
}

export default TaskCard;