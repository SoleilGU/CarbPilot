// import { useState, useMemo } from "react";
// import { useCalcCarbsMutation } from "../slices/carbApiSlice";
// import { useAddMealMutation } from "../slices/mealApiSlice";

// /**
//  * @param {{ userId: string }} param0
//  * @returns {{
//  *  rows: {id:number,name:string,grams:string}[],
//  *  mealType: string, setMealType: Function,
//  *  errMsg: string, serverResult: { totals: {carb:number,protein:number,fat:number,energy:number}, items:any[] } | null,
//  *  calculating: boolean, savingMeal: boolean, canCalculate: boolean,
//  *  addRow: Function, updateRow: Function, removeRow: Function, onCalculate: Function, onSaveAsMeal: Function
//  * }}
//  */

// export default function useQuickCalc({ userId }) {
//   const [rows, setRows] = useState([{ id: 1, name: "", grams: "" }]);
//   const [mealType, setMealType] = useState("breakfast");
//   const [errMsg, setErrMsg] = useState("");
//   const [serverResult, setServerResult] = useState(null);

//   const [calcCarbs, { isLoading: calculating }] = useCalcCarbsMutation();
//   const [addMeal, { isLoading: savingMeal }] = useAddMealMutation();

//   const addRow = () =>
//     setRows((p) => [...p, { id: p.at(-1).id + 1, name: "", grams: "" }]);
//   const updateRow = (id, patch) =>
//     setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
//   // @desc Delete the row: at least one row
//   const removeRow = (id) =>
//     setRows((p) => (p.length > 1 ? p.filter((r) => r.id !== id) : p));

//   // Calculate only after all rows are filled
//   const canCalculate = useMemo(
//     () => rows.every((r) => r.name?.trim() && Number(r.grams) > 0),
//     [rows]
//   );

//   const onCalculate = async (e) => {
//     e?.preventDefault?.();
//     setErrMsg("");
//     setServerResult(null);

//     const items = rows.map(({ name, grams }) => ({
//       name: name?.trim(),
//       grams: Number(grams),
//     }));
//     if (
//       !items.length ||
//       items.some(
//         (it) => !it.name || !Number.isFinite(it.grams) || it.grams <= 0
//       )
//     ) {
//       setErrMsg("Please fill all rows with a food name and positive grams.");
//       return;
//     }

//     try {
//       const res = await calcCarbs({ items }).unwrap();
//       const totals = {
//         carb: Math.round(Number(res?.totals?.carb ?? 0)),
//         protein: Math.round(Number(res?.totals?.protein ?? 0)),
//         fat: Math.round(Number(res?.totals?.fat ?? 0)),
//         energy: Math.round(Number(res?.totals?.energy ?? 0)),
//       };
//       setServerResult({ totals, items: res.items || items });
//     } catch (err) {
//       setErrMsg(err?.data?.message || err?.error || "Calculation failed");
//     }
//   };

//   const onSaveAsMeal = async () => {
//     if (!serverResult?.totals?.carb) return;
//     setErrMsg("");

//     const date = new Date().toISOString().slice(0, 10);
//     const items = rows.map((r) => ({
//       name: r.name?.trim(),
//       grams: Number(r.grams),
//     }));

//     try {
//       await addMeal({ userId, date, mealType, items }).unwrap();
//       setServerResult((prev) => ({
//         ...prev,
//         savedMealName: items
//           .map((i) => i.name)
//           .join(" + ")
//           .slice(0, 40),
//       }));
//     } catch (err) {
//       setErrMsg(err?.data?.message || err?.error || "Save meal failed");
//     }
//   };

//   return {
//     rows,
//     mealType,
//     setMealType,
//     errMsg,
//     serverResult,
//     calculating,
//     savingMeal,
//     canCalculate,
//     addRow,
//     updateRow,
//     removeRow,
//     onCalculate,
//     onSaveAsMeal,
//   };
// }
