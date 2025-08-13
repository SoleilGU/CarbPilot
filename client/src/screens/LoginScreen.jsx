import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const { userInfo } = useSelector((s) => s.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      alert(err?.data?.message || "Login Failed");
    }
  };

  return (
    <FormContainer title="CarbPilot" subtitle="Welcome back">
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="cp-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="cp-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="cp-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="cp-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoComplete="current-password"
            required
          />
        </div>

        {errMsg && <div className="cp-error mb-4">{errMsg}</div>}

        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className="cp-btn-primary">
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      {/* Redirect to Register page */}
      <div className="cp-subtle mt-6">
        Don't have an account?{" "}
        <Link
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="cp-link"
        >
          Register{" "}
        </Link>
        here
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
