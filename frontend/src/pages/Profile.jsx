import {
  Mail,
  MapPin,
  CalendarDays,
  Code2,
} from "lucide-react";

function Profile() {
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

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-xl">
          <div className="border-b border-white/[0.08] p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-3xl font-bold text-indigo-300 shadow-lg shadow-indigo-500/10">
                T
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  Tiyasa Mandal
                </h2>

                <p className="mt-1 text-sm text-indigo-400">
                  Full Stack Developer
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Building, learning and shipping one project at a time.
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    tiyasa@example.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-violet-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Kolkata, India
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-cyan-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Joined
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    August 2026
                  </p>
                </div>
              </div>
            </div>

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
        </div>
      </div>
    </div>
  );
}

export default Profile;