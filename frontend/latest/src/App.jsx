// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./auth/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import PawPalHome from "./components/PawPalHome";
// import PetProfile from "./pages/PetProfile";
// import Login from "./pages/Login";
// import Signup from "./pages/Sign";


// function App() {
//   return (

   
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<PawPalHome />} />
//         {/* <Route path="/pet/:id" element={<PetProfile />} /> */}
//         <Route
//             path="/pet/:id"
//             element={
//               <ProtectedRoute allow={["shelter"]}>
//                 <PetProfile />
//               </ProtectedRoute>
//             }
//           />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from "./context/AuthContext";
// // import Navbar from "./components/Navbar";
// // import SignUp from "./pages/SignUp";
// // import ShelterPets from "./pages/ShelterPets";
// // import AdminDashboard from "./pages/AdminDashboard";
// // import ProtectedRoute from "./routes/ProtectedRoute";

// // function Home() {
// //   return <div className="max-w-6xl mx-auto p-6">Home page content here</div>;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/signup" element={<SignUp />} />
// //           {/* add your own Login page later */}
// //           <Route
// //             path="/shelter/pets"
// //             element={
// //               <ProtectedRoute allow={["shelter"]}>
// //                 <ShelterPets />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/admin"
// //             element={
// //               <ProtectedRoute allow={["admin"]}>
// //                 <AdminDashboard />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Routes>
// //       </AuthProvider>
// //     </BrowserRouter>
// //   );
// // }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import PawPalHome from "./components/PawPalHome";
 import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
// import AddPetPage from './pages/AddPetPage';
// import PetsPage from './pages/PetsPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>   {/* ✅ must wrap anything that uses useAuth */}
        <Navbar />
        <Routes>
          <Route path="/" element={<PawPalHome />} />

  {/* Protected block */}
  {/* <Route element={<ProtectedRoute allow={["shelter"]} />}>
    <Route path="/shelter/pets" element={<Profile />} />
    
  </Route> */}

  <Route
  path="/shelter/pets"
  element={
    <ProtectedRoute allow={["shelter"]}>
      <Profile />
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







 {/* <Route path="/shelter/pets/new" element={<AddPetPage />} /> */}