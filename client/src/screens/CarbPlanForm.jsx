import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpsertCarbPlanMutation } from "../slices/carbPlanApiSlice";

const ACT = { low: 1.375, moderate: 1.55, high: 1.725 };
const CARB_PCT = { low: 0.25, moderate: 0.45, high: 0.6 };

export default function CarbPlanFrom() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [savePlan, { isLoading }] = useUpsertCarbPlanMutation();

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [carbType, setCarbType] = useState("medium");
  const [errMsg, setErrMsg] = useState("");

  const preview = useMemo(() => {
    const a = +age,
      h = +height,
      w = +weight;
    if (![a, h, w].every(Number.isFinite)) return null;

    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * (ACT[activityLevel] || 1.55);
    const targetCarbs = (tdee * (CARB_PCT[carbType] || 0.45)) / 4;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCarbs: Math.round(targetCarbs),
    };
  }, [age, height, weight, gender, activityLevel, carbType]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const a = +age,
      h = +height,
      w = +weight;
    if (
      !gender ||
      !Number.isFinite(a) ||
      !Number.isFinite(h) ||
      !Number.isFinite(w)
    ) {
      setErrMsg("Please fill in all fields correctly.");
      return;
    }
    try {
      await savePlan({
        userId: userInfo._id,
        gender,
        age: a,
        height: h,
        weight: w,
        activityLevel,
        carbType,
      }).unwrap();
      navigate("/dashboard");
    } catch (err) {
      setErrMsg(err?.data?.message || err?.error || "Failed to save plan");
    }
  };

  return (
    <div>
      <div>
        <h1>Carb Plan</h1>
        <div>
          {errMsg && <div className="cp-error mb-3">{errMsg}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="cp-label">Gender</label>
                <select
                  className=""
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="cp-label">Age</label>
                <input
                  className="cp-input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="cp-label">Height (cm)</label>
                <input
                  className="cp-input"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <label className="cp-label">Weight (kg)</label>
                <input
                  className="cp-input"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="cp-label">Activity Level</label>
                <select
                  className="cp-input"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="cp-label">Carb Type</label>
                <select
                  className="cp-input"
                  value={carbType}
                  onChange={(e) => setCarbType(e.target.value)}
                >
                  <option value="low">Low (25%)</option>
                  <option value="medium">Medium (45%)</option>
                  <option value="high">High (65%)</option>
                </select>
              </div>
            </div>

            {preview && (
              <div className="grid grid-cols-3 gap-3">
                <Prev label="BMR" v={`${preview.bmr} kcal`} />
                <Prev label="TDEE" v={`${preview.tdee} kcal`} />
                <Prev label="Target Carbs" v={`${preview.targetCarbs} g`} />
              </div>
            )}

            <button
              className="cp-btn-primary w-auto px-4 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Plan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Prev({ label, v }) {
  return (
    <div className="rounded-xl bg-mintField px-4 py-3">
      <p className="text-sm text-mintText">{label}</p>
      <p className="text-xl font-semibold text-slate-900 mt-1">{v}</p>
    </div>
  );
}
