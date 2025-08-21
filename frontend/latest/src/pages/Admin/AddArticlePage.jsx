import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";

const EMPTY = {
  title: "",
  category: "",
  author: "",
  status: "Draft",
  content: "",
};

export default function AddArticlePage() {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onChange = (e) =>   setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.title.trim()) {
      setErr("Title is required");
      return;
    }
    try {
      setSaving(true);
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file); // field name must match backend upload.single("image")

      const res = await fetch(`${API_BASE}/api/articles`, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || `Failed with ${res.status}`);
      }
      nav("/admin/articles");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Add New Article</h1>
          <p className="text-sm text-gray-500">Create a new pet care article</p>
        </div>
        <Link
          to="/admin/articles"
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
        >
          Back to list
        </Link>
      </div>

      <form onSubmit={submit} className="bg-white rounded-2xl border p-5">
        {/* grid inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-xl border"
              placeholder="e.g., Puppy Vaccination Basics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-xl border"
              placeholder="Training, Health, Nutrition…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-xl border"
              placeholder="Dr. Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-xl border"
            >
              <option>Draft</option>
              {/* <option>Pending</option> */}
              <option>Published</option>
            </select>
          </div>
        </div>

        {/* body */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Content</label>
           <textarea name="content" value={form.content} onChange={onChange}
            rows={6}
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Write the article content here…"
          />
        </div>

        {/* image upload box */}
        <div className="mt-6 border rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-36 h-28 rounded-xl bg-gray-50 grid place-items-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-gray-400">No image</span>
              )}
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium">Upload image</div>
              <div className="text-xs text-gray-500 mb-2">PNG/JPG up to ~5MB</div>
              <input
                type="file"
                accept="image/*"
                onChange={onFile}
                className="block text-sm"
              />
            </div>
          </div>
        </div>

        {err && <p className="text-red-600 mt-3">{err}</p>}

        {/* actions */}
        <div className="mt-6 flex items-center gap-3 justify-end">
          <Link to="/articles" className="px-5 py-2 rounded-xl border">
            Cancel
          </Link>
          <button
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-orange-500 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
