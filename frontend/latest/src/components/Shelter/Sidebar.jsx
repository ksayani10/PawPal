import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const link = "block px-3 py-2 rounded-xl hover:bg-gray-100";

  return (
    <aside className="h-full w-64 border-r bg-white p-4 flex flex-col">
      <div className="mb-4">
        <div className="text-xl font-semibold">PawPal</div>
        <div className="text-xs text-gray-500 mt-1">{user?.name} • {user?.role}</div>
      </div>
      <nav className="flex-1 space-y-2">
        <NavLink to="/shelter/dash" className={link}>Dashboard</NavLink>
        <NavLink to="/shelter/pets" className={link}>Pets</NavLink>
        <NavLink to="/shelter/settings" className={link}>Settings</NavLink>
    
      </nav>
      <button onClick={()=>{ logout(); nav('/login',{replace:true}); }} className="mt-4 w-full rounded-xl border px-3 py-2 text-sm">Logout</button>
    </aside>
  );
}
