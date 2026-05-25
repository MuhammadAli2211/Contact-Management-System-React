import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./signup";
import Login from "./login";
import Home from "./home";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
</Routes>
  );
}

export default App;