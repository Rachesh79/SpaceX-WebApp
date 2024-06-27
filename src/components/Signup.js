import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(signup({ email, password }));
  };

  // Redirect to login page on successful signup
  if (status === "signedUp") {
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}

export default Signup;
