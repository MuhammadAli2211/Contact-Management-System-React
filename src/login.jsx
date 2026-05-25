import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      window.location.href = "/home";
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // User check karein
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // 1. Data save karein
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login Successful!");
      
      // 2. 🔥 Force Navigate (Yeh page ko refresh karke /home pe bhej dega)
      window.location.href = "/home";
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <input 
          className="login-input"
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          className="login-input"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" className="login-btn">Login</button>
        
        <p className="login-text">
          Don't have an account? <Link to="/" className="login-link">Signup here</Link>
        </p>
      </form>
    </div>
  );
}
 


export default Login; 