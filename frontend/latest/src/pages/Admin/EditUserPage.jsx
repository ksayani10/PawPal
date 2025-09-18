// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

// const ROLES = ["Admin", "Shelter", "Vet", "Seeker"];
// const STATUSES = ["Active", "Invited", "Suspended"];

// export default function EditUserPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "Seeker",
//     status: "Active",
//     phone: "",
//     avatarUrl: "", // existing avatar path/url from backend
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // Load existing user
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         let data;
//         let res = await fetch(`${API_BASE}/api/auth/users/${id}`);
//         if (res.ok) {
//           data = await res.json();
//         } else {
//           // fallback: GET all then find
//           const all = await (await fetch(`${API_BASE}/api/auth/users`)).json();
//           data = Array.isArray(all) ? all.find(u => u._id === id) : null;
//         }
//         if (!data) throw new Error("User not found");

//         setForm({
//           name: data.name || "",
//           email: data.email || "",
//           role: data.role || "Seeker",
//           status: data.status || "Active",
//           phone: data.phone || "",
//           avatarUrl: data.avatar || data.avatarUrl || "",
//         });
//         setPreview(data.avatar || data.avatarUrl || "");
//       } catch (e) {
//         console.error(e);
//         setError("Failed to load user");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   function onPickFile(e) {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setError("");
//     try {
//       setSaving(true);
//       const fd = new FormData();

//       Object.entries({
//         name: form.name,
//         email: form.email,
//         role: form.role,
//         status: form.status,
//         phone: form.phone,
//       }).forEach(([k, v]) => fd.append(k, v ?? ""));

//       if (file) fd.append("avatar", file); // server should expect field name "avatar"

//       const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
//         method: "PUT",
//         body: fd,
//       });
//       if (!res.ok) throw new Error("Update failed");

//       navigate("/admin/users");
//     } catch (err) {
//       console.error(err);
//       setError("Could not update user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <div className="p-6 text-sm text-gray-600">Loading…</div>;

//   return (
//     <div className="mx-auto max-w-3xl p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Edit User</h1>
//           <p className="text-xs text-gray-500">Update user details</p>
//         </div>
//         <Link to="/admin/users" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
//           Back to list
//         </Link>
//       </div>

//       {error && (
//         <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <TextInput label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
//           <TextInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
//           <Select label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })}>
//             {ROLES.map(r => <option key={r}>{r}</option>)}
//           </Select>
//           <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
//             {STATUSES.map(s => <option key={s}>{s}</option>)}
//           </Select>
//           <TextInput label="Phone (optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
//         </div>

//         <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 hover:bg-gray-50">
//           <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
//             {preview ? (
//               <img src={preview} alt="avatar preview" className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">No image</div>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-medium">Change avatar (optional)</div>
//             <div className="text-xs text-gray-500">PNG/JPG up to ~5MB</div>
//           </div>
//           <input type="file" accept="image/*" onChange={onPickFile} className="absolute inset-0 opacity-0" />
//         </label>

//         <div className="flex items-center justify-end gap-3">
//           <Link to="/admin/users" className="rounded-xl border px-5 py-2 text-sm">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={saving}
//             className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60"
//           >
//             {saving ? "Saving…" : "Save changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// /* small inputs */
// function TextInput({ label, value, onChange, required, type = "text" }) {
//   return (
//     <label className="space-y-1 block">
//       <span className="text-xs font-medium text-gray-600">{label}</span>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         required={required}
//         className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
//       />
//     </label>
//   );
// }

// function Select({ label, value, onChange, children }) {
//   return (
//     <label className="space-y-1 block">
//       <span className="text-xs font-medium text-gray-600">{label}</span>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
//       >
//         {children}
//       </select>
//     </label>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

// const ROLES = [
//   { label: "Admin", value: "admin" },
//   { label: "Shelter", value: "shelter" },
//   { label: "Vet", value: "vet" },
//   { label: "Seeker", value: "pet_seeker" },
// ];

// export default function EditUserPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "pet_seeker",
//     password: "", // leave blank to keep existing
//   });

//   const [preview, setPreview] = useState(""); // show current avatar if you have one
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API_BASE}/api/auth/users/${id}`);
//         if (!res.ok) throw new Error("User not found");
//         const data = await res.json();
//         setForm({
//           name: data.name || "",
//           email: data.email || "",
//           role: data.role || "pet_seeker",
//           password: "",
//         });
//         setPreview(data.avatar || data.avatarUrl || "");
//       } catch (e) {
//         console.error(e);
//         setError("Failed to load user");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   async function onSubmit(e) {
//     e.preventDefault();
//     setError("");
//     try {
//       setSaving(true);

//       const payload = {
//         name: form.name,
//         email: form.email,
//         role: form.role, // admin|shelter|vet|pet_seeker
//       };
//       if (form.password?.trim()) payload.password = form.password.trim();

//       const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Update failed");

//       navigate("/admin/users");
//     } catch (err) {
//       console.error(err);
//       setError("Could not update user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <div className="p-6 text-sm text-gray-600">Loading…</div>;

//   return (
//     <div className="mx-auto max-w-3xl p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Edit User</h1>
//           <p className="text-xs text-gray-500">Update user details</p>
//         </div>
//         <Link to="/admin/users" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
//           Back to list
//         </Link>
//       </div>

//       {error && (
//         <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <TextInput label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
//           <TextInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
//           <Select label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })}>
//             {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
//           </Select>
//           <TextInput label="Password (leave blank to keep)" type="password" value={form.password}
//             onChange={(v) => setForm({ ...form, password: v })} />
//         </div>

//         {/* keep the visual avatar area, but it won't upload until backend supports it */}
//         <label className="relative flex items-center gap-4 rounded-2xl border border-dashed p-4">
//           <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
//             {preview ? (
//               <img src={preview} alt="avatar preview" className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">No image</div>
//             )}
//           </div>
//           <div className="text-xs text-gray-500">Avatar upload not wired yet</div>
//         </label>

//         <div className="flex items-center justify-end gap-3">
//           <Link to="/admin/users" className="rounded-xl border px-5 py-2 text-sm">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={saving}
//             className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60"
//           >
//             {saving ? "Saving…" : "Save changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function TextInput({ label, value, onChange, required, type = "text" }) {
//   return (
//     <label className="space-y-1 block">
//       <span className="text-xs font-medium text-gray-600">{label}</span>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         required={required}
//         className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
//       />
//     </label>
//   );
// }

// function Select({ label, value, onChange, children }) {
//   return (
//     <label className="space-y-1 block">
//       <span className="text-xs font-medium text-gray-600">{label}</span>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-xl border px-3 py-2 text-sm focus:ring"
//       >
//         {children}
//       </select>
//     </label>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

const ROLES = [
  { label: "Admin",   value: "admin" },
  { label: "Shelter", value: "shelter" },
  { label: "Vet",     value: "vet" },
  { label: "Seeker",  value: "pet_seeker" },
];

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "pet_seeker",
    password: "", // leave blank to keep existing
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/auth/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setForm({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "pet_seeker",
          password: "",
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password?.trim()) payload.password = form.password.trim();

      const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Update failed");
      }
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not update user");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6 text-sm text-gray-600">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit User</h1>
          <p className="text-xs text-gray-500">Update user details</p>
        </div>
        <Link to="/admin/users" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
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
          <TextInput label="Full name" value={form.name}
            onChange={(v) => setForm({ ...form, name: v })} required />
          <TextInput label="Email" type="email" value={form.email}
            onChange={(v) => setForm({ ...form, email: v })} required />
          <Select label="Role" value={form.role}
            onChange={(v) => setForm({ ...form, role: v })}>
            {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </Select>
          <TextInput label="Password (leave blank to keep)" type="password" value={form.password}
            onChange={(v) => setForm({ ...form, password: v })} />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/users" className="rounded-xl border px-5 py-2 text-sm">Cancel</Link>
          <button type="submit" disabled={saving}
            className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60">
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
