import { useEffect, useState } from "react";
import { CheckSquare, Plus, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import api from "../api/axios";

function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const projectId = searchParams.get("project");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Tasks + Projects
  // =========================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksResponse, projectsResponse] =
        await Promise.all([
          api.get("/tasks/"),
          api.get("/projects/"),
        ]);

      setTasks(tasksResponse.data);
      setProjects(projectsResponse.data);

      // Find selected project
      if (projectId) {
        const project = projectsResponse.data.find(
          (item) =>
            String(item.id) === String(projectId)
        );

        setSelectedProject(project || null);
      } else {
        setSelectedProject(null);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  // =========================
  // Filter Tasks
  // =========================

  const displayedTasks = projectId
    ? tasks.filter(
        (task) =>
          String(task.project_id) ===
          String(projectId)
      )
    : tasks;

  // =========================
  // Clear Project Filter
  // =========================

  const handleClearFilter = () => {
    setSearchParams({});
  };

  // =========================
  // Task Created
  // =========================

  const handleTaskCreated = () => {
    setShowModal(false);
    fetchData();
  };

  // =========================
  // Task Updated
  // =========================

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchData();
  };

  // =========================
  // Change Task Status
  // =========================

  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {
    try {
      setError("");

      await api.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to update task status."
      );
    }
  };

  // =========================
  // Delete Task
  // =========================

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/tasks/${taskId}`);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to delete task."
      );
    }
  };

  return (
    <div className="relative min-h-full overflow-visible">

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[20%] top-20 text-xs text-indigo-300/20">
        ✧
      </div>

      <div className="pointer-events-none absolute left-[15%] top-[45%] text-xs text-white/20">
        ✦
      </div>

      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">

              <CheckSquare
                size={16}
                className="text-indigo-400"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Productivity
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Tasks
              </h1>

              {selectedProject && (
                <>
                  <span className="text-slate-700">
                    /
                  </span>

                  <span className="rounded-lg border border-indigo-400/10 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
                    {selectedProject.name}
                  </span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {selectedProject
                ? `Tasks for ${selectedProject.name}.`
                : "Keep track of everything that needs to get done."}
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">

            {/* Clear Project Filter */}
            {projectId && (
              <button
                type="button"
                onClick={handleClearFilter}
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X size={16} />
                All Tasks
              </button>
            )}

            {/* New Task */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="glow-button flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
            >
              <Plus size={17} />
              New Task
            </button>

          </div>

        </div>

        {/* Project Filter Indicator */}
        {selectedProject && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-indigo-400/10 bg-indigo-500/5 px-4 py-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-300">
              {selectedProject.name
                ?.charAt(0)
                ?.toUpperCase() || "P"}
            </div>

            <div>
              <p className="text-xs font-medium text-indigo-300">
                Viewing project tasks
              </p>

              <p className="text-[11px] text-slate-500">
                {displayedTasks.length}{" "}
                {displayedTasks.length === 1
                  ? "task"
                  : "tasks"}{" "}
                in {selectedProject.name}
              </p>
            </div>

          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-sm text-slate-500">
            Loading tasks...
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          displayedTasks.length === 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] py-20 text-center backdrop-blur-xl">

              <CheckSquare
                size={40}
                className="mx-auto mb-4 text-slate-600"
              />

              <h2 className="text-lg font-semibold text-white">
                {selectedProject
                  ? "No tasks for this project"
                  : "No tasks yet"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {selectedProject
                  ? `Create a task for ${selectedProject.name} to get started.`
                  : "Create your first task to get started."}
              </p>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Create Task
              </button>

            </div>
          )}

        {/* Task List */}
        {!loading &&
          displayedTasks.length > 0 && (
            <div className="overflow-visible rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">

              {displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onEdit={() =>
                    setEditingTask(task)
                  }
                  onDelete={() =>
                    handleDeleteTask(task.id)
                  }
                />
              ))}

            </div>
          )}

      </div>

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() =>
            setEditingTask(null)
          }
          onTaskUpdated={handleTaskUpdated}
        />
      )}

    </div>
  );
}

export default Tasks;