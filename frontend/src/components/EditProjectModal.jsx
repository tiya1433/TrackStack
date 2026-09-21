import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../api/axios";

function EditProjectModal({
  project,
  onClose,
  onProjectUpdated,
}) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setProjectName(project.name || "");
      setDescription(project.description || "");
      setStatus(project.status || "active");
    }
  }, [project]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!projectName.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.put(`/projects/${project.id}`, {
        name: projectName.trim(),
        description: description.trim(),
        status,
      });

      onProjectUpdated();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to update project."
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
              Edit Project
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update your project details.
            </p>
          </div>

          <button
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

          {/* Name */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Project Name
            </label>

            <input
              value={projectName}
              onChange={(event) =>
                setProjectName(event.target.value)
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
                setDescription(event.target.value)
              }
              rows={4}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40 disabled:opacity-50"
            />

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-xs font-medium text-slate-400">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-xl border border-white/[0.08] bg-[#10131d] px-4 py-3 text-sm text-slate-200 outline-none focus:border-indigo-500/40 disabled:opacity-50"
            >
              <option value="active">
                Active
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
              disabled={loading}
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

export default EditProjectModal;