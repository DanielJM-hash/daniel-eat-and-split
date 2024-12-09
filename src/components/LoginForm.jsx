import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import { AdminContext } from "../context";

const LoginForm = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const {isAdmin, setIsAdmin} = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showSignUpPage, setShowSignUpPage] = useState(true); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add authentication logic here
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Login successful!");
        // setEmail("");
        // setPassword("");
        // setConfirmPassword("");
        setIsAdmin(false);
        setIsAuthenticated(false);
        setShowSignUpPage(false);

        if (data.isAdmin == 1){
          setIsAdmin(true);
        }
        else{
          setIsAuthenticated(true);

        }
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    
    }  catch(error) {
      console.error("Error during Login:", error);
      alert("An error occurred. Please try again later.");

    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Login</h2>
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
              style={{ flex: "1", marginRight: "0.px" }}
            />
          </div>
          <div>
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
        <button
          type="submit"
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
