//for normal sign up
// import React from 'react';

// const Signup = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Sign Up for PawPal</h2>
//         <form>
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-sm mt-4 text-center">
//           Already have an account? <a href="/login" className="text-orange-500 underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5002";
const roles = [
  { value: "pet_seeker", label: "Pet Seeker" },
  { value: "shelter", label: "Shelter Staff" },
  { value: "vet", label: "Veterinarian" },
  { value: "admin", label: "Admin" },
];

export default function SignupForm() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "pet_seeker" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      nav("/login");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input name="name" value={form.name} onChange={onChange} className="mt-1 w-full border rounded-xl p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full border rounded-xl p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} className="mt-1 w-full border rounded-xl p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select name="role" value={form.role} onChange={onChange} className="mt-1 w-full border rounded-xl p-2">
            {roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Shelter/Vet/Admin may require admin approval.</p>
        </div>

        <button disabled={loading} className="w-full rounded-xl py-2 bg-black text-white">
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="text-sm text-gray-600">
          Already have an account? <Link className="text-blue-600" to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
