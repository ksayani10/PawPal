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

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ from your AuthContext

  const handleLogout = () => {
    logout();  // clear token/session
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-orange-600 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li><button onClick={() => navigate("/admin")} className="hover:underline">Dashboard</button></li>
          <li><button onClick={() => navigate("/admin/articles")} className="hover:underline">Articles</button></li>
          <li><button onClick={() => navigate("/admin/reports")} className="hover:underline">Settings</button></li>
          <li><button onClick={() => navigate("/admin/users")} className="hover:underline"> Users</button></li>
          <li><button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 shadow rounded">Total Users</div>
          <div className="bg-white p-4 shadow rounded">Total Pets</div>
          <div className="bg-white p-4 shadow rounded">Articles</div>
          <div className="bg-white p-4 shadow rounded">Appointments</div>
        </div>

        {/* Articles and Reports */}
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded p-6">
            <h2 className="font-bold text-lg">Articles Management</h2>
            <p className="text-sm text-gray-600 mb-4">Create, edit, publish and delete pet care articles.</p>
            <button 
              onClick={() => navigate("/admin/articles")} 
              className="bg-orange-600 text-white px-4 py-2 rounded"
            >
              Go to Article List
            </button>
          </div>

          <div className="border rounded p-6">
            <h2 className="font-bold text-lg">Reports</h2>
            <p className="text-sm text-gray-600 mb-4">Generate system and article reports.</p>
            <button 
              onClick={() => navigate("/admin/reports")} 
              className="bg-gray-900 text-white px-4 py-2 rounded"
            >
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
