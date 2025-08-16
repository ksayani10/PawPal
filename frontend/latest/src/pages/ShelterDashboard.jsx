// import React, { useEffect, useMemo, useState } from "react";
// import DashboardLayout from "../layouts/DashboardLayout";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

// /** Simple KPI card */
// function StatCard({ title, value, className = "" }) {
//   return (
//     <div className={`rounded-2xl shadow-sm p-4 text-white ${className}`}>
//       <div className="text-sm/5 opacity-90">{title}</div>
//       <div className="mt-2 text-2xl font-semibold">{value}</div>
//     </div>
//   );
// }

// /** Lightweight donut chart with pure SVG (no library) */
// function DonutChart({ data, size = 220, thickness = 26, legend = true }) {
//   const total = data.reduce((s, d) => s + d.value, 0) || 1;
//   const radius = size / 2;
//   const r = radius - thickness / 2;
//   let start = 0;

//   const arcs = data.map((d, i) => {
//     const angle = (d.value / total) * Math.PI * 2;
//     const x1 = radius + r * Math.cos(start);
//     const y1 = radius + r * Math.sin(start);
//     const x2 = radius + r * Math.cos(start + angle);
//     const y2 = radius + r * Math.sin(start + angle);
//     const large = angle > Math.PI ? 1 : 0;
//     start += angle;
//     return (
//       <path
//         key={i}
//         d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
//         stroke={d.color}
//         strokeWidth={thickness}
//         fill="none"
//         strokeLinecap="butt"
//       />
//     );
//   });

//   return (
//     <div className="flex items-center gap-6">
//       <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//         {/* track */}
//         <circle
//           cx={radius}
//           cy={radius}
//           r={r}
//           stroke="#eef2ff"
//           strokeWidth={thickness}
//           fill="none"
//         />
//         {arcs}
//         <text
//           x="50%"
//           y="50%"
//           dominantBaseline="middle"
//           textAnchor="middle"
//           className="text-xl font-semibold fill-gray-800"
//         >
//           {total}
//         </text>
//       </svg>
//       {legend && (
//         <div className="space-y-2">
//           {data.map((d) => (
//             <div key={d.label} className="flex items-center gap-2 text-sm">
//               <span
//                 className="inline-block w-3 h-3 rounded"
//                 style={{ background: d.color }}
//               />
//               <span className="text-gray-700 w-28">{d.label}</span>
//               <span className="font-medium">{d.value}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /** Announcements panel */
// function Announcements({ items }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-4">
//       <div className="font-semibold">Announcements</div>
//       <ul className="mt-3 divide-y">
//         {items.map((a, i) => (
//           <li key={i} className="py-3">
//             <div className="text-sm font-medium">{a.title}</div>
//             <div className="text-xs text-gray-500">{a.subtitle}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function ShelterDashboard() {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load pets to compute KPIs
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/pets`);
//         const data = await res.json();
//         setPets(Array.isArray(data) ? data : []);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const kpis = useMemo(() => {
//     const total = pets.length;
//     const available = pets.filter((p) => (p.status || "Available") === "Available").length;
//     const adopted = pets.filter((p) => (p.status || "") === "Adopted").length;
//     const pending  = pets.filter((p) => (p.status || "") === "Pending").length;
//     return { total, available, adopted, pending };
//   }, [pets]);

//   const donutData = [
//     { label: "Available", value: kpis.available, color: "#34d399" }, // green
//     { label: "In Progress", value: kpis.pending, color: "#f59e0b" }, // amber
//     { label: "Adopted", value: kpis.adopted, color: "#60a5fa" },     // blue
//   ];

//   const announcements = [
//     { title: "Vaccination Camp this Friday", subtitle: "Bring all pets due for boosters." },
//     { title: "Quarterly Audit", subtitle: "Update records by 25th." },
//     { title: "Volunteer Drive", subtitle: "Weekend event registrations open." },
//   ];

//   return (
//     <DashboardLayout>
//       {/* Page header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p className="text-gray-600">Overview of your shelter activity</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="rounded-xl border px-3 py-2 text-sm">Last 7 days</button>
//           <button className="rounded-xl border px-3 py-2 text-sm">This month</button>
//         </div>
//       </div>

//       {/* KPI row */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
//         <StatCard title="Total Pets" value={kpis.total} className="bg-indigo-500" />
//         <StatCard title="Available" value={kpis.available} className="bg-emerald-500" />
//         <StatCard title="Pending" value={kpis.pending} className="bg-amber-500" />
//         <StatCard title="Adopted" value={kpis.adopted} className="bg-blue-500" />
//       </div>

//       {/* Lower grid: announcements + donut */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
//         <div className="lg:col-span-2">
//           <Announcements items={announcements} />
//         </div>
//         <div className="bg-white rounded-2xl shadow-sm p-4">
//           <div className="flex items-center justify-between">
//             <div className="font-semibold">Status Overview</div>
//             <button className="rounded-xl border px-2 py-1 text-xs">See Details</button>
//           </div>
//           <div className="mt-4 flex justify-center">
//             {loading ? <div className="text-sm text-gray-500">Loading chart…</div> : <DonutChart data={donutData} />}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



// src/pages/shelter/ShelterDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

const Stat = ({ color, title, value }) => (
  <div className={`rounded-2xl p-4 text-white shadow-sm`} style={{ background: color }}>
    <div className="text-sm/5 opacity-90">{title}</div>
    <div className="mt-2 text-2xl font-semibold">{value}</div>
  </div>
);

const Donut = ({ data, size = 220, thickness = 26 }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = size / 2, r = R - thickness / 2;
  let start = -Math.PI / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={R} cy={R} r={r} stroke="#eef2ff" strokeWidth={thickness} fill="none" />
      {data.map((d, i) => {
        const a = (d.value / total) * Math.PI * 2;
        const x1 = R + r * Math.cos(start), y1 = R + r * Math.sin(start);
        const x2 = R + r * Math.cos(start + a), y2 = R + r * Math.sin(start + a);
        const large = a > Math.PI ? 1 : 0; start += a;
        return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`} stroke={d.color} strokeWidth={thickness} fill="none" />;
      })}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-xl font-semibold fill-gray-800">
        {total}
      </text>
    </svg>
  );
};

export default function ShelterDashboard() {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/api/pets`);
      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
    })();
  }, []);

  const kpis = useMemo(() => {
    const total = pets.length;
    const available = pets.filter(p => (p.status || "Available") === "Available").length;
    const adopted = pets.filter(p => (p.status || "") === "Adopted").length;
    const pending = pets.filter(p => (p.status || "") === "Pending").length;
    return { total, available, adopted, pending };
  }, [pets]);

  const donut = [
    { label: "Available", value: kpis.available, color: "#22c55e" },
    { label: "In Progress", value: kpis.pending, color: "#f59e0b" },
    { label: "Adopted", value: kpis.adopted, color: "#3b82f6" },
  ];

  const announcements = [
    { title: "Vaccination Camp this Friday", sub: "Bring pets due for boosters." },
    { title: "Quarterly Audit", sub: "Update records by 25th." },
    { title: "Volunteer Drive", sub: "Weekend registrations open." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your shelter activity</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat color="#6366f1" title="Total Pets" value={kpis.total} />
        <Stat color="#22c55e" title="Available" value={kpis.available} />
        <Stat color="#f59e0b" title="Pending" value={kpis.pending} />
        <Stat color="#ef4444" title="Adopted" value={kpis.adopted} />
      </div>

      {/* Lower grid: announcements + donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4">
          <div className="font-semibold mb-3">Announcements</div>
          <ul className="divide-y">
            {announcements.map((a, i) => (
              <li key={i} className="py-3">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-gray-500">{a.sub}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="font-semibold mb-4">Status Overview</div>
          <div className="flex items-center gap-6">
            <Donut data={donut} />
            <div className="space-y-2">
              {donut.map(d => (
                <div key={d.label} className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded" style={{ background: d.color }} />
                  <span className="w-28 text-gray-700">{d.label}</span>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
