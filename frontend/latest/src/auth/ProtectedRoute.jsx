import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allow = [], children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}


// auth/ProtectedRoute.jsx
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ allow = [] }) {
//   const { user, loading } = useAuth(); // <-- make sure AuthProvider exposes `loading`
//   const location = useLocation();

//   // while restoring session (e.g., from localStorage/JWT), show a small loader
//   if (loading) return <div className="p-6 text-center">Loading…</div>;

//   // not logged in -> go to login and remember where we came from
//   if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

//   // logged in but wrong role
//   if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;

//   return <Outlet />;
// }


