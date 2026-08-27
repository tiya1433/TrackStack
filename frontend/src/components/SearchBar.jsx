import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search tasks..." }) {
  return (
    <div className="relative flex w-full items-center sm:w-64">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 text-slate-600"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-2.5 pl-9 pr-9 text-xs text-slate-300 outline-none transition placeholder:text-slate-600 focus:border-indigo-500/30 focus:bg-white/[0.05]"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 text-slate-600 transition hover:text-slate-300"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;