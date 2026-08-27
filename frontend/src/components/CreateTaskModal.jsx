import { useState } from "react";
import { X } from "lucide-react";

function CreateTaskModal({ onClose }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskTitle.trim() || !project.trim()) {
      return;
    }

    console.log("New task:", {
      title: taskTitle,
      project,
      priority,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0b0d14] p-6 shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Task
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add a new task to your workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Task title */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Task Title
            </label>

            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="e.g. Build login page"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/40"
            />
          </div>

          {/* Project */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Project
            </label>

            <input
              value={project}
              onChange={(event) => setProject(event.target.value)}
              placeholder="e.g. FilmNest"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/40"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#10131d] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="glow-button rounded-xl px-4 py-2.5 text-sm font-medium text-white"
            >
              Create Task
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;