import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetMealsByDateQuery,
  useAddMealMutation,
  useDeleteMealMutation,
} from "../slices/mealApiSlice";

function todayLocalISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function Meals() {
  const { userInfo } = useSelector((s) => s.auth);

  const [date, setDate] = useState(todayLocalISO());
  const [mealType, setMealType] = useState("breakfast");
  const [rows, setRows] = useState([{ id: 1, name: "", grams: "" }]);
  const [errMsg, setErrMsg] = useState("");

  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useGetMealsByDateQuery({ userId: userInfo._id, date });

  const [addMeal, { isLoading: adding }] = useAddMealMutation();
  const [delMeal, { isLoading: deleting }] = useDeleteMealMutation();

  // Row actions
  const addRow = () =>
    setRows((p) => [...p, { id: p.at(-1).id + 1, name: "", grams: "" }]);
  const updateRow = (id, patch) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const removeRow = (id) =>
    setRows((p) => (p.length > 1 ? p.filter((r) => r.id !== id) : p));

  // Save
  const onAdd = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const items = rows.map(({ name, grams }) => ({
      name: name?.trim(),
      grams: Number(grams),
    }));

    if (
      !items.length ||
      items.some(
        (it) => !it.name || !Number.isFinite(it.grams) || it.grams <= 0
      )
    ) {
      setErrMsg("Please fill all rows with a food name and positive grams.");
      return;
    }

    try {
      await addMeal({ userId: userInfo._id, date, mealType, items }).unwrap();
      setRows([{ id: 1, name: "", grams: "" }]); // reset
    } catch (err) {
      setErrMsg(err?.data?.message || err?.error || "Add failed");
    }
  };

  const onDelete = async (m) => {
    try {
      await delMeal({ id: m._id, userId: userInfo._id, date });
    } catch (err) {
      setErrMsg(err?.data?.message || err?.error || "Delete failed");
    }
  };

  return (
    <div className="cp-page">
      <div className="cp-card">
        <h1 className="cp-title">Meals</h1>
        <div className="cp-rule" />

        {errMsg && <div className="cp-error mb-3">{errMsg}</div>}

        <form onSubmit={onAdd} className="space-y-3 mb-6">
          <div className="flex gap-3">
            <input
              type="date"
              className="cp-input w-auto"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              className="cp-input w-auto"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-2">
              <input
                className="cp-input col-span-7"
                placeholder="food name"
                value={r.name}
                onChange={(e) => updateRow(r.id, { name: e.target.value })}
                autoComplete="off"
              />
              <input
                className="cp-input col-span-3"
                type="number"
                inputMode="decimal"
                min="1"
                step="any"
                placeholder="grams"
                value={r.grams}
                onChange={(e) => updateRow(r.id, { grams: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeRow(r.id)}
                className="cp-btn-primary col-span-2"
                aria-label={`Remove row ${r.id}`}
              >
                -
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={addRow}
              className="cp-btn-primary w-auto px-3 py-2"
            >
              + Add Row
            </button>
            <button
              className="cp-btn-primary w-auto px-4 py-2"
              disabled={adding}
            >
              {adding ? "Saving…" : "Save Meal"}
            </button>
          </div>
        </form>

        {isLoading && <p className="cp-subtle">Loading…</p>}
        {isError && (
          <div className="cp-error">
            Failed: {error?.data?.message || String(error)}
          </div>
        )}

        {!isLoading && !isError && (
          <ul className="space-y-2">
            {meals.map((m) => (
              <li
                key={m._id}
                className="rounded-lg px-4 py-3 bg-mintField flex items-center justify-between"
              >
                <div>
                  <p className="text-slate-800 font-medium">
                    {m.mealType || "meal"}
                  </p>
                  <p className="text-sm text-mintText">
                    {m.items?.length || 0} items —{" "}
                    {Math.round(m.totalKcal || 0)} kcal / C
                    {Math.round(m.totalCarbs || 0)} P
                    {Math.round(m.totalProtein || 0)} F
                    {Math.round(m.totalFat || 0)}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(m)}
                  className="cp-btn-primary w-auto px-3 py-1.5"
                  disabled={deleting}
                  aria-label={`Delete ${m.mealType} meal`}
                >
                  Delete
                </button>
              </li>
            ))}
            {!meals.length && (
              <li className="cp-subtle">No meals for this date.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
