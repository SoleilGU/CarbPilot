import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMealsByDateQuery } from "../../slices/mealApiSlice";
import { useGetCarbPlanQuery } from "../../slices/carbPlanApiSlice";

import MealsTable from "./MealsTable";
import SummaryHeader from "./SummaryHeader";
import MainActions from "./MainActions";

function todayLocalISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function Dashboard() {
  const { userInfo } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const today = todayLocalISO();

  // Today meals
  const {
    data: meals = [],
    isLoading: mLoading,
    isError: mErr,
    error: mError,
  } = useGetMealsByDateQuery({ userId: userInfo._id, date: today });

  // @desc Get user's carb plan
  const { data: plan } = useGetCarbPlanQuery({
    userId: userInfo._id,
    date: today,
  });

  // @desc Summarize today's total carbs
  const todayCarbs = meals.reduce(
    (sum, m) => sum + Number(m.totalCarbs || 0),
    0
  );

  return (
    <div className="cp-page">
      <div className="cp-card">
        <h1 className="cp-title">CarbPilot</h1>
        <div className="cp-rule" />

        {mErr && (
          <div className="cp-error mt-4">
            Meals: {mError?.data?.message || String(mError)}
          </div>
        )}

        <SummaryHeader plan={plan} todayCarbs={todayCarbs} />

        <MainActions
          plan={plan}
          onViewPlan={() => navigate("/carbplan")}
          onLogMeal={() => navigate("/meals")}
        />

        <div className="cp-rule" />

        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          Today's Meals
        </h2>
        <MealsTable loading={mLoading} meals={meals} />
      </div>
    </div>
  );
}
