// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Sidebar(){
//   const { user, logout } = useAuth();
//   const nav = useNavigate();
//   const link = "block px-3 py-2 rounded-xl hover:bg-gray-100";

//   return (
//     <aside className="h-full w-64 border-r bg-white p-4 flex flex-col">
//       <div className="mb-4">
//         <div className="text-xl font-semibold">PawPal</div>
//         <div className="text-xs text-gray-500 mt-1">{user?.name} • {user?.role}</div>
//       </div>
//       <nav className="flex-1 space-y-2">
//         <NavLink to="/shelter/dash" className={link}>Dashboard</NavLink>
//         <NavLink to="/shelter/pets" className={link}>Pets</NavLink>
//         <NavLink to="/shelter/settings" className={link}>Settings</NavLink>
    
//       </nav>
//       <button onClick={()=>{ logout(); nav('/login',{replace:true}); }} className="mt-4 w-full rounded-xl border px-3 py-2 text-sm">Logout</button>
//     </aside>
//   );
// }


// src/components/shelter/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, PawPrint, Settings, UserRound,
  LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const items = [
  { to: "/shelter", label: "Dashboard", icon: LayoutDashboard },
  { to: "/shelter/pets", label: "Pets", icon: PawPrint },
  { to: "/shelter/settings", label: "Settings", icon: Settings },
  { to: "/shelter/profile", label: "Profile", icon: UserRound },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const initial = (user?.name || "U").slice(0,1).toUpperCase();

  const base  = "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition";
  const idle  = "text-gray-700 hover:bg-orange-50/40";
const active= "bg-orange-50 text-orange-900 border-l-4 border-orange-500";

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={()=>setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:static top-0 left-0 z-50 lg:z-auto h-screen bg-white border-r shadow-sm
        ${collapsed ? "w-[76px]" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        transition-transform`}>
        
        {/* Brand + collapse */}
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            {!collapsed && <span className="font-bold text-orange-600">PawPal</span>}
          </div>
          <button
            className="hidden lg:inline-flex p-2 rounded-xl hover:bg-gray-100"
            onClick={()=>setCollapsed(v=>!v)}
            aria-label="Collapse"
          >
            {collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
          </button>
        </div>

        {/* Profile card */}
        {!collapsed && (
          <div className="px-4 py-4 border-b">
            <div
              className="cursor-pointer rounded-2xl bg-orange-50 border border-orange-100 p-4 ..."


              onClick={()=>{ setMobileOpen(false); nav("/shelter/profile"); }}
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full ring-2 ring-white shadow" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white grid place-items-center ring-2 ring-white shadow">
                  {initial}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight truncate">{user?.name || "User"}</div>
                <div className="text-xs text-orange-700/80 leading-tight capitalize truncate">{user?.role || "shelter"}</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="px-3 py-4 space-y-1">
          {items.map(({to,label,icon:Icon}) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${base} ${isActive ? active : idle} ${collapsed ? "justify-center" : ""}`
              }
              onClick={()=>setMobileOpen(false)}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button
            className={`${base} ${idle} w-full ${collapsed ? "justify-center" : ""}`}
            onClick={()=>{ logout(); nav("/", { replace:true }); }}
          >
            <LogOut size={18} /> {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
