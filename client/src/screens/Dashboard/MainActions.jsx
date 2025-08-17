import { Link } from "react-router-dom";

export default function MainActions({ onViewPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      <Link to="/meals" className="cp-btn-primary w-full py-3 text-center">
        Log Meal
      </Link>
      <button onClick={onViewPlan} className="cp-btn-primary w-full py-3">
        View Carb Plan
      </button>
      <button
        type="button"
        className="cp-btn-primary w-full py-3"
        disabled
        title="Coming soon"
      >
        AI Feedback
      </button>
    </div>
  );
}
