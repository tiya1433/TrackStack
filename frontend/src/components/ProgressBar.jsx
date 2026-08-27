function ProgressBar({ value, color = "indigo" }) {
  const colors = {
    indigo: "from-indigo-500 to-violet-500",
    cyan: "from-cyan-400 to-blue-500",
    emerald: "from-emerald-400 to-teal-500",
    violet: "from-violet-500 to-fuchsia-500",
  };

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colors[color]} shadow-[0_0_12px_rgba(129,140,248,0.25)] transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;