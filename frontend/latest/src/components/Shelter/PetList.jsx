



import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuth } from "../../context/AuthContext";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";
const api = (p) => `${API_BASE}${p}`;
const isAbs = (u = "") => /^https?:\/\//i.test(u);
const imgSrc = (u = "") => (u ? (isAbs(u) ? u : api(u)) : "/assets/placeholder-pet.jpg");

export default function PetList() {
  const { token } = useAuth();
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

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
        setError("");
        setLoading(true);
        const res = await fetch(api("/api/pets"), { headers: auth });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPets(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load pets");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]); // refetch when auth changes

  // Derived rows
  const rows = useMemo(() => {
    let list = [...pets];
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((p) =>
        `${p.name ?? ""} ${p.breed ?? ""} ${p.gender ?? ""}`.toLowerCase().includes(query)
      );
    }
    const norm = (s) => (s || "Available");
    if (status !== "All") list = list.filter((p) => norm(p.status) === status);

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
    const backup = pets;
    setPets((prev) => prev.filter((p) => p._id !== id)); // optimistic
    try {
      const res = await fetch(api(`/api/pets/${id}`), { method: "DELETE", headers: auth });
      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      console.error(e);
      setError("Could not delete pet");
      setPets(backup); // rollback
    }
  }

  // PDF export
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.text("Pet List", 40, 30);

    const head = [["Code", "Name", "Breed", "Status", "Age", "Gender", "Added"]];
    const body = rows.map((p) => [
      `#${(p._id || "").slice(-6)}`,
      p.name || "—",
      p.breed || "—",
      p.status || "—",
      p.age ?? "—",
      p.gender || "—",
      p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—",
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 50,
      styles: { fontSize: 9, cellPadding: 6 },
      headStyles: { fillColor: [243, 244, 246], textColor: 0 },
      margin: { left: 40, right: 40 },
    });

    doc.save("pet_list.pdf");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Manage Pets</h1>
          <p className="text-xs text-gray-500">View, filter and manage all pets</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPDF}
            className="hidden sm:inline-flex rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
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
                      <img src={imgSrc(p.imageUrl)} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                  </Td>
                  <Td className="text-xs text-gray-500">#{(p._id || "").slice(-6)}</Td>
                  <Td className="font-medium">{p.name}</Td>
                  <Td>{p.breed || "—"}</Td>
                  <Td>
                    <Badge
                      color={
                        (p.status || "Available") === "Available"
                          ? "green"
                          : (p.status || "") === "Pending"
                          ? "amber"
                          : "gray"
                      }
                    >
                      {p.status || "Available"}
                    </Badge>
                  </Td>
                  <Td>{p.age ?? "—"}</Td>
                  <Td className="capitalize">{p.gender || "—"}</Td>
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


