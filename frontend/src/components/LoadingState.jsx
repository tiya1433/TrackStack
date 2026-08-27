import { Loader2 } from "lucide-react";

function LoadingState({
  message = "Loading...",
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/10 bg-indigo-500/5">
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 blur-xl" />

        <Loader2
          size={22}
          className="relative animate-spin text-indigo-400"
        />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-400">
        {message}
      </p>

      <p className="mt-1 text-xs text-slate-600">
        Please wait a moment...
      </p>
    </div>
  );
}

export default LoadingState;