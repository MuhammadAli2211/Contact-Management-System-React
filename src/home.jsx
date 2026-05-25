import { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  const navigate = useNavigate();

useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", bio: "", image: "", gender: "", age: "", address: "", contact: "",
  });
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!currentUser?.email) return;
    const all = JSON.parse(localStorage.getItem("contacts")) || [];
    const filtered = all.filter((c) => c.userEmail === currentUser.email);
    setContacts(filtered);
  }, [currentUser?.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("contacts")) || [];

    if (editId) {
      const updated = all.map((c) =>
        c.id === editId ? { ...formData, id: editId, userEmail: currentUser.email } : c
      );
      localStorage.setItem("contacts", JSON.stringify(updated));
      setContacts(updated.filter((c) => c.userEmail === currentUser.email));
      setEditId(null);
    } else {
      const newContact = { ...formData, id: Date.now(), userEmail: currentUser.email };
      const updated = [...all, newContact];
      localStorage.setItem("contacts", JSON.stringify(updated));
      setContacts(updated.filter((c) => c.userEmail === currentUser.email));
    }

    setFormData({
      firstName: "", lastName: "", email: "", bio: "", image: "", gender: "", age: "", address: "", contact: "",
    });
  };

  const handleDelete = (id) => {
    const all = JSON.parse(localStorage.getItem("contacts")) || [];
    const updated = all.filter((c) => c.id !== id);
    localStorage.setItem("contacts", JSON.stringify(updated));
    setContacts(updated.filter((c) => c.userEmail === currentUser.email));
  };

  const handleEdit = (c) => {
    setFormData(c);
    setEditId(c.id);
  };

  // 🔥 Logout Fix
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  if (!currentUser) return null; // Jab tak check ho rha hai screen blank rakhein

  return (<div className="dashboard-container">
      {/* Top Bar for Logout */}
      <div className="dashboard-top-bar">
        <div className="dashboard-logo">Dashboard</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content: Form + Cards Grid */}
      <div className="dashboard-content">
        
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Contact Management</h2>
          
          <div className="form-row">
            <input className="dashboard-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input className="dashboard-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
          </div>
          
          <input className="dashboard-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          
          <textarea className="dashboard-input dashboard-textarea" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio/Description..." />
          
          <input className="dashboard-input" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL (Optional)" />
          
          <div className="form-row">
            <select className="dashboard-input dashboard-select" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled hidden>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            
            <input className="dashboard-input" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
          </div>
          
          <input className="dashboard-input" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input className="dashboard-input" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" />

          <button type="submit" className="action-btn submit-btn">
            {editId ? "Update Contact" : "Add Contact"}
          </button>
        </form>

        {/* Contacts Cards Display Grid */}
        <div className="contacts-grid">
          {contacts.map((c) => (
            <div className="contact-card" key={c.id}>
              <div className="card-avatar">
                <img src={c.image || "https://via.placeholder.com/150"} alt="profile" />
              </div>
              <div className="card-info">
                <h3>{c.firstName} {c.lastName}</h3>
                <span className="card-gender-tag">{c.gender || "Not Specified"}</span>
                <p className="card-email">{c.email}</p>
                {c.contact && <p className="card-phone">📞 {c.contact}</p>}
                {c.bio && <p className="card-bio">{c.bio}</p>}
              </div>
              <div className="card-actions">
                <button className="card-btn edit-btn" onClick={() => handleEdit(c)}>Edit</button>
                <button className="card-btn delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;