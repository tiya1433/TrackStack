import { SearchX } from "lucide-react";

function EmptyState({
  title = "Nothing found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <SearchX size={20} className="text-slate-600" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;