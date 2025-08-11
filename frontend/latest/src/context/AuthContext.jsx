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

import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    // TODO: replace with real API
    const u = { name: "Demo", email, role: "shelter" };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
