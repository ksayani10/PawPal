

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider}  from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import PawPalHome from "./components/PawPalHome";
 import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Signup from "./pages/Sign";
import Login from "./components/Loginform";
import Signup from "./components/SignupForm";
 import AddPetPage from './pages/AddPetPage';
 import PetsPage from './pages/PetsPage';
 import EditPetPage from "./pages/EditPetPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ShelterDashboard from "./pages/ShelterDashboard";
import ShelterSettings from "./pages/ShelterSettings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Articles from "./pages/Admin/ArticleList";
import AddArticle from "./pages/Admin/AddArticlePage";



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


               {/* Admin */}
          <Route element={<ProtectedRoute allow={["admin"]} />}>

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/articles" element={<Articles/>}/>
            <Route path="/articles/new" element ={<AddArticle/>}/>
            {/* ...other admin routes */}
          
          </Route>

          {/* protected area with Outlet */}
          <Route element={<ProtectedRoute allow={["shelter"]} />}>
            <Route path="/shelter" element={<DashboardLayout />}>
                 <Route path="/shelter/dashboard" element={<ShelterDashboard />} />      
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







