// export default function QuickCalculator({
//   rows,
//   mealType,
//   setMealType,
//   errMsg,
//   serverResult,
//   calculating,
//   savingMeal,
//   canCalculate,
//   addRow,
//   updateRow,
//   removeRow,
//   onCalculate,
//   onSaveAsMeal,
// }) {
//   return (
//     <>
//       <h2 className="text-xl font-semibold text-slate-900 mb-3">
//         Quick Nutrition Calculator
//       </h2>
//       {errMsg && <div className="cp-error mb-3">{errMsg}</div>}

//       {/* Rows */}
//       <form onSubmit={onCalculate} className="space-y-3 mb-4">
//         {rows.map((r) => (
//           <div key={r.id} className="grid grid-cols-12 gap-2">
//             <input
//               className="cp-input col-span-7"
//               placeholder="food name"
//               value={r.name}
//               onChange={(e) => updateRow(r.id, { name: e.target.value })}
//             />
//             <input
//               className="cp-input col-span-3"
//               placeholder="grams"
//               value={r.grams}
//               onChange={(e) => updateRow(r.id, { grams: e.target.value })}
//             />
//             <button
//               type="button"
//               onClick={() => removeRow(r.id)}
//               className="cp-btn-primary col-span-2"
//             >
//               −
//             </button>
//           </div>
//         ))}

//         {/* Action part: Add row / Choose meal type / Calculate  */}
//         <div className="flex gap-2 items-center">
//           <button
//             type="button"
//             onClick={addRow}
//             className="cp-btn-primary w-auto px-3 py-2"
//           >
//             + Add
//           </button>

//           <select
//             className="cp-input w-auto"
//             value={mealType}
//             onChange={(e) => setMealType(e.target.value)}
//             title="Meal Type"
//           >
//             <option value="breakfast">Breakfast</option>
//             <option value="lunch">Lunch</option>
//             <option value="dinner">Dinner</option>
//             <option value="snack">Snack</option>
//           </select>

//           <button
//             type="submit"
//             disabled={calculating || !canCalculate}
//             className="cp-btn-primary w-auto px-4 py-2"
//           >
//             {calculating ? "Calculating…" : "Calculate"}
//           </button>
//         </div>
//       </form>

//       {/* Result Display + Save */}
//       {serverResult?.totals && (
//         <>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//             <MacroBox label="Carb (g)" value={serverResult.totals.carb} />
//             <MacroBox label="Protein (g)" value={serverResult.totals.protein} />
//             <MacroBox label="Fat (g)" value={serverResult.totals.fat} />
//             <MacroBox
//               label="Energy (kcal)"
//               value={serverResult.totals.energy}
//             />
//           </div>

//           <div className="flex gap-3 mb-6">
//             {/* Call /api/meals when saving；Auto refresh when the tag expires */}
//             <button
//               onClick={onSaveAsMeal}
//               disabled={savingMeal}
//               className="cp-btn-primary w-auto px-4 py-2"
//             >
//               {savingMeal ? "Saving…" : "Log as Meal"}
//             </button>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// function MacroBox({ label, value }) {
//   return (
//     <div className="rounded-xl bg-mintField px-4 py-3">
//       <p className="text-sm text-mintText">{label}</p>
//       <p className="text-xl font-semibold text-slate-900 mt-1">
//         {value ?? "—"}
//       </p>
//     </div>
//   );
// }
