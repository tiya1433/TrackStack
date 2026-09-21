import { useEffect, useState } from "react";
import { X } from "lucide-react";

import api from "../api/axios";

function EditTaskModal({
  task,
  onClose,
  onTaskUpdated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [projectId, setProjectId] =
    useState("");
  const [priority, setPriority] =
    useState("medium");
  const [status, setStatus] =
    useState("todo");

  const [projects, setProjects] =
    useState([]);

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // Load Task Data
  // =========================

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setProjectId(
      task.project_id
        ? String(task.project_id)
        : ""
    );
    setPriority(task.priority || "medium");
    setStatus(task.status || "todo");
  }, [task]);

  // =========================
  // Load Projects
  // =========================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response =
          await api.get("/projects/");

        setProjects(response.data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
            "Unable to load projects."
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!projectId) {
      setError("Please select a project.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.put(`/tasks/${task.id}`, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        project_id: Number(projectId),
      });

      onTaskUpdated();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to update task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0b0d14] p-6 shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-white">
              Edit Task
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update your task details.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Title */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Task Title
            </label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/40 disabled:opacity-50"
            />

          </div>

          {/* Description */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/40 disabled:opacity-50"
            />

          </div>

          {/* Project */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Project
            </label>

            <select
              value={projectId}
              onChange={(event) =>
                setProjectId(
                  event.target.value
                )
              }
              disabled={
                loading ||
                loadingProjects
              }
              className="w-full rounded-xl border border-white/[0.08] bg-[#10131d] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40 disabled:opacity-50"
            >
              {loadingProjects ? (
                <option value="">
                  Loading projects...
                </option>
              ) : (
                projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))
              )}
            </select>

          </div>

          {/* Priority */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value
                )
              }
              disabled={loading}
              className="w-full rounded-xl border border-white/[0.08] bg-[#10131d] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40 disabled:opacity-50"
            >
              <option value="high">
                High
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="low">
                Low
              </option>
            </select>

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              disabled={loading}
              className="w-full rounded-xl border border-white/[0.08] bg-[#10131d] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40 disabled:opacity-50"
            >
              <option value="todo">
                Todo
              </option>

              <option value="in_progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                loadingProjects
              }
              className="glow-button rounded-xl px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;