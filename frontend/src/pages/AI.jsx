import { useState } from "react";
import { Sparkles, Send, Loader2, CheckCircle2 } from "lucide-react";
import api from "../api/axios";

function AI() {
  const [description, setDescription] = useState("");
  const [breakdown, setBreakdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Please describe what you want to work on.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setBreakdown("");

      const response = await api.post("/ai/task-breakdown", {
        description: description.trim(),
      });

      setBreakdown(response.data.breakdown);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to generate AI breakdown. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const breakdownItems = breakdown
    ? breakdown
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
            <Sparkles className="h-5 w-5 text-violet-300" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">
              AI Assistant
            </h1>
            <p className="mt-1 text-sm text-white/45">
              Turn your ideas into actionable tasks.
            </p>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-4">
          <h2 className="text-base font-medium text-white">
            What are you working on?
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Describe a project or task and let AI break it down for you.
          </p>
        </div>

        <form onSubmit={handleGenerate}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Build an authentication system for my web application..."
            rows={5}
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/20"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-white/30">
              {description.length}/1000
            </span>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Generate Breakdown
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* AI Result */}
      {breakdownItems.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
              <Sparkles className="h-5 w-5 text-emerald-300" />
            </div>

            <div>
              <h2 className="text-base font-medium text-white">
                AI Generated Breakdown
              </h2>

              <p className="text-sm text-white/40">
                Your idea has been converted into actionable steps.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {breakdownItems.map((item, index) => {
              const cleanedItem = item.replace(
                /^\d+[\.\)]\s*/,
                ""
              );

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/15 px-4 py-3"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                    <CheckCircle2 className="h-4 w-4 text-violet-300" />
                  </div>

                  <p className="text-sm leading-6 text-white/75">
                    {cleanedItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!breakdown && !loading && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
            <Sparkles className="h-7 w-7 text-violet-300/70" />
          </div>

          <h3 className="text-sm font-medium text-white/70">
            Your AI breakdown will appear here
          </h3>

          <p className="mt-2 max-w-md text-xs leading-5 text-white/35">
            Enter a project idea above and TrackStack AI will divide it
            into smaller, actionable steps.
          </p>
        </div>
      )}
    </div>
  );
}

export default AI;