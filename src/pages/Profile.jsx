import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Assignment 7 — Profile route.
// Reads the logged-in user from localStorage and renders their info.
// Logout now calls the server's /api/logout endpoint with the bearer token
// BEFORE clearing localStorage — so the server gets a chance to log/blocklist
// the token (useful when we add token blocklists in a more advanced course).
function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("User");
    if (!raw) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(raw));
  }, [navigate]);

  const handleLogout = async () => {
    // Read the JWT from localStorage.getItem("token")
    const token = localStorage.getItem("token");

    //   - Call  POST /api/logout  with the header
    //     Authorization: "Bearer " + <token>
    //     (the body can be empty — the server only needs the header).
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

    //   - Wrap the fetch in try/catch so a network failure doesn't strand the user:
    //     even if the call fails, you STILL clear localStorage and navigate home.
    } catch (err) {
      console.error("Logout request failed, still clearing localStorage:", err);

    //   - On success OR failure, do these three things in order:
    //       1. localStorage.removeItem("User")
    //       2. localStorage.removeItem("token")
    //       3. toast("Logged out") + navigate("/")
    //   - This is what makes Logout a real "I'm done" — not just clearing the browser.
    } finally {
      localStorage.removeItem("User");
      localStorage.removeItem("token");
      toast.success("Logged out");
      navigate("/");
    }
  };

  if (!user) return null;

  return (
    <main className="Profile">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}

export default Profile;
