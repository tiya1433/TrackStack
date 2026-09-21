import {
  Mail,
  MapPin,
  CalendarDays,
  Code2,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const username = user?.username || "User";
  const email = user?.email || "No email available";

  const initial = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute left-[30%] top-24 text-xs text-white/20">
        ✦
      </div>

      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your TrackStack profile information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-xl">
          {/* Profile Header */}
          <div className="border-b border-white/[0.08] p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-3xl font-bold text-indigo-300 shadow-lg shadow-indigo-500/10">
                {initial}
              </div>

              {/* User Information */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {username}
                </h2>

                <p className="mt-1 text-sm text-indigo-400">
                  TrackStack User
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Building, learning and shipping one project at a time.
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            {/* Email */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-400" />

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm text-slate-300">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Type */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <User size={18} className="text-violet-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Account
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Active User
                  </p>
                </div>
              </div>
            </div>

            {/* Joined */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-cyan-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Member Since
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    TrackStack
                  </p>
                </div>
              </div>
            </div>

            {/* Focus */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <Code2 size={18} className="text-emerald-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Focus
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Full Stack Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="border-t border-white/[0.08] p-6 sm:p-8">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-400 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;