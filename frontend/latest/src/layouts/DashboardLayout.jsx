// import React from "react";
// import Sidebar from "../components/Shelter/Sidebar";
// export default function DashboardLayout({ children }){
//   return <div className="min-h-screen bg-gray-50 flex">
//     <Sidebar />
//     <main className="flex-1 p-6">{children}</main>
//   </div>;
// }


// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shelter/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />   {/* <-- this renders the nested page (e.g., ShelterDashboard) */}
      </main>
    </div>
  );
}
