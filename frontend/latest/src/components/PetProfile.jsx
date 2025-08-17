

// // src/pages/PetProfile.jsx
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { API_BASE } from "../config"; // VITE_API_BASE=http://localhost:5002

// const EMPTY = {
//   name: "",
//   breed: "",
//   age: "",
//   gender: "",
//   status: "Available",
//   vaccinations: "", // comma separated in UI
//   imageUrl: "",
// };

// const api = (p) => `${API_BASE}${p}`;
// const isAbs = (url = "") => /^https?:\/\//i.test(url);
// const resolveImg = (url = "") => (isAbs(url) ? url : api(url || ""));

// export default function PetProfile() {
//   const { token } = useAuth(); // optional
//   const authHdrs = token ? { Authorization: `Bearer ${token}` } : {};

//   const [pets, setPets] = useState([]);
//   const [form, setForm] = useState(EMPTY);
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   // ---------- Load ----------
//   const loadPets = async () => {
//     try {
//       const res = await fetch(api("/api/pets"), { headers: authHdrs });
//       if (!res.ok) throw new Error("Failed to load pets");
//       const data = await res.json();
//       setPets(Array.isArray(data) ? data : []);
//     } catch (e) {
//       console.error(e);
//       setErr("Failed to load pets");
//     }
//   };
//   useEffect(() => {
//     loadPets();
//   }, []); // eslint-disable-line

//   // clean up object URL previews
//   useEffect(() => {
//     return () => {
//       if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   // ---------- Form ----------
//   const onFileChange = (e) => {
//     const f = e.target.files?.[0] || null;
//     setFile(f);
//     setPreview(f ? URL.createObjectURL(f) : "");
//   };
//   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const resetForm = () => {
//     setForm(EMPTY);
//     setFile(null);
//     setPreview("");
//     setEditingId(null);
//   };

//   // ---------- Create / Update ----------
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("breed", form.breed);
//       fd.append("age", form.age);
//       fd.append("gender", form.gender);
//       fd.append("status", form.status);
//       fd.append("vaccinations", form.vaccinations); // backend splits
//       if (file) fd.append("image", file);
//       if (!file && form.imageUrl) fd.append("imageUrl", form.imageUrl); // allow URL fallback

//       const isEdit = Boolean(editingId);
//       const res = await fetch(
//         isEdit ? api(`/api/pets/${editingId}`) : api("/api/pets"),
//         {
//           method: isEdit ? "PUT" : "POST",
//           headers: authHdrs, // do NOT set Content-Type when sending FormData
//           body: fd,
//         }
//       );

//       if (!res.ok) throw new Error(isEdit ? "Update failed" : "Create failed");
//       await loadPets();
//       resetForm();
//       // optional: scroll back to top to see the updated list
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (e) {
//       setErr(e.message || "Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- Edit / Delete ----------
//   const onEdit = (p) => {
//     setEditingId(p._id);
//     setForm({
//       name: p.name || "",
//       breed: p.breed || "",
//       age: p.age ?? "",
//       gender: p.gender || "",
//       status: p.status || "Available",
//       vaccinations: Array.isArray(p.vaccinations)
//         ? p.vaccinations.join(", ")
//         : p.vaccinations || "",
//       imageUrl: p.imageUrl || "",
//     });
//     setFile(null);
//     setPreview(p.imageUrl ? resolveImg(p.imageUrl) : "");
//     // jump to form section
//     document.getElementById("pet-form")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const onDelete = async (id) => {
//     if (!confirm("Delete this pet?")) return;
//     const old = pets;
//     setPets((p) => p.filter((x) => x._id !== id)); // optimistic
//     try {
//       const res = await fetch(api(`/api/pets/${id}`), {
//         method: "DELETE",
//         headers: authHdrs,
//       });
//       if (!res.ok) throw new Error("Delete failed");
//     } catch (e) {
//       setErr(e.message || "Delete failed");
//       setPets(old); // rollback
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//       {/* ---------- TOP: MY PETS + ADD CTA ---------- */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">My Pets</h1>
//         <button
//           onClick={() =>
//             document.getElementById("pet-form")?.scrollIntoView({ behavior: "smooth" })
//           }
//           className="rounded-xl border px-4 py-2 hover:bg-gray-100"
//         >
//           + Add Pet
//         </button>
//       </div>

//       <section className="bg-white rounded-2xl shadow-sm p-4">
//         {err && <div className="mb-3 text-red-600 text-sm">{err}</div>}
//         {pets.length === 0 ? (
//           <p className="text-sm text-gray-600">No pets yet — add one below.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {pets.map((p) => (
//               <div key={p._id} className="rounded-2xl overflow-hidden border bg-white">
//                 <img
//                   src={p.imageUrl ? resolveImg(p.imageUrl) : "/assets/placeholder.jpg"}
//                   alt={p.name}
//                   className="h-44 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="font-semibold">{p.name}</div>
//                   <div className="text-sm text-gray-600">
//                     {p.breed} {p.age ? `• ${p.age} yrs` : ""} {p.gender ? `• ${p.gender}` : ""}
//                   </div>
//                   <div className="mt-2 text-xs inline-block rounded-full bg-gray-100 px-2 py-0.5">
//                     {p.status || "Available"}
//                   </div>
//                   <div className="mt-3 flex gap-2">
//                     <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-lg border">
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(p._id)}
//                       className="px-3 py-1 rounded-lg border text-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ---------- BOTTOM: ADD / EDIT FORM ---------- */}
//       <section id="pet-form" className="bg-white border rounded-2xl p-4">
//         <h2 className="text-xl font-semibold mb-1">
//           {editingId ? "Edit Pet" : "Add a new pet"}
//         </h2>
//         <p className="text-sm text-gray-500 mb-4">
//           Fill the form and submit — the new/updated pet shows above.
//         </p>

//         <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
//           <input
//             className="rounded-xl border px-3 py-2"
//             name="name"
//             value={form.name}
//             onChange={onChange}
//             placeholder="Pet name"
//             required
//           />
//           <input
//             className="rounded-xl border px-3 py-2"
//             name="breed"
//             value={form.breed}
//             onChange={onChange}
//             placeholder="Breed"
//           />
//           <input
//             className="rounded-xl border px-3 py-2"
//             name="age"
//             value={form.age}
//             onChange={onChange}
//             placeholder="Age"
//             type="number"
//             min="0"
//           />
//           <input
//             className="rounded-xl border px-3 py-2"
//             name="gender"
//             value={form.gender}
//             onChange={onChange}
//             placeholder="Gender"
//           />
//           <select
//             className="rounded-xl border px-3 py-2"
//             name="status"
//             value={form.status}
//             onChange={onChange}
//           >
//             <option>Available</option>
//             <option>Pending</option>
//             <option>Adopted</option>
//           </select>
//           <input
//             className="rounded-xl border px-3 py-2"
//             name="vaccinations"
//             value={form.vaccinations}
//             onChange={onChange}
//             placeholder="Vaccinations (comma separated)"
//           />

//           {/* Optional image URL (when not uploading a file) */}
//           <input
//             className="rounded-xl border px-3 py-2 md:col-span-2"
//             name="imageUrl"
//             value={form.imageUrl}
//             onChange={onChange}
//             placeholder="Image URL (optional if you upload a file)"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={onFileChange}
//             className="rounded-xl border px-3 py-2 md:col-span-2"
//           />

//           {(preview || form.imageUrl) && (
//             <img
//               src={preview || resolveImg(form.imageUrl)}
//               alt="preview"
//               className="h-44 w-full object-cover rounded-xl border md:col-span-2"
//             />
//           )}

//           <div className="md:col-span-2 flex gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60"
//             >
//               {editingId ? (loading ? "Updating..." : "Update") : (loading ? "Saving..." : "Save")}
//             </button>
//             {editingId && (
//               <button type="button" onClick={resetForm} className="rounded-xl border px-4 py-2">
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

<Navbar/>
const categories = ["All", "Dogs", "Cats", "Vaccinated", "Puppies"];

const PawPalHome = () => {
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/pets");
        setPets(response.data); // Make sure backend sends an array
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchCategory =
      selectedCategory === "All" || pet.category === selectedCategory;
    const matchSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div
        className="relative h-[350px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: "url('/images/pets-banner.jpg')" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Discover Adorable Pets</h1>
        <p className="text-lg mt-2">Rescued and ready for a loving home</p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center bg-white rounded-full shadow-lg w-[90%] max-w-md px-4 py-2">
          <AiOutlineSearch className="text-orange-500 text-xl mr-2" />
          <input
            type="text"
            placeholder="Search for pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-10">
        {filteredPets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 relative">
              <span className="absolute top-2 left-2 bg-orange-200 text-orange-800 px-2 py-1 text-xs rounded-full">
                {pet.category}
              </span>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                <AiOutlineHeart className="text-xl" />
              </button>
              <h3 className="mt-6 text-lg font-bold">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.breed}</p>
              <button
                onClick={() => navigate(`/pet/${pet._id}`)}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Adopt Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PawPalHome;
