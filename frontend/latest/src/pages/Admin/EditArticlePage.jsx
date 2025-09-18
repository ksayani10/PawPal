import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "";

export default function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    code: "",
    category: "",
    author: "",
    status: "Published", // Published | Draft | Archived (adjust if you use different)
    summary: "",
    body: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing article
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // Prefer GET /api/articles/:id; fallback to /api/articles and find
        let data;
        let res = await fetch(`${API_BASE}/api/articles/${id}`);
        if (res.ok) {
          data = await res.json();
        } else {
          const all = await (await fetch(`${API_BASE}/api/articles`)).json();
          data = Array.isArray(all) ? all.find(a => a._id === id) : null;
        }
        if (!data) throw new Error("Article not found");

        setForm({
          title: data.title || "",
          code: data.code || data.slug || "",
          category: data.category || "",
          author: data.author || "",
          status: data.status || "Published",
          summary: data.summary || "",
          body: data.body || data.content || "",
          imageUrl: data.imageUrl || data.coverImage || "",
        });
        setPreview(data.imageUrl || data.coverImage || "");
      } catch (e) {
        console.error(e);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function onPickFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const fd = new FormData();

      // send fields (backend will ignore unknowns)
      Object.entries({
        title: form.title,
        code: form.code,
        category: form.category,
        author: form.author,
        status: form.status,
        summary: form.summary,
        body: form.body,
      }).forEach(([k, v]) => fd.append(k, v ?? ""));

      // only send new file if chosen
      if (file) fd.append("image", file);

      const res = await fetch(`${API_BASE}/api/articles/${id}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) throw new Error("Update failed");

      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
      setError("Could not update article");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6 text-sm text-gray-600">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit Article</h1>
          <p className="text-xs text-gray-500">Update article details</p>
        </div>
        <Link to="/admin/articles" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
          Back to list
        </Link>
      </div>

      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <TextInput label="Code (slug)" value={form.code} onChange={(v) => setForm({ ...form, code: v })} />
          <TextInput label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <TextInput label="Author" value={form.author} onChange={(v) => setForm({ ...form, author: v })} />

          <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </Select>

          <TextInput
            label="Summary"
            value={form.summary}
            onChange={(v) => setForm({ ...form, summary: v })}
          />
        </div>

        <label className="space-y-1 block">
          <span className="text-xs font-medium text-gray-600">Body</span>
          <textarea
            rows={8}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
          />
        </label>

        <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 hover:bg-gray-50">
          <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">No image</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Change cover image (optional)</div>
            <div className="text-xs text-gray-500">PNG/JPG up to ~5MB</div>
          </div>
          <input type="file" accept="image/*" onChange={onPickFile} className="absolute inset-0 opacity-0" />
        </label>

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/articles" className="rounded-xl border px-5 py-2 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function TextInput({ label, value, onChange, required, type = "text" }) {
  return (
    <label className="space-y-1 block">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
      />
    </label>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="space-y-1 block">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
      >
        {children}
      </select>
    </label>
  );
}
