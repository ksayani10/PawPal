// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_BASE } from "../../config";
// import { useAuth } from "../../context/AuthContext";

// export default function AddPetForm() {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     breed: "",
//     age: "",
//     gender: "",
//     status: "Available",
//     vaccinations: "",
//   });
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [err, setErr] = useState("");

//   const onChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const onFile = (e) => {
//     const f = e.target.files?.[0];
//     setFile(f || null);
//     setPreview(f ? URL.createObjectURL(f) : "");
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       setErr("");

//       const fd = new FormData();
//       Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//       if (file) fd.append("image", file);

//       const res = await fetch(`${API_BASE}/api/pets`, {
//         method: "POST",
//         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         body: fd,
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       navigate("/shelter/pets");
//     } catch (error) {
//       console.error(error);
//       setErr("Failed to save pet");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <form onSubmit={submit} className="space-y-4">
//       {err && <p className="text-red-500">{err}</p>}

//       <input
//         name="name"
//         placeholder="Pet name"
//         value={form.name}
//         onChange={onChange}
//         required
//         className="border rounded px-3 py-2 w-full"
//       />
//       <input
//         name="breed"
//         placeholder="Breed"
//         value={form.breed}
//         onChange={onChange}
//         className="border rounded px-3 py-2 w-full"
//       />
//       <input
//         name="age"
//         type="number"
//         placeholder="Age"
//         value={form.age}
//         onChange={onChange}
//         className="border rounded px-3 py-2 w-full"
//       />
//       <input
//         name="gender"
//         placeholder="Gender"
//         value={form.gender}
//         onChange={onChange}
//         className="border rounded px-3 py-2 w-full"
//       />
//       <select
//         name="status"
//         value={form.status}
//         onChange={onChange}
//         className="border rounded px-3 py-2 w-full"
//       >
//         <option value="Available">Available</option>
//         <option value="Adopted">pending</option>
//         {/* <option value="Available">free to Adopt</option>
//         <option value="Available">dead</option>
//         <option value="Available">Under Treatment</option> */}
//       </select>
//       <input
//         name="vaccinations"
//         placeholder="Vaccinations (comma separated)"
//         value={form.vaccinations}
//         onChange={onChange}
//         className="border rounded px-3 py-2 w-full"
//       />

//       <input type="file" accept="image/*" onChange={onFile} />
//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//           className="h-24 w-24 object-cover rounded border"
//         />
//       )}

//       <button
//         type="submit"
//         disabled={saving}
//         className="bg-orange-500 text-white px-4 py-2 rounded hover:opacity-90"
//       >
//         {saving ? "Saving..." : "Save Pet"}
//       </button>
//     </form>
//   );
// }


// src/pages/AddPetPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Use your env var if present; otherwise empty prefix.
const API_BASE = import.meta?.env?.VITE_API_BASE || "";

export default function AddPetPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    status: "Available",
    vaccinations: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);

      const res = await fetch(`${API_BASE}/api/pets`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Save failed");

      navigate("/shelter/pets"); // back to list
    } catch (err) {
      console.error(err);
      setError("Could not save pet");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Add Pet</h1>
          <p className="text-xs text-gray-500">Create a new pet profile</p>
        </div>
        <Link
          to="/shelter/pets"
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Back to list
        </Link>
      </div>

      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput
            label="Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />
          <TextInput
            label="Breed"
            value={form.breed}
            onChange={(v) => setForm({ ...form, breed: v })}
          />
          <TextInput
            label="Age"
            type="number"
            value={form.age}
            onChange={(v) => setForm({ ...form, age: v })}
          />
          <TextInput
            label="Gender"
            value={form.gender}
            onChange={(v) => setForm({ ...form, gender: v })}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v })}
          >
            <option>Available</option>
            <option>Pending</option>
            <option>Adopted</option>
          </Select>
          <TextInput
            label="Vaccinations (comma separated)"
            value={form.vaccinations}
            onChange={(v) =>
              setForm({ ...form, vaccinations: v })
            }
          />
        </div>

        <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 hover:bg-gray-50">
          <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Upload image</div>
            <div className="text-xs text-gray-500">PNG/JPG up to ~5MB</div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onPickFile}
            className="absolute inset-0 opacity-0"
          />
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
            {saving ? "Saving…" : "Save"}
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
