import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import { projects } from "../data/mockData";

function Projects() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute left-[20%] top-20 text-xs text-white/20">
        ✦
      </div>

      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FolderKanban size={16} className="text-indigo-400" />

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
            onClick={() => setShowModal(true)}
            className="glow-button flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
          >
            <Plus size={17} />
            New Project
          </button>
        </div>

        {/* Project grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Projects;