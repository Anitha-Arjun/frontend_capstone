import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  //Declaring the state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(null);

  //Event handler for sumbit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //Checks the url whether it is login or registering a new user
    const url = register
      ? "http://localhost:4000/api/login/register"
      : "http://localhost:4000/api/login";

    //creates a post request for the new user by adding an email and password
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        //Checks for successful login or registration
        onLoginSuccess(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>{register ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">{register ? "Register" : "Login"}</button>
      </form>

      <button onClick={() => setRegister(!register)} className="toggle-butn">
        {register ? (
          <>
            <span className="acc-text">Already have an account?</span>{" "}
            <span className="text">Login</span>
          </>
        ) : (
          <>
            <span className="acc-text">Don't have an account?</span>{" "}
            <span className="=text">Register</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Login;
