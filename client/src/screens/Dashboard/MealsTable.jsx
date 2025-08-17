export default function MealsTable({ loading, meals }) {
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-900 mb-3">
        Today's Meals
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700 w-1/3">
                Meal
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700">kcal</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Carb</th>
              <th className="px-4 py-3 font-semibold text-slate-700">
                Protein
              </th>
              <th className="px-4 py-3 font-semibold text-slate-700">Fat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-t">
                <td className="px-4 py-3 cp-subtle">Loading…</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
              </tr>
            ) : meals.length ? (
              meals.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {m.mealType || "meal"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {Math.round(m.totalKcal ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {Math.round(m.totalCarbs ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {Math.round(m.totalProtein ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {Math.round(m.totalFat ?? 0)}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td className="px-4 py-3 cp-subtle" colSpan={5}>
                  No meals for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
