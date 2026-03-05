import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-form">
        <h2 className="logo">Skye Academic</h2>

        <h1>Welcome back</h1>

        <input
          type="email"
          placeholder="Email address"
          className="input-field"
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
        />

        <div className="options">
          <label>
            <input type="checkbox" /> Remember for 30 days
          </label>

          <a href="#">Forgot password</a>
        </div>

        <button className="login-btn">Sign in</button>

        <button className="google-btn">
          Sign in with Google
        </button>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>


      {/* RIGHT SIDE */}
      <div className="login-image">
        <h2>Welcome to Skye Academic</h2>
      </div>

    </div>
  );
}

export default Login;