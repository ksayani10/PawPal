// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

// const statusPill = (s) =>
//   s === "Active" ? "bg-green-100 text-green-700"
//   : s === "Suspended" ? "bg-red-100 text-red-700"
//   : s === "Invited" ? "bg-yellow-100 text-yellow-700"
//   : "bg-gray-100 text-gray-700";

// export default function UserList() {
//   const [items, setItems] = useState([]);
//   const [q, setQ] = useState("");
//   const [role, setRole] = useState("All");
//   const [status, setStatus] = useState("All");
//   const [sort, setSort] = useState("name-asc");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const [previewSrc, setPreviewSrc] = useState("");

//   const load = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (q.trim()) params.set("q", q.trim());
//       if (role !== "All") params.set("role", role);
//       if (status !== "All") params.set("status", status);
//       if (sort) params.set("sort", sort);

//       const res = await fetch(`${API_BASE}/api/auth/users?${params.toString()}`);
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : []);
//     } catch (e) {
//       console.error(e);
//       setErr("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, role, status, sort]);

//   const filtered = useMemo(() => items, [items]);

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this user?")) return;
//     const res = await fetch(`${API_BASE}/api/auth/users/${id}`, { method: "DELETE" });
//     if (res.ok) load();
//   };

//   const downloadPdf = () => {
//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     doc.setFontSize(16);
//     doc.text("PawPal - Users", 40, 40);

//     const rows = (filtered ?? []).map((u, i) => [
//       i + 1,
//       u.name ?? "",
//       u.email ?? "",
//       u.role ?? "",
//       u.status ?? "",
//       u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
//     ]);

//     autoTable(doc, {
//       startY: 60,
//       head: [["#", "NAME", "EMAIL", "ROLE", "STATUS", "ADDED"]],
//       body: rows,
//       styles: { fontSize: 9, cellPadding: 6, halign: "left", valign: "middle" },
//       headStyles: { fillColor: [33, 33, 33], textColor: 255 },
//     });

//     doc.save("users.pdf");
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-semibold">Manage Users</h1>
//           <p className="text-sm text-gray-500">View, filter and manage all users</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={downloadPdf}
//             className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
//           >
//             Download PDF
//           </button>
//           <a href="/admin/dashboard" className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50">
//             Back to Dashboard
//           </a>
//           <Link to="/admin/users/new" className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm">
//             + Add User
//           </Link>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex gap-3 mb-3">
//         <input
//           className="flex-1 px-4 py-2 rounded-xl border"
//           placeholder="Search by name/email..."
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//         />
//         <select
//           className="px-3 py-2 rounded-xl border"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option>All</option>
//           <option>Admin</option>
//           <option>Shelter</option>
//           <option>Vet</option>
//           <option>Seeker</option>
//         </select>
//         <select
//           className="px-3 py-2 rounded-xl border"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option>All</option>
//           <option>Active</option>
//           <option>Invited</option>
//           <option>Suspended</option>
//         </select>
//         <select
//           className="px-3 py-2 rounded-xl border"
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//         >
//           <option value="name-asc">Name A→Z</option>
//           <option value="name-desc">Name Z→A</option>
//           <option value="added-desc">Added Newest</option>
//           <option value="added-asc">Added Oldest</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="rounded-2xl border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               {/* <th className="px-4 py-3 text-left w-20">PIC</th> */}
//               <th className="px-4 py-3 text-left">NAME</th>
//               <th className="px-4 py-3 text-left">EMAIL</th>
//               <th className="px-4 py-3 text-left">ROLE</th>
//               {/* <th className="px-4 py-3 text-left">STATUS</th> */}
//               <th className="px-4 py-3 text-left">ADDED</th>
//               <th className="px-4 py-3 text-left w-40">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr><td className="px-4 py-8 text-center" colSpan={7}>Loading…</td></tr>
//             )}
//             {!loading && filtered.length === 0 && (
//               <tr><td className="px-4 py-8 text-center text-gray-500" colSpan={7}>No users</td></tr>
//             )}

//             {!loading && filtered.map((u) => (
//               <tr key={u._id} className="border-t">
//                 {/* <td className="px-4 py-2">
//                   <button
//                     className="block rounded-xl overflow-hidden w-14 h-14 bg-gray-100"
//                     onClick={() => u.avatar && setPreviewSrc(u.avatar)}
//                     title="Click to preview"
//                   >
//                     {u.avatar ? (
//                       <img src={u.avatar} alt="" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full grid place-items-center text-xs text-gray-400">No Image</div>
//                     )}
//                   </button>
//                 </td> */}

//                 <td className="px-4 py-2 font-medium">{u.name ?? "-"}</td>
//                 <td className="px-4 py-2">{u.email ?? "-"}</td>
//                 <td className="px-4 py-2">{u.role ?? "-"}</td>

//                 {/* <td className="px-4 py-2">
//                   <span className={`px-2 py-1 rounded-full text-xs ${statusPill(u.status)}`}>
//                     {u.status ?? "-"}
//                   </span>
//                 </td> */}

//                 <td className="px-4 py-2">
//                   {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
//                 </td>

//                 <td className="px-4 py-2">
//                   <div className="flex gap-2">
//                     <Link
//                       to={`/admin/users/${u._id}/edit`}
//                       className="px-3 py-1 rounded-lg border hover:bg-gray-50"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(u._id)}
//                       className="px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {err && <p className="text-red-600 mt-3">{err}</p>}

//       {/* Image Preview Modal */}
//       {previewSrc && (
//         <div className="fixed inset-0 bg-black/60 grid place-items-center z-50" onClick={() => setPreviewSrc("")}>
//           <div className="bg-white rounded-2xl p-3 max-w-3xl w-[90vw]" onClick={(e) => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">Preview</h3>
//               <button className="px-3 py-1 rounded-lg border" onClick={() => setPreviewSrc("")}>Close</button>
//             </div>
//             <img src={previewSrc} alt="Preview" className="w-full max-h-[70vh] object-contain rounded-xl" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

const statusPill = (s) =>
  s === "Active"
    ? "bg-green-100 text-green-700"
    : s === "Suspended"
    ? "bg-red-100 text-red-700"
    : s === "Invited"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-gray-100 text-gray-700";

export default function UserList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("name-asc");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  // Fetch with current params
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (role !== "All") params.set("role", role);
      if (status !== "All") params.set("status", status);
      if (sort) params.set("sort", sort);

      const res = await fetch(`${API_BASE}/api/auth/users?${params.toString()}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setErr("");
    } catch (e) {
      console.error(e);
      setErr("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [q, role, status, sort]);

  useEffect(() => {
    load();
  }, [load]);

  // Client-side filter/sort (case-insensitive search incl. role)
  const filtered = useMemo(() => {
    let arr = [...items];

    const qn = q.trim().toLowerCase();
    if (qn) {
      arr = arr.filter((u) =>
        [u?.name, u?.email, u?.role].some((f) =>
          (f ?? "").toString().toLowerCase().includes(qn)
        )
      );
    }

    if (role !== "All") {
      arr = arr.filter(
        (u) => (u.role ?? "").toLowerCase() === role.toLowerCase()
      );
    }

    if (status !== "All") {
      arr = arr.filter(
        (u) => (u.status ?? "").toLowerCase() === status.toLowerCase()
      );
    }

    switch (sort) {
      case "name-asc":
        arr.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;
      case "name-desc":
        arr.sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
        break;
      case "added-desc":
        arr.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      case "added-asc":
        arr.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
        break;
      default:
        break;
    }

    return arr;
  }, [items, q, role, status, sort]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
      method: "DELETE",
    });
    if (res.ok) load();
  };

  ///
 const downloadPdf = () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const marginX = 40;
  let y = 44;

  // ===== Brand: PAWPAL+ (two colors, bold) =======================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);

  // "PAWPAL"
  doc.setTextColor(27, 94, 160); // blue-ish
  const brandText = "PAWPAL";
  doc.text(brandText, marginX, y);

  // "+"
  const brandWidth = doc.getTextWidth(brandText + " ");
  doc.setTextColor(255, 87, 34); // orange
  doc.text("+", marginX + brandWidth, y);

  // Optional light subtitle (e.g., date or tagline)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(110);
  const today = new Date();
  const monthYear = today.toLocaleString(undefined, { month: "long", year: "numeric" });
  doc.text(`Generated ${today.toLocaleDateString()}`, marginX, y + 18);

  // ===== Report title ============================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30);
  y += 46; // gap below brand block
  doc.text(`User Report — ${monthYear}`, marginX, y);

  // ===== Filter line (like your sample) ==========================
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(130);
  const filtersLabel =
    `Filters: ${role === "All" && status === "All" && !q?.trim() ? "None" : [
      q?.trim() ? `Query="${q.trim()}"` : null,
      role !== "All" ? `Role: ${role}` : null,
      status !== "All" ? `Status: ${status}` : null
    ].filter(Boolean).join(" | ") || "None"}  |  Sort By: ${sort.replace("-", ": ").toUpperCase()}`;
  doc.text(filtersLabel, marginX, y + 18);

  // ===== Table ====================================================
  const startTableY = y + 32;

  const rows = (filtered ?? []).map((u, i) => [
    i + 1,
    u.name ?? "",
    u.email ?? "",
    (u.role ?? "").toString(),
    u.status ?? "",
    u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
  ]);

  autoTable(doc, {
    startY: startTableY,
    head: [["#", "NAME", "EMAIL", "ROLE", "STATUS", "ADDED"]],
    body: rows,
    styles: { fontSize: 9, cellPadding: 6, halign: "left", valign: "middle" },
    headStyles: { fillColor: [33, 33, 33], textColor: 255 },
    alternateRowStyles: { fillColor: [246, 246, 246] },
    margin: { left: marginX, right: marginX },
    didDrawPage: () => {
      // footer with page number
      const page = doc.internal.getNumberOfPages();
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(140);
      doc.text(`Page ${page}`, pw - marginX, ph - 20, { align: "right" });
    },
  });

  doc.save("users.pdf");
};


  ///
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <p className="text-sm text-gray-500">View, filter and manage all users</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={downloadPdf}
            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Download PDF
          </button>
          <a
            href="/admin/dashboard"
            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Back to Dashboard
          </a>
          <Link
            to="/admin/users/new"
            className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm"
          >
            + Add User
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-3">
        <input
          className="flex-1 px-4 py-2 rounded-xl border"
          placeholder="Search by name/email/role..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded-xl border"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>All</option>
          <option>Admin</option>
          <option>Shelter</option>
          <option>Vet</option>
          <option>Seeker</option>
        </select>
        <select
          className="px-3 py-2 rounded-xl border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Invited</option>
          <option>Suspended</option>
        </select>
        <select
          className="px-3 py-2 rounded-xl border"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
          <option value="added-desc">Added Newest</option>
          <option value="added-asc">Added Oldest</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">NAME</th>
              <th className="px-4 py-3 text-left">EMAIL</th>
              <th className="px-4 py-3 text-left">ROLE</th>
              <th className="px-4 py-3 text-left">STATUS</th>
              <th className="px-4 py-3 text-left">ADDED</th>
              <th className="px-4 py-3 text-left w-40">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-8 text-center" colSpan={7}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={7}>
                  No users
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="px-4 py-2 font-medium">{u.name ?? "-"}</td>
                  <td className="px-4 py-2">{u.email ?? "-"}</td>
                  <td className="px-4 py-2">{u.role ?? "-"}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusPill(u.status)}`}>
                      {u.status ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/users/${u._id}/edit`}
                        className="px-3 py-1 rounded-lg border hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {err && <p className="text-red-600 mt-3">{err}</p>}

      {/* Image Preview Modal */}
      {previewSrc && (
        <div
          className="fixed inset-0 bg-black/60 grid place-items-center z-50"
          onClick={() => setPreviewSrc("")}
        >
          <div
            className="bg-white rounded-2xl p-3 max-w-3xl w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Preview</h3>
              <button className="px-3 py-1 rounded-lg border" onClick={() => setPreviewSrc("")}>
                Close
              </button>
            </div>
            <img
              src={previewSrc}
              alt="Preview"
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
