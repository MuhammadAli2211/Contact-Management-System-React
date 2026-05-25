import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert("User already exists!");
      return;
    }

    const newUser = { id: Date.now(), name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    alert("Signup Successful!");
    
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            className="input-field"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit">
          Sign Up
        </button>

        <p className="text">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;