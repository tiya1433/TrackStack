import { AlertTriangle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/10 bg-rose-400/5">
        <AlertTriangle
          size={22}
          className="text-rose-400"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;