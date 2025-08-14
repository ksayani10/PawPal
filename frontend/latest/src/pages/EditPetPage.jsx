import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "";

export default function EditPetPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    status: "Available",
    vaccinations: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing pet
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Prefer GET /api/pets/:id; fallback to /api/pets and find
        let data;
        let res = await fetch(`${API_BASE}/api/pets/${id}`);
        if (res.ok) {
          data = await res.json();
        } else {
          const all = await (await fetch(`${API_BASE}/api/pets`)).json();
          data = Array.isArray(all) ? all.find(p => p._id === id) : null;
        }
        if (!data) throw new Error("Pet not found");

        setForm({
          name: data.name || "",
          breed: data.breed || "",
          age: data.age ?? "",
          gender: data.gender || "",
          status: data.status || "Available",
          vaccinations: Array.isArray(data.vaccinations)
            ? data.vaccinations.join(", ")
            : data.vaccinations || "",
          imageUrl: data.imageUrl || "",
        });
        setPreview(data.imageUrl || "");
      } catch (e) {
        console.error(e);
        setError("Failed to load pet");
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
      // send fields
      Object.entries({
        name: form.name,
        breed: form.breed,
        age: form.age,
        gender: form.gender,
        status: form.status,
        vaccinations: form.vaccinations,
      }).forEach(([k, v]) => fd.append(k, v));

      // only send new file if chosen
      if (file) fd.append("image", file);

      const res = await fetch(`${API_BASE}/api/pets/${id}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) throw new Error("Update failed");

      navigate("/shelter/pets");
    } catch (err) {
      console.error(err);
      setError("Could not update pet");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-sm text-gray-600">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit Pet</h1>
          <p className="text-xs text-gray-500">Update pet details</p>
        </div>
        <Link to="/shelter/pets" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
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
          <TextInput label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <TextInput label="Breed" value={form.breed} onChange={(v) => setForm({ ...form, breed: v })} />
          <TextInput label="Age" type="number" value={form.age} onChange={(v) => setForm({ ...form, age: v })} />
          <TextInput label="Gender" value={form.gender} onChange={(v) => setForm({ ...form, gender: v })} />
          <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
            <option>Available</option>
            <option>Pending</option>
            <option>Adopted</option>
          </Select>
          <TextInput
            label="Vaccinations (comma separated)"
            value={form.vaccinations}
            onChange={(v) => setForm({ ...form, vaccinations: v })}
          />
        </div>

        <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 hover:bg-gray-50">
          <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">No image</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Change image (optional)</div>
            <div className="text-xs text-gray-500">PNG/JPG up to ~5MB</div>
          </div>
          <input type="file" accept="image/*" onChange={onPickFile} className="absolute inset-0 opacity-0" />
        </label>

        <div className="flex items-center justify-end gap-3">
          <Link to="/shelter/pets" className="rounded-xl border px-5 py-2 text-sm">
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
    <label className="space-y-1">
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
    <label className="space-y-1">
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
