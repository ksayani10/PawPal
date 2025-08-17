

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider  from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import PawPalHome from "./components/PawPalHome";
 import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
 import AddPetPage from './pages/AddPetPage';
 import PetsPage from './pages/PetsPage';
 import EditPetPage from "./pages/EditPetPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ShelterDashboard from "./pages/ShelterDashboard";
import ShelterSettings from "./pages/ShelterSettings";



export default function App() {
  return (
    <Router>
      <AuthProvider>   {/* ✅ must wrap anything that uses useAuth */}
        <Routes>
          {/* Optional: make root go straight to the pets list */}
           {/* <Route path="/" element={<PawPalHome />} />
         

  <Route path="/shelter" element ={<ProtectedRoute allow ={["shelter"]}>
    <DashboardLayout/>
  </ProtectedRoute>}/>

  <Route path="/shelter/dash" element ={<ProtectedRoute allow ={["shelter"]}>
    <ShelterDashboard/>
  </ProtectedRoute>}/>

  <Route path="/shelter/pets" element={ <ProtectedRoute allow={["shelter"]}>
                <PetsPage />
              </ProtectedRoute> }  />

<Route path="/shelter/settings" element ={<ProtectedRoute allow ={["shelter"]}>
    <ShelterSettings/>
  </ProtectedRoute>}/> */}


{/* public */}
          <Route path="/" element={<PawPalHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected area with Outlet */}
          <Route element={<ProtectedRoute allow={["shelter", "admin"]} />}>
            <Route path="/shelter" element={<DashboardLayout />}>
                 <Route index element={<ShelterDashboard />} />      
              <Route path="pets" element={<PetsPage />} />
              <Route path="settings" element={<ShelterSettings />} />
              <Route path="/shelter/pets/new" element ={<AddPetPage/>}/>
              <Route path="/shelter/pets/:id/edit" element ={<EditPetPage/>} />
              <Route path="/shelter/profile" element ={<Profile/>} />
             
            </Route>
          </Route>

  

        </Routes>
      </AuthProvider>
    </Router>
  );
}







