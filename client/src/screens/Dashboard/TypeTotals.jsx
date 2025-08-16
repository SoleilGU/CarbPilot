import { useMemo, useState } from "react";

export default function TypeTotals({ meals = [] }) {
  const [type, setType] = useState("breakfast");

  const sums = useMemo(() => {
    const wanted = (type ?? "").toString().trim().toLowerCase();
    const filtered = meals.filter(
      (m) => String(m.mealType || "").toLowerCase() === wanted
    );

    const acc = { carb: 0, protein: 0, fat: 0, kcal: 0 };
    filtered.forEach((m) => {
      acc.kcal += Number(m.totalKcal || 0);
      acc.carb += Number(m.totalCarbs || 0);
      acc.protein += Number(m.totalProtein || 0);
      acc.fat += Number(m.totalFat || 0);
    });

    return {
      count: filtered.length,
      kcal: Math.round(acc.kcal),
      carb: Math.round(acc.carb),
      protein: Math.round(acc.protein),
      fat: Math.round(acc.fat),
    };
  }, [meals, type]);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <label className="cp-subtle">Meal Type</label>
        <select
          className="cp-input w-auto"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Macro label="kcal" v={sums.kcal} />
        <Macro label="Carb (g)" v={sums.carb} />
        <Macro label="Protein (g)" v={sums.protein} />
        <Macro label="Fat (g)" v={sums.fat} />
      </div>

      {sums.count === 0 && (
        <p className="cp=subtle mt-2">
          No meals of this type for the selected date.
        </p>
      )}
    </div>
  );
}
function Macro({ label, v }) {
  return (
    <div className="rounded-xl bg-mintField/60 px-4 py-3">
      <p className="text-sm text-mintText">{label}</p>
      <p className="text-xl font-semibold text-slate-900 mt-1">{v}</p>
    </div>
  );
}
