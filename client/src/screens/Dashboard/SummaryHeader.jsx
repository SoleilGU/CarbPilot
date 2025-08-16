export default function SummaryHeader({ plan, todayCarbs }) {
  const target = Math.round(Number(plan?.targetCarbs ?? 200));
  const today = Math.round(Number(todayCarbs) || 0);
  const typeLabel = plan?.carbType
    ? cap(String(plan.carbType).toLowerCase())
    : "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl bg-mintField/60 p-4">
        <p className="cp-subtle">Today's Carb Type</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">
          {typeLabel}
        </p>
        <p className="cp-subtle mt-1">Target: {target}g</p>
      </div>

      <div className="rounded-2xl bg-mintField/60 p-4">
        <p className="cp-subtle">Summary</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">
          Today: {today}g
        </p>
        <p className="cp-subtle mt-1">Target: {target}g</p>
      </div>

      <div className="rounded-2xl bg-mintField/60 p-4 flex items-center justify-center">
        <p className="cp-subtle">Stay on track</p>
      </div>
    </div>
  );
}

function StatusBadge({ today, target }) {
  const diff = today - target;
  const tolerance = 5;

  if (Math.abs(diff) <= tolerance) {
    return (
      <span
        className="inline-flex items-center rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
        aria-label="Goal met"
      >
        ✓ Met
      </span>
    );
  }
  if (diff > 0) {
    return (
      <span
        className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
        aria-label={`Over by ${diff} grams`}
      >
        ↑ Over by {diff}g
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800"
      aria-label={`Under by ${Math.abs(diff)} grams`}
    >
      ↓ Under by {Math.abs(diff)}g
    </span>
  );
}

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
