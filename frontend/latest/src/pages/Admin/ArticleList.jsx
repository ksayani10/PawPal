import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

const statusPill = (s) =>
  s === "Published" ? "bg-green-100 text-green-700"
    : s === "Pending" ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

export default function ArticleList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("title-asc");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");


  // const load = async () => {
  //   try {
  //     setLoading(true);
  //     const params = new URLSearchParams({ q, status, sort });
  //     const res = await fetch(`${API_BASE}/api/articles?${params.toString()}`);
  //     const data = await res.json();
  //     setItems(Array.isArray(data) ? data : []);
  //   } catch (e) {
  //     console.error(e);
  //     setErr("Failed to load articles");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, status, sort]);

  // const filtered = useMemo(() => items, [items]);

const load = async () => {
  try {
    setLoading(true);

    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status !== "All") params.set("status", status); // ✅ only add when not "All"
    if (sort) params.set("sort", sort);

    const res = await fetch(`${API_BASE}/api/articles?${params.toString()}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  } catch (e) {
    console.error(e);
    setErr("Failed to load articles");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [q, status, sort]);

const filtered = useMemo(() => items, [items]);


  const handleDelete = async (id) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`${API_BASE}/api/articles/${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  const downloadPdf = () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const marginX = 40;
  let y = 44;

  // ===== Brand: PAWPAL+ ==========================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(27, 94, 160); // blue
  const brand = "PAWPAL";
  doc.text(brand, marginX, y);
  const brandW = doc.getTextWidth(brand + " ");
  doc.setTextColor(255, 87, 34); // orange
  doc.text("+", marginX + brandW, y);

  // Generated date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(110);
  doc.text(`Generated ${new Date().toLocaleDateString()}`, marginX, y + 18);

  // ===== Report title ============================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30);
  const monthYear = new Date().toLocaleString(undefined, { month: "long", year: "numeric" });
  y += 46;
  doc.text(`Article Report — ${monthYear}`, marginX, y);

  // ===== Filters line ============================================
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(130);
  const sortLabel = sort ? sort.replace("-", ": ").toUpperCase() : "TITLE: ASC";
  const filters =
    `Filters: ${
      (!q?.trim() && status === "All") ? "None" :
      [q?.trim() ? `Query="${q.trim()}"` : null, status !== "All" ? `Status: ${status}` : null]
        .filter(Boolean)
        .join(" | ")
    }  |  Sort By: ${sortLabel}`;
  doc.text(filters, marginX, y + 18);

  // ===== Table ====================================================
  const startTableY = y + 32;

  const rows = (filtered ?? []).map((a, i) => [
    i + 1,
    a.code || "",
    a.title || "",
    a.category || "",
    a.status || "",
    a.author || "",
    a?.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
  ]);

  autoTable(doc, {
    startY: startTableY,
    head: [["#", "CODE", "TITLE", "CATEGORY", "STATUS", "AUTHOR", "ADDED"]],
    body: rows,
    margin: { left: marginX, right: marginX },
    styles: { fontSize: 9, cellPadding: 6, halign: "left", valign: "middle" },
    headStyles: { fillColor: [33, 33, 33], textColor: 255 },
    alternateRowStyles: { fillColor: [246, 246, 246] },
    // Color the STATUS column (index 4) based on value
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 4) {
        const v = String(data.cell.raw || "").toLowerCase();
        if (v === "published") {
          data.cell.styles.textColor = [21, 128, 61]; // green-700
        } else if (v === "pending") {
          data.cell.styles.textColor = [180, 83, 9];  // amber-700
        } else if (v === "draft") {
          data.cell.styles.textColor = [55, 65, 81];  // gray-700
        }
      }
    },
    didDrawPage: () => {
      const page = doc.internal.getNumberOfPages();
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(140);
      doc.text(`Page ${page}`, pw - marginX, ph - 20, { align: "right" });
    },
  });

  doc.save("articles.pdf");
};


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Manage Articles</h1>
          <p className="text-sm text-gray-500">View, filter and manage all articles</p>
        </div>
        
        <div className="flex gap-3">
          <button type="button"
            onClick={downloadPdf}
            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Download PDF
          </button>
          <a href="/admin/dashboard" className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50">
            Back to Dashboard
          </a>
          <a href="/articles/new" className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm">
            + Add Article
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-3">
        <input
          className="flex-1 px-4 py-2 rounded-xl border"
          placeholder="Search by title/author/category..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded-xl border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Draft</option>
          <option>Pending</option>
          <option>Published</option>
        </select>
        <select
          className="px-3 py-2 rounded-xl border"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="title-asc">Name A→Z</option>
          <option value="title-desc">Name Z→A</option>
          <option value="added-desc">Added Newest</option>
          <option value="added-asc">Added Oldest</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left w-20">PIC</th>
              <th className="px-4 py-3 text-left">CODE</th>
              <th className="px-4 py-3 text-left">TITLE</th>
              <th className="px-4 py-3 text-left">CATEGORY</th>
              <th className="px-4 py-3 text-left">STATUS</th>
              <th className="px-4 py-3 text-left">AUTHOR</th>
              <th className="px-4 py-3 text-left">ADDED</th>
              <th className="px-4 py-3 text-left w-40">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="px-4 py-8 text-center" colSpan={8}>Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td className="px-4 py-8 text-center text-gray-500" colSpan={8}>No articles</td></tr>
            )}
            {!loading && filtered.map((a) => (

              <tr key={a._id} className="border-t">

                <td className="px-4 py-2">
                  <button
                    className="block rounded-xl overflow-hidden w-14 h-14 bg-gray-100"
                    onClick={() => a.image && setPreviewSrc(a.image)}
                    title="Click to preview"
                  >
                    {a.image ? (
                      <img src={a.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-xs text-gray-400">No Image</div>
                    )}
                  </button>
                </td>
                <td className="px-4 py-2 text-gray-500">{a.code || "-"}</td>
                <td className="px-4 py-2 font-medium">{a.title}</td>
                <td className="px-4 py-2">{a.category || "-"}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusPill(a.status)}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-2">{a.author || "-"}</td>
                <td className="px-4 py-2">{new Date(a.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <a
                      href={`/articles/edit/${a._id}`}
                      className="px-3 py-1 rounded-lg border hover:bg-gray-50"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(a._id)}
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
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50" onClick={() => setPreviewSrc("")}>
          <div className="bg-white rounded-2xl p-3 max-w-3xl w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Preview</h3>
              <button className="px-3 py-1 rounded-lg border" onClick={() => setPreviewSrc("")}>Close</button>
            </div>
            <img src={previewSrc} alt="Preview" className="w-full max-h-[70vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
