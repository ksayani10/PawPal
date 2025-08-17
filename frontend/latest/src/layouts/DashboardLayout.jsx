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


// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Shelter/Sidebar";
// import DashboardNavbar from "../components/Shelter/DashboardNavbar";

// export default function DashboardLayout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         <Sidebar
//           collapsed={collapsed}
//           setCollapsed={setCollapsed}
//           mobileOpen={mobileOpen}
//           setMobileOpen={setMobileOpen}
//         />
//         {/* main area */}
//         <div className={`flex-1 ${collapsed ? "lg:ml-[76px]" : "lg:ml-64"} ml-0 transition-[margin]`}>
//           <DashboardNavbar onMenuClick={() => setMobileOpen(true)} />
//           <main className="p-6">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
