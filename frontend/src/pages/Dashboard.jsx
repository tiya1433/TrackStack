import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  // =========================
  // Data States
  // =========================

  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  // =========================
  // Page States
  // =========================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // =========================
  // Task Filters
  // =========================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================
  // Fetch Dashboard Data
  // =========================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(false);

      const [projectsResponse, tasksResponse] = await Promise.all([
        api.get("/projects/"),
        api.get("/tasks/"),
      ]);

      setProjectList(projectsResponse.data);
      setTaskList(tasksResponse.data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =========================
  // Overall Statistics
  // =========================

  const totalProjects = projectList.length;

  const totalTasks = taskList.length;

  const completedTasks = taskList.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = taskList.filter(
    (task) => task.status === "in_progress"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const overallProgress = completionRate;

  // =========================
  // Active Projects
  // Calculate progress from
  // real project tasks
  // =========================

  const activeProjects = useMemo(() => {
    return projectList
      .filter((project) => project.status === "active")
      .map((project) => {
        const projectTasks = taskList.filter(
          (task) =>
            String(task.project_id) === String(project.id)
        );

        const totalProjectTasks = projectTasks.length;

        const completedProjectTasks = projectTasks.filter(
          (task) => task.status === "completed"
        ).length;

        const projectProgress =
          totalProjectTasks > 0
            ? Math.round(
                (completedProjectTasks / totalProjectTasks) * 100
              )
            : 0;

        return {
          ...project,

          // Real task statistics
          completedTasks: completedProjectTasks,
          totalTasks: totalProjectTasks,

          // Real progress percentage
          progress: projectProgress,
        };
      });
  }, [projectList, taskList]);

  // =========================
  // Change Task Status
  // =========================

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setError(false);

      await api.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setTaskList((currentTasks) =>
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
      console.error("Task status error:", err);
      setError(true);
    }
  };

  // =========================
  // Filter Tasks
  // =========================

  const filteredTasks = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return taskList.filter((task) => {
      const taskTitle =
        task.title?.toLowerCase() || "";

      const projectName =
        task.project?.toLowerCase() || "";

      const matchesSearch =
        taskTitle.includes(searchTerm) ||
        projectName.includes(searchTerm);

      let matchesStatus = true;

      if (statusFilter === "Todo") {
        matchesStatus = task.status === "todo";
      }

      if (statusFilter === "In Progress") {
        matchesStatus = task.status === "in_progress";
      }

      if (statusFilter === "Completed") {
        matchesStatus = task.status === "completed";
      }

      return matchesSearch && matchesStatus;
    });
  }, [taskList, search, statusFilter]);

  // =========================
  // Loading State
  // =========================

  if (loading) {
    return (
      <LoadingState message="Loading your workspace..." />
    );
  }

  // =========================
  // Error State
  // =========================

  if (error) {
    return (
      <ErrorState
        title="Unable to load workspace"
        description="Something went wrong while loading your productivity data."
        onRetry={fetchDashboardData}
      />
    );
  }

  // =========================
  // Dashboard
  // =========================

  return (
    <div className="relative min-h-full overflow-hidden">

      {/* Background Star Decorations */}

      <div className="pointer-events-none absolute left-[12%] top-20 text-xs text-white/30">
        ✦
      </div>

      <div className="pointer-events-none absolute right-[15%] top-32 text-sm text-indigo-300/20">
        ✧
      </div>

      <div className="pointer-events-none absolute bottom-20 left-[45%] text-xs text-violet-300/20">
        ✦
      </div>

      <div className="pointer-events-none absolute right-[40%] top-[55%] text-xs text-white/20">
        ·
      </div>

      <div className="pointer-events-none absolute left-[30%] top-[70%] text-sm text-indigo-300/20">
        ✧
      </div>

      {/* Main Content */}

      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Welcome Section */}

        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Overview
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Good morning,{" "}
            {user?.username || "there"}{" "}
            <span className="text-indigo-300">
              ✦
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Your productivity universe at a glance. Keep
            building, keep moving forward.
          </p>
        </section>

        {/* Statistics Cards */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Projects"
            value={String(totalProjects).padStart(2, "0")}
            description={`${activeProjects.length} active projects`}
            icon={FolderKanban}
            accent="indigo"
          />

          <StatCard
            title="Total Tasks"
            value={String(totalTasks).padStart(2, "0")}
            description={`${inProgressTasks} tasks in progress`}
            icon={ListTodo}
            accent="violet"
          />

          <StatCard
            title="Completed"
            value={String(completedTasks)}
            description={`${completionRate}% completion rate`}
            icon={CheckCircle2}
            accent="emerald"
          />

          <StatCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            description="Across all tasks"
            icon={TrendingUp}
            accent="cyan"
          />

        </section>

        {/* Active Projects */}

        <section className="mt-10">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Workspace
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Active Projects
              </h2>
            </div>

            <Link
              to="/projects"
              className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              View all →
            </Link>

          </div>

          {/* Project Cards */}

          {activeProjects.length > 0 ? (

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              {activeProjects
                .slice(0, 6)
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                  />
                ))}

            </div>

          ) : (

            <EmptyState
              title="No active projects"
              description="Create a project to start tracking your work."
            />

          )}

        </section>

        {/* Recent Tasks */}

        <section className="mt-10 pb-8">

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Productivity
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Recent Tasks
              </h2>

            </div>

            {/* Search + Filter */}

            <div className="flex flex-col gap-2 sm:flex-row">

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search tasks..."
              />

              <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.035] p-1">

                {[
                  "All",
                  "Todo",
                  "In Progress",
                  "Completed",
                ].map((status) => (

                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setStatusFilter(status)
                    }
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-medium transition ${
                      statusFilter === status
                        ? "bg-indigo-500/15 text-indigo-300"
                        : "text-slate-600 hover:bg-white/[0.04] hover:text-slate-300"
                    }`}
                  >
                    {status}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* Task List */}

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">

            {filteredTasks.length > 0 ? (

              filteredTasks
                .slice(0, 10)
                .map((task) => (

                  <TaskCard
                    key={task.id}
                    {...task}
                    onStatusChange={
                      handleStatusChange
                    }
                  />

                ))

            ) : (

              <EmptyState
                title="No tasks found"
                description="Try changing your search or status filter."
              />

            )}

          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;