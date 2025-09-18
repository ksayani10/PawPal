// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

// const ROLES = ["Admin", "Shelter", "Vet", "Seeker"];
// const STATUSES = ["Active", "Invited", "Suspended"];

// export default function AddUserPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "Seeker",
//     status: "Active",
//     phone: "",
//     password: "",       // optional (leave blank if your API invites users)
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

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

//       if (form.password?.trim()) fd.append("password", form.password.trim());
//       if (file) fd.append("avatar", file); // backend should accept "avatar"

//       const res = await fetch(`${API_BASE}/api/auth`, {
//         method: "POST",
//         body: fd,
//       });

//       if (!res.ok) {
//         const msg = (await res.json().catch(() => null))?.message || "Create failed";
//         throw new Error(msg);
//       }

//       navigate("/admin/users");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Could not create user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-3xl p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Add User</h1>
//           <p className="text-xs text-gray-500">Create a new user</p>
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
//           <TextInput
//             label="Full name"
//             value={form.name}
//             onChange={(v) => setForm({ ...form, name: v })}
//             required
//           />
//           <TextInput
//             label="Email"
//             type="email"
//             value={form.email}
//             onChange={(v) => setForm({ ...form, email: v })}
//             required
//           />
//           <Select label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })}>
//             {ROLES.map((r) => (
//               <option key={r}>{r}</option>
//             ))}
//           </Select>
//           <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
//             {STATUSES.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </Select>
//           <TextInput
//             label="Phone (optional)"
//             value={form.phone}
//             onChange={(v) => setForm({ ...form, phone: v })}
//           />
//           <TextInput
//             label="Password (optional)"
//             type="password"
//             value={form.password}
//             onChange={(v) => setForm({ ...form, password: v })}
//           />
//         </div>

//         <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 hover:bg-gray-50">
//           <div className="h-20 w-24 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
//             {preview ? (
//               <img src={preview} alt="avatar preview" className="h-full w-full object-cover" />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
//                 No image
//               </div>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-medium">Upload avatar (optional)</div>
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
//             {saving ? "Creating…" : "Create user"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// /* Tiny inputs reused */
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




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

// // map labels -> enum values your schema accepts
// const ROLES = [
//   { label: "Admin",   value: "admin" },
//   { label: "Shelter", value: "shelter" },
//   { label: "Vet",     value: "vet" },
//   { label: "Seeker",  value: "pet_seeker" },
// ];

// export default function AddUserPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "pet_seeker",   // default must match enum
//     password: "",         // REQUIRED by schema
//   });

//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   async function onSubmit(e) {
//     e.preventDefault();
//     setError("");

//     try {
//       setSaving(true);

//       // send JSON, not FormData
//       const res = await fetch(`${API_BASE}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: form.role, // must be admin|shelter|vet|pet_seeker
//         }),
//       });

//       if (!res.ok) {
//         // backend may return JSON or HTML; read as text first
//         const txt = await res.text();
//         let msg = "Create failed";
//         try {
//           const j = JSON.parse(txt);
//           msg = j.message || msg;
//         } catch { msg = txt || msg; }
//         throw new Error(msg);
//       }

//       navigate("/admin/users");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Could not create user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-3xl p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Add User</h1>
//           <p className="text-xs text-gray-500">Create a new user</p>
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
//           <TextInput
//             label="Full name"
//             value={form.name}
//             onChange={(v) => setForm({ ...form, name: v })}
//             required
//           />
//           <TextInput
//             label="Email"
//             type="email"
//             value={form.email}
//             onChange={(v) => setForm({ ...form, email: v })}
//             required
//           />
//           <Select
//             label="Role"
//             value={form.role}
//             onChange={(v) => setForm({ ...form, role: v })}
//           >
//             {ROLES.map(r => (
//               <option key={r.value} value={r.value}>{r.label}</option>
//             ))}
//           </Select>
//           <TextInput
//             label="Password"
//             type="password"
//             value={form.password}
//             onChange={(v) => setForm({ ...form, password: v })}
//             required
//           />
//         </div>

//         <div className="flex items-center justify-end gap-3">
//           <Link to="/admin/users" className="rounded-xl border px-5 py-2 text-sm">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={saving}
//             className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60"
//           >
//             {saving ? "Creating…" : "Create user"}
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



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5002";

const ROLES = [
  { label: "Admin",   value: "admin" },
  { label: "Shelter", value: "shelter" },
  { label: "Vet",     value: "vet" },
  { label: "Seeker",  value: "pet_seeker" },
];

export default function AddUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "pet_seeker",
    password: "",            // required by backend
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Create failed");
      }
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not create user");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Add User</h1>
          <p className="text-xs text-gray-500">Create a new user</p>
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
          <TextInput label="Password" type="password" value={form.password}
            onChange={(v) => setForm({ ...form, password: v })} required />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/users" className="rounded-xl border px-5 py-2 text-sm">Cancel</Link>
          <button type="submit" disabled={saving}
            className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 disabled:opacity-60">
            {saving ? "Creating…" : "Create user"}
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
