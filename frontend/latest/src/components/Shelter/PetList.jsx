// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { API_BASE } from "../../config";
// import { useAuth } from "../../context/AuthContext";

// export default function PetList() {
//   const { token } = useAuth();
//   const [pets, setPets] = useState([]);
//   const [err, setErr] = useState("");

//   const auth = token ? { Authorization: `Bearer ${token}` } : {};

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setErr("");
// //         const res = await fetch(`${API_BASE}/api/pets`, { headers: auth });
// //         if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //         const data = await res.json();
// //         setPets(data);
// //       } catch (e) {
// //         console.error(e);
// //         setErr("Failed to load pets");
// //       }
// //     })();
// //   }, []);


// useEffect(() => {
//   (async () => {
//     try {
//       setErr("");
//       const auth = token ? { Authorization: `Bearer ${token}` } : {};
//       const res = await fetch(`${API_BASE}/api/pets`, {
//         headers: auth,
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       setPets(data);
//     } catch (e) {
//       console.error(e);
//       setErr("Failed to load pets");
//     }
//   })();
// }, [token]);




//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold">Pets</h1>
//         <Link
//           to="/shelter/pets/new"
//           className="rounded-lg bg-orange-500 px-4 py-2 text-white"
//         >
//           + Add New Pet
//         </Link>
//       </div>

//       {err && <p className="text-red-500">{err}</p>}

//       {pets.length === 0 ? (
//         <p>No pets found.</p>
//       ) : (
//         <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {pets.map((p) => (
//             <li
//               key={p._id}
//               className="border rounded-lg p-3 hover:shadow transition"
//             >
//               {p.imageUrl && (
//                 <img
//                   src={
//                     p.imageUrl.startsWith("http")
//                       ? p.imageUrl
//                       : `${API_BASE}${p.imageUrl}`
//                   }
//                   alt={p.name}
//                   className="h-40 w-full object-cover rounded"
//                 />
//               )}
//               <h3 className="text-lg font-bold">{p.name}</h3>
//               <p className="text-sm text-gray-600">
//                 {p.breed || "—"} • {p.gender || "—"} • {p.age ?? "—"} yrs
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// src/components/Shelter/PetList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "";

export default function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Name A→Z");
  const [error, setError] = useState("");

  // Load data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/pets`);
        const data = await res.json();
        setPets(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load pets");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Derived view
  const rows = useMemo(() => {
    let list = [...pets];
    const query = q.trim().toLowerCase();

    if (query) {
      list = list.filter((p) =>
        `${p.name} ${p.breed} ${p.gender}`.toLowerCase().includes(query)
      );
    }
    if (status !== "All") list = list.filter((p) => p.status === status);

    switch (sort) {
      case "Age Low→High":
        list.sort((a, b) => (a.age ?? 0) - (b.age ?? 0));
        break;
      case "Age High→Low":
        list.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
        break;
      case "Name Z→A":
        list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    return list;
  }, [pets, q, status, sort]);

  async function onDelete(id) {
    if (!confirm("Delete this pet?")) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/pets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
      setError("Could not delete pet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Manage Pets</h1>
          <p className="text-xs text-gray-500">View, filter and manage all pets</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 sm:block">
            Download PDF
          </button>
          <Link
            to="/shelter/pets/new"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700"
          >
            + Add Pet
          </Link>
        </div>
      </div>

      {/* Filters */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <input
          placeholder="Search by name/breed…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="sm:col-span-2 rounded-lg border px-3 py-2 focus:ring"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border px-3 py-2 focus:ring"
        >
          <option>All</option>
          <option>Available</option>
          <option>Pending</option>
          <option>Adopted</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border px-3 py-2 focus:ring"
        >
          <option>Name A→Z</option>
          <option>Name Z→A</option>
          <option>Age Low→High</option>
          <option>Age High→Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <Th>Pic</Th>
                <Th>Code</Th>
                <Th>Name</Th>
                <Th>Breed</Th>
                <Th>Status</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Added</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-sm text-gray-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-sm text-gray-500">
                    No pets found
                  </td>
                </tr>
              )}
              {rows.map((p, i) => (
                <tr key={p._id || i} className="hover:bg-gray-50/60">
                  <Td>
                    <div className="h-10 w-12 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  </Td>
                  <Td className="text-xs text-gray-500">#{(p._id || "").slice(-6)}</Td>
                  <Td className="font-medium">{p.name}</Td>
                  <Td>{p.breed || "—"}</Td>
                  <Td>
                    <Badge
                      color={
                        p.status === "Available"
                          ? "green"
                          : p.status === "Pending"
                          ? "amber"
                          : "gray"
                      }
                    >
                      {p.status || "—"}
                    </Badge>
                  </Td>
                  <Td>{p.age ?? "—"}</Td>
                  <Td>{p.gender || "—"}</Td>
                  <Td className="text-xs text-gray-500">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/shelter/pets/${p._id}/edit`}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(p._id)}
                        className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* tiny table helpers */
function Th({ children, className = "" }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-sm text-gray-700 ${className}`}>{children}</td>;
}
function Badge({ color = "gray", children }) {
  const map = {
    green: "bg-green-50 text-green-700 ring-green-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ring-1 ${map[color]}`}>{children}</span>;
}
