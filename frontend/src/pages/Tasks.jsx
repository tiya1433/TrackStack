import { useState } from "react";
import {
  CheckSquare,
  Plus,
} from "lucide-react";

import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { tasks } from "../data/mockData";

function Tasks() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-full overflow-hidden">

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

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Tasks
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Keep track of everything that needs to get done.
            </p>
          </div>

          {/* New Task */}
          <button
            onClick={() => setShowModal(true)}
            className="glow-button flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white"
          >
            <Plus size={17} />
            New Task
          </button>
        </div>

        {/* Task list */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
            />
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Tasks;