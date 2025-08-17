import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const initial = (user?.name || "U").slice(0, 1).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-semibold hidden sm:block">Shelter Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <input
              placeholder="Search…"
              className="h-9 w-56 rounded-xl border px-3 text-sm focus:outline-none"
            />
          </div>
          <button className="p-2 rounded-xl hover:bg-gray-100">
            <Bell size={18} />
          </button>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white grid place-items-center">
                {initial}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium leading-tight">{user?.name}</div>
                <div className="text-xs text-gray-500 leading-tight">{user?.role}</div>
              </div>
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-md py-1"
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => { setOpen(false); nav("/shelter/settings"); }}
                >
                  Profile & Settings
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => { logout(); nav("/login", { replace: true }); }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
