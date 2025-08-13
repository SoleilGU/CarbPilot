import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "./slices/userApiSlice";
import { logout } from "./slices/authSlice";

// Card
function Home({ userInfo }) {
  return (
    <div className="cp-page">
      <div className="cp-card">
        <h1 className="cp-title">Welcome to CarbPilot</h1>
        <div className="cp-rule" />
        {userInfo ? (
          <p className="cp-subtle">
            You are logged in as{" "}
            <b className="text-slate-800">{userInfo.email}</b>.
          </p>
        ) : (
          <p className="cp-subtle">
            Please{" "}
            <Link to="/login" className="cp-link">
              login
            </Link>{" "}
            or{" "}
            <Link to="/register" className="cp-link">
              register
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { userInfo } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doLogout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await doLogout().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-semibold text-slate-900 hover:opacity-90"
          >
            CarbPilot
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            {!userInfo ? (
              <>
                <Link to="/login" className="cp-link">
                  Login
                </Link>
                <Link to="/register" className="cp-link">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-mintText">
                  Hi, {userInfo?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isLogoutLoading}
                  className="cp-btn-primary w-auto px-3 py-2"
                  aria-label="Log out"
                >
                  {isLogoutLoading ? "Logging Out..." : "Logout"}
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home userInfo={userInfo} />} />
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/" /> : <LoginScreen />}
        />
        <Route
          path="/register"
          element={userInfo ? <Navigate to="/" /> : <RegisterScreen />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
