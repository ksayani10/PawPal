import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import { useAuth } from "../../context/AuthContext";

const EMPTY = { title: "", excerpt: "", content: "", tags: "", status: "draft", coverImageUrl: "" };

export default function AdminArticles() {
  const { token } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const hdrs = useMemo(() => (token ? { Authorization: `Bearer ${token}`, "Content-Type":"application/json" } : {}), [token]);

  const load = async (p = 1) => {
    setLoading(true);
    const url = new URL(`${API_BASE}/api/admin/articles`);
    if (q) url.searchParams.set("q", q);
    if (status) url.searchParams.set("status", status);
    url.searchParams.set("page", String(p));
    url.searchParams.set("limit", "10");

    const res = await fetch(url, { headers: hdrs });
    if (res.status === 401 || res.status === 403) return nav("/login");
    const data = await res.json();
    setItems(data.items || []);
    setPage(data.page || 1);
    setPages(data.pages || 1);
    setLoading(false);
  };

  useEffect(() => { load(1); /* eslint-disable-next-line */ }, [q, status]);

  const resetForm = () => { setForm(EMPTY); setEditingId(null); };

  const save = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = `${API_BASE}/api/admin/articles${editingId ? "/" + editingId : ""}`;
    const body = {
      ...form,
      tags: form.tags ? form.tags.split(",").map(s => s.trim()).filter(Boolean) : [],
    };
    const res = await fetch(url, { method, headers: hdrs, body: JSON.stringify(body) });
    if (res.ok) { resetForm(); load(page); }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      tags: (item.tags || []).join(", "),
      status: item.status || "draft",
      coverImageUrl: item.coverImageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`${API_BASE}/api/admin/articles/${id}`, { method: "DELETE", headers: hdrs });
    if (res.ok) load(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Articles</h1>

        {/* Create / Edit form */}
        <form onSubmit={save} className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded-lg p-2" placeholder="Title" required
            value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          <select className="border rounded-lg p-2" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <input className="border rounded-lg p-2 md:col-span-2" placeholder="Cover image URL"
            value={form.coverImageUrl} onChange={e=>setForm(f=>({...f,coverImageUrl:e.target.value}))} />
          <input className="border rounded-lg p-2 md:col-span-2" placeholder="Excerpt"
            value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))} />
          <textarea className="border rounded-lg p-2 md:col-span-2 min-h-[160px]" placeholder="Content (markdown or text)"
            value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} />
          <input className="border rounded-lg p-2 md:col-span-2" placeholder="Tags (comma separated)"
            value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} />

          <div className="md:col-span-2 flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700">
              {editingId ? "Update Article" : "Create Article"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input className="border rounded-lg p-2" placeholder="Search title…" value={q} onChange={e=>setQ(e.target.value)} />
          <select className="border rounded-lg p-2" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button onClick={()=>load(1)} className="px-3 py-2 rounded-lg bg-gray-900 text-white">Refresh</button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Updated</th>
                <th className="p-3">Tags</th>
                <th className="p-3 w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-4" colSpan={5}>Loading…</td></tr>
              ) : items.length === 0 ? (
                <tr><td className="p-4" colSpan={5}>No articles</td></tr>
              ) : items.map((a)=>(
                <tr key={a._id} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.excerpt}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${a.status==="published"?"bg-green-100 text-green-700":"bg-yellow-100 text-yellow-700"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{new Date(a.updatedAt || a.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-sm text-gray-600">{(a.tags||[]).join(", ")}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={()=>edit(a)} className="px-3 py-1 rounded bg-blue-600 text-white">Edit</button>
                      <button onClick={()=>remove(a._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex gap-2 mt-4">
            <button disabled={page<=1} onClick={()=>{ setPage(p=>p-1); load(page-1); }} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
            <div className="px-3 py-1">{page} / {pages}</div>
            <button disabled={page>=pages} onClick={()=>{ setPage(p=>p+1); load(page+1); }} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
