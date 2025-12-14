import React, { useContext } from "react";
import { AuthContext } from "../auth/auth-context";
import "./styles/logout.css";

export default function LogoutButton() {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
