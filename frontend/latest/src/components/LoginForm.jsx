// import React from 'react';
// import { FaUser, FaLock } from 'react-icons/fa';

// const LoginForm = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md w-full bg-white shadow-lg p-12 rounded-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Login </h2>
//         <form>
//          <div> 
//           <input 
//             type="email" 
//             placeholder="Email"
//             className="w-full mb-5 px-4 py-2 border rounded-md focus:outline-none"
//           /></div>
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm mt-4 text-center">
//           Don't have an account? <a href="/signup" className="text-orange-500 underline">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [f, setF] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!f.email || !f.password) return setError("Email and password are required.");
    setError("");

    try {
      const user = await login(f); // backend returns user.role
      if (user.role === "shelter") nav("/shelter/pets", { replace: true });
      else if (user.role === "admin") nav("/admin", { replace: true });
      else nav("/explore", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold text-center mb-2">Login to PawPal</h1>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Email" type="email"
               value={f.email} onChange={(e)=>setF({...f,email:e.target.value})}/>
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Password" type="password"
               value={f.password} onChange={(e)=>setF({...f,password:e.target.value})}/>
        <button className="w-full rounded-xl bg-orange-500 text-white py-2.5 hover:bg-orange-600">Login</button>
      </form>
      <p className="text-center text-sm mt-3">
        Don't have an account? <Link className="text-orange-600 hover:underline" to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
