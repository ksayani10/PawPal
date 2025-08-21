// import { createContext, useContext, useState } from "react";

// const AuthCtx = createContext(null);
// export const useAuth = () => useContext(AuthCtx);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // { name,email,role,token? }

//   const signup = async (payload) => {
//     // call your backend
//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Sign up failed");
//     const data = await res.json(); // expect { user: {name,email,role}, token }
//     setUser(data.user);
//     return data.user;
//   };

//   const login = async (payload) => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Invalid credentials");
//     const data = await res.json(); // expect { user: {name,email,role}, token }
//     setUser(data.user);
//     return data.user;
//   };

//   const logout = () => setUser(null);

//   return (
//     <AuthCtx.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthCtx.Provider>
//   );
// }

//just for login
// import { createContext, useContext, useState } from "react";

// const AuthCtx = createContext(null);

// export const useAuth = () => useContext(AuthCtx);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = async ({ email, password }) => {
//     // TODO: replace with real API
//     const u = { name: "Demo", email, role: "shelter" };
//     setUser(u);
//     return u;
//   };

//   const logout = () => setUser(null);

//   return (
//     <AuthCtx.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthCtx.Provider>
//   );
// }


// import React,{createContext,useContext,useEffect,useState} from 'react';
// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({children}){
//   const [user,setUser] = useState(null);
//   const [token,setToken] = useState(null);
//   const [loading,setLoading] = useState(true);

//   useEffect(()=>{
//     const raw = localStorage.getItem('pawpal_auth');
//     if(raw){ const p = JSON.parse(raw); setUser(p.user); setToken(p.token); }
//     setLoading(false);
//   },[]);

//   const login = (payload)=>{ setUser(payload.user); setToken(payload.token); localStorage.setItem('pawpal_auth', JSON.stringify(payload)); };
//   const logout = ()=>{ setUser(null); setToken(null); localStorage.removeItem('pawpal_auth'); };

//   return <AuthContext.Provider value={{user,token,login,logout,loading}}>{children}</AuthContext.Provider>;
// }

// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // { id, role, email, name }
  const [token, setToken] = useState(null);   // JWT
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = ({ token, user }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("auth", JSON.stringify({ token, user }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <Ctx.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
