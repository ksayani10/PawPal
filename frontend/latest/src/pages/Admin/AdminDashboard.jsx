// import { Link } from "react-router-dom";

// export default function AdminDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar (same style as Shelter) */}
//       <aside className="w-64 bg-orange-600 text-white p-5">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//         <nav className="space-y-3">
//           <Link to="/admin/dashboard" className="block hover:underline">Dashboard</Link>
//           <Link to="/admin/articles" className="block hover:underline">Articles</Link>
//           <Link to="/admin/reports" className="block hover:underline">Reports</Link>
//           <Link to="/admin/users" className="block hover:underline"> Users</Link>
//         </nav>
//       </aside>

//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//         {/* KPI cards (keep shelters style) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="p-5 bg-white rounded-xl shadow">Total Users</div>
//           <div className="p-5 bg-white rounded-xl shadow">Total Pets</div>
//           <div className="p-5 bg-white rounded-xl shadow">Articles</div>
//           <div className="p-5 bg-white rounded-xl shadow">Appointments</div>
//         </div>

//         {/* Management tiles */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Replaces Pets tile with Articles tile */}
//           <div className="p-6 bg-white rounded-xl shadow border">
//             <h2 className="text-lg font-semibold mb-2">Articles Management</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               Create, edit, publish and delete pet care articles.
//             </p>
//             <Link to="/admin/articles" className="inline-block px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700">
//               Go to Articles
//             </Link>
//           </div>

//           {/* Keep other tiles as in Shelter (User mgmt / Reports etc.) */}
//           <div className="p-6 bg-white rounded-xl shadow border">
//             <h2 className="text-lg font-semibold mb-2">Reports</h2>
//             <p className="text-sm text-gray-600 mb-4">Generate system and article reports.</p>
//             <Link to="/admin/reports" className="inline-block px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
//               View Reports
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const { logout } = useAuth(); // ✅ from your AuthContext

//   const handleLogout = () => {
//     logout();  // clear token/session
//     navigate("/login"); // redirect to login page
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-orange-300 text-black min-h-screen p-8">
//         <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//         <ul className="space-y-8">
//           <li><button onClick={() => navigate("/admin")} className="hover:underline">Dashboard</button></li>
//           <li><button onClick={() => navigate("/admin/articles")} className="hover:underline">Articles</button></li>
//           <li><button onClick={() => navigate("/admin/reports")} className="hover:underline">Settings</button></li>
//           <li><button onClick={() => navigate("/admin/users")} className="hover:underline"> Users</button></li>
//           <li><button 
//             onClick={handleLogout}
//             className="bg-red-30 text-black px-4 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-50">
//         {/* Header with Logout */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-4 shadow rounded">Total Users</div>
//           <div className="bg-white p-4 shadow rounded">Total Pets</div>
//           <div className="bg-white p-4 shadow rounded">Articles</div>
//           <div className="bg-white p-4 shadow rounded">Appointments</div>
//         </div>

//         {/* Articles and Reports */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="border rounded p-6">
//             <h2 className="font-bold text-lg">Articles Management</h2>
//             <p className="text-sm text-gray-600 mb-4">Create, edit, publish and delete pet care articles.</p>
//             <button 
//               onClick={() => navigate("/admin/articles")} 
//               className="bg-orange-600 text-white px-4 py-2 rounded"
//             >
//               Go to Article List
//             </button>
//           </div>

//           <div className="border rounded p-6">
//             <h2 className="font-bold text-lg">Reports</h2>
//             <p className="text-sm text-gray-600 mb-4">Generate system and article reports.</p>
//             <button 
//               onClick={() => navigate("/admin/reports")} 
//               className="bg-gray-900 text-white px-4 py-2 rounded"
//             >
//               View Reports
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/Admin/AdminDashboard.jsx
import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminDashboard() {
  const user = useMemo(getCurrentUser, []);

  // Demo numbers – wire these to your APIs when ready
  const stats = [
    { title: "Fulfillment", value: "92%", tone: "bg-blue-600" },
    { title: "Next Review", value: "10 Days", tone: "bg-green-600" },
    { title: "Revenue", value: "Rs. 100,000", tone: "bg-amber-500" },
    { title: "Pending Tasks", value: "3 Tasks", tone: "bg-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r bg-white/80 backdrop-blur sticky top-0 h-screen">
          <div className="p-5 border-b">
            <Brand />
          </div>

          {/* Profile card */}
          <div className="px-5 py-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar src={user.image} name={user.name} size="lg" />
              <div>
                <div className="font-semibold leading-tight">{user.name || "Admin User"}</div>
                <div className="text-xs text-gray-500 truncate max-w-[160px]">{user.email || "admin@example.com"}</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-6 space-y-8">
            <SideLink to="/admin/dashboard" label="Dashboard" icon={<HomeIcon />} />
            <SideLink to="/admin/articles" label="Articles" icon={<DocIcon />} />
            <SideLink to="/admin/users" label="Users" icon={<UsersIcon />} />
            
            {/* <SideLink to="/shelter/pets" label="Pets" icon={<PawIcon />} /> */}
            {/* <SideLink to={handleLogout} label="logout" icon={<PawIcon/>}/> */}

            
            {/* add more links as needed */}
          </nav>

          <div className="mt-auto p-5 text-xs text-gray-400">
            © {new Date().getFullYear()} PawPal
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden rounded-xl border px-3 py-2 text-sm"
                  onClick={() => alert("Add a mobile drawer if you like ✨")}
                >
                  Menu
                </button>
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="rounded-xl border px-3 py-2 text-sm bg-orange-600"  
                  
                  title="Back to public home" 
                >
                  Logout
                </Link>
                <Avatar src={user.image} name={user.name} />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mx-auto max-w-7xl p-4 space-y-6">
            {/* Stat cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-2xl bg-white shadow-sm border overflow-hidden">
                  <div className={`h-1.5 ${s.tone}`} />
                  <div className="p-4">
                    <div className="text-xs text-gray-500">{s.title}</div>
                    <div className="text-xl font-semibold mt-1">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Announcements */}
              <section className="rounded-2xl bg-white shadow-sm border p-4 lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold">Announcements</h2>
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
                    View all
                  </Link>
                </div>
                <ul className="divide-y">
                  {[
                    { title: "Content Policy Update", by: "Admin", at: "Today 9:20 AM" },
                    { title: "System Maintenance Friday", by: "Ops", at: "Yesterday 5:00 PM" },
                    { title: "New Feature: PDF Export", by: "Eng", at: "Mon 2:45 PM" },
                  ].map((a, i) => (
                    <li key={i} className="py-3">
                      <div className="font-medium">{a.title}</div>
                      <div className="text-xs text-gray-500">{a.by} • {a.at}</div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Donut card */}
              <section className="rounded-2xl bg-white shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Employee Attendance</h2>
                  <span className="text-xs text-gray-500">Aug 2025 — Sep 2025</span>
                </div>

                <div className="mt-4 grid place-items-center">
                  {/* conic-gradient donut (replace percentages as needed) */}
                  <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#10b981_0_55%,#f59e0b_55%_75%,#3b82f6_75%_90%,#64748b_90%_100%)]">
                    <div className="absolute inset-5 rounded-full bg-white" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Legend color="bg-emerald-500" label="On-Time" value="55%" />
                  <Legend color="bg-amber-500" label="Late" value="20%" />
                  <Legend color="bg-blue-500" label="On Holiday" value="15%" />
                  <Legend color="bg-slate-500" label="Leave & O.O." value="10%" />
                </div>

                <div className="mt-4">
                  <Link to="#" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                    View Details
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ——— helpers & tiny components ——— */

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-orange-600 grid place-items-center text-white font-bold">P</div>
      <div>
        <div className="font-semibold leading-tight">PawPal Admin</div>
        <div className="text-xs text-gray-500">Control Center</div>
      </div>
    </div>
  );
}

function SideLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
          isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50",
        ].join(" ")
      }
    >
      <span className="h-4 w-4">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

function Avatar({ src, name = "", size = "md" }) {
  const sizes = { md: "h-9 w-9 text-sm", lg: "h-12 w-12 text-base" };
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";
  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover border`} />
  ) : (
    <div className={`${sizes[size]} rounded-full grid place-items-center bg-gray-100 border text-gray-600 font-semibold`}>
      {initials}
    </div>
  );
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/* simple inline icons (no extra libs) */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12l9-9 9 9" />
      <path d="M9 21V9h6v12" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 3h8l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5.5" cy="10.5" r="1.5" />
      <circle cx="9.5" cy="6.5" r="1.5" />
      <circle cx="14.5" cy="6.5" r="1.5" />
      <circle cx="18.5" cy="10.5" r="1.5" />
      <path d="M12 12c-3 0-5 2-5 4.5S10 21 12 21s5-1.5 5-4.5S15 12 12 12z" />
    </svg>
  );
}

/* util */
function getCurrentUser() {
  try {
    // try a few common keys you might be using
    const a = localStorage.getItem("user");
    if (a) return JSON.parse(a);
    const b = localStorage.getItem("auth");
    if (b) return JSON.parse(b).user;
  } catch {}
  return { name: "Admin User", email: "admin@example.com" };
}
