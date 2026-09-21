import { useEffect, useState } from "react";
import { FolderKanban, Plus } from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import api from "../api/axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects/");
      setProjects(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // Project Created
  // =========================

  const handleProjectCreated = () => {
    setShowCreateModal(false);
    fetchProjects();
  };

  // =========================
  // Project Updated
  // =========================

  const handleProjectUpdated = () => {
    setEditingProject(null);
    fetchProjects();
  };

  // =========================
  // Delete Project
  // =========================

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? All tasks inside this project will also be deleted."
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/projects/${projectId}`);

      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project.id !== projectId
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to delete project."
      );
    }
  };

  return (
    <div className="relative min-h-full overflow-hidden">

      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[20%] top-20 text-xs text-white/20">
        ✦
      </div>

      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <FolderKanban
                size={16}
                className="text-indigo-400"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Workspace
              </p>

            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Projects
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and track all your development projects.
            </p>

          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="glow-button flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
          >
            <Plus size={17} />
            New Project
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-sm text-slate-500">
            Loading projects...
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">

            <FolderKanban
              size={40}
              className="mx-auto mb-4 text-slate-600"
            />

            <h2 className="text-lg font-semibold text-white">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your first project to get started.
            </p>

            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Create Project
            </button>

          </div>
        )}

        {/* Project grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onEdit={() => setEditingProject(project)}
                onDelete={() =>
                  handleDeleteProject(project.id)
                }
              />
            ))}

          </div>
        )}

      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onProjectUpdated={handleProjectUpdated}
        />
      )}

    </div>
  );
}

export default Projects;