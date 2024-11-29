import React, { useState } from "react";
import { AuthContext } from "../context";
import { SignUpContext } from "../context";
import { useContext } from "react";


const SignUpForm = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const {showSignUpPage, setShowSignUpPage} = useContext(SignUpContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful! You can now log in.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsAuthenticated(true);
        setShowSignUpPage(false);
      } else {
        alert(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ flex: "1", marginRight: "0.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          onClick={(e)=> handleSubmit(e)}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
