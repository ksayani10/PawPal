

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import PawPalHome from "./components/PawPalHome";
 import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
 import AddPetPage from './pages/AddPetPage';
 import PetsPage from './pages/PetsPage';
 import EditPetPage from "./pages/EditPetPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>   {/* ✅ must wrap anything that uses useAuth */}
        <Navbar />
        <Routes>
          {/* Optional: make root go straight to the pets list */}
           <Route path="/" element={<PawPalHome />} />
          {/* <Route path="/" element={<Navigate to="/shelter/pets" replace />} /> */}

          {/* Shelter routes (protected) */}
          <Route
            path="/shelter/pets"
            element={
              <ProtectedRoute allow={["shelter"]}>
                <PetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/pets/new"
            element={
              <ProtectedRoute allow={["shelter"]}>
                <AddPetPage />
              </ProtectedRoute>
            }
          />
          <Route
  path="/shelter/pets/:id/edit"
  element={
    <ProtectedRoute allow={["shelter"]}>
      <EditPetPage />
    </ProtectedRoute>
  }
/>


  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}







