import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isloading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Password does not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        navigate(redirect);
      } catch (err) {
        const msg = err?.data?.message || err?.error || "Register failed";
        setErrMsg(msg);
        console.log("Register error: ", err);
      }
    }
  };

  return (
    <FormContainer title="CarPilot" subtitle="Create your account">
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="cp=label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="cp-input"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        <div>
          <label className="cp-label" htmlFor="reg-email">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            className="cp-input"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>

        <div>
          <label className="cp-label" htmlFor="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            className="cp-input"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>

        <div>
          <label className="cp-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="cp-input"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
        </div>

        {errMsg && <div className="cp-error mb-4">{errMsg}</div>}

        <button type="submit" disabled={isloading} className="cp-btn-primary">
          {isloading ? "Creating account..." : "Register"}
        </button>
      </form>

      <div className="cp-subtle mt-6">
        Already have an account?{" "}
        <Link
          to={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="cp-link"
        >
          Sign in{" "}
        </Link>
        here
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
