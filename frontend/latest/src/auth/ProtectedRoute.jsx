
// forprevious
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ allow = [], children }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;
//   return children;
// }


import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function ProtectedRoute({ allow=[] }){
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}



