const CARB_PCT = { low: 0.25, medium: 0.45, high: 0.65 };
// carbPlan[0]=Monday ... carbPlan[6]=Sunday
function getTodayIndexMondayFirst(d = new Date()) {
  const iso = d.getDay() === 0 ? 7 : d.getDay(); // Mon=1..Sun=7
  return iso - 1; // 0..6
}

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export default function SummaryHeader({ plan, todayCarbs }) {
  // 1) Deriving "today's type" from the week's plan
  const idx = getTodayIndexMondayFirst();
  const todayTypeFromWeekly =
    Array.isArray(plan?.carbPlan) && plan.carbPlan.length === 7
      ? plan.carbPlan[idx]
      : null;

  // 2) Compatibility: If there is no weekly data, fall back to plan.carbType (old data).
  const todayType =
    todayTypeFromWeekly ||
    (plan?.carbType ? String(plan.carbType).toLowerCase() : null);

  // 3) Calculate target grams:
  //   - First use weekly + tdee to calculate
  //   - Secondly use old field plan.targetCarbs
  const targetFromTDEE =
    todayType && Number.isFinite(plan?.tdee)
      ? Math.round((Number(plan.tdee) * (CARB_PCT[todayType] ?? 0.45)) / 4)
      : null;

  const target = Number.isFinite(targetFromTDEE)
    ? targetFromTDEE
    : Math.round(Number(plan?.targetCarbs ?? 200));

  const today = Math.round(Number(todayCarbs) || 0);
  const typeLabel = todayType ? cap(todayType) : "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl bg-mintField/60 p-4">
        <p className="cp-subtle">Today's Carb Type</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">
          {typeLabel}
        </p>
        <p className="cp-subtle mt-1">
          Target: {Number.isFinite(target) ? `${target}g` : "—"}
        </p>
      </div>

      <div className="rounded-2xl bg-mintField/60 p-4">
        <p className="cp-subtle">Summary</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">
          Today: {today}g
        </p>
        <p className="cp-subtle mt-1">
          Target: {Number.isFinite(target) ? `${target}g` : "—"}
        </p>
      </div>

      <div className="rounded-2xl bg-mintField/60 p-4 flex items-center justify-center">
        <p className="cp-subtle">Stay on track</p>
      </div>
    </div>
  );
}
// export default function SummaryHeader({ plan, todayCarbs }) {
//   const target = Math.round(Number(plan?.targetCarbs ?? 200));
//   const today = Math.round(Number(todayCarbs) || 0);
//   const typeLabel = plan?.carbType
//     ? cap(String(plan.carbType).toLowerCase())
//     : "—";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="rounded-2xl bg-mintField/60 p-4">
//         <p className="cp-subtle">Today's Carb Type</p>
//         <p className="text-2xl font-semibold text-slate-900 mt-1">
//           {typeLabel}
//         </p>
//         <p className="cp-subtle mt-1">Target: {target}g</p>
//       </div>

//       <div className="rounded-2xl bg-mintField/60 p-4">
//         <p className="cp-subtle">Summary</p>
//         <p className="text-2xl font-semibold text-slate-900 mt-1">
//           Today: {today}g
//         </p>
//         <p className="cp-subtle mt-1">Target: {target}g</p>
//       </div>

//       <div className="rounded-2xl bg-mintField/60 p-4 flex items-center justify-center">
//         <p className="cp-subtle">Stay on track</p>
//       </div>
//     </div>
//   );
// }

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
