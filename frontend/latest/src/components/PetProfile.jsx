
// import React , {useState ,useEffect} from "react";
// import { useParams } from "react-router-dom";

// const PetProfile = () => {
//   const { id } = useParams();

//   // Mock pet data (replace with fetch from backend)
//   const pet = {
//     name: "Luna",
//     breed: "Labrador",
//     age: 2,
//     category: "Dog",
//     imageUrl: "/images/pet1.jpg",
//     description: "Luna is a playful and friendly labrador who loves kids.",
//     vaccinated: true,
//   };

//   return (
//     <div className="pt-24 px-6 max-w-3xl mx-auto">
//       <img src={pet.imageUrl} alt={pet.name} className="rounded-lg w-full h-80 object-cover" />
//       <h2 className="text-3xl font-bold mt-6">{pet.name}</h2>
//       <p className="text-gray-600 mb-2">Breed: {pet.breed}</p>
//       <p className="text-gray-600 mb-2">Age: {pet.age} years</p>
//       <p className="text-gray-600 mb-2">Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
//       <p className="text-lg mt-4">{pet.description}</p>
//       <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
//         Request Adoption
//       </button>
//     </div>
//   );
// };

// export default PetProfile;


// src/pages/PetProfile.jsx
// src/pages/PetProfile.jsx


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config"; // VITE_API_URL=http://localhost:5002

 


const EMPTY = {
  name: "",
  breed: "",
  age: "",
  gender: "",
  status: "Available",
  vaccinations: "",   // comma separated in UI
  imageUrl: "",
};

const api = (p) => `${API_BASE}${p}`;

export default function PetProfile() {
  const { token } = useAuth(); // optional
  const authHdrs = token ? { Authorization: `Bearer ${token}` } : {};

  const [pets, setPets] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");



  // --------- Load ----------
  const loadPets = async () => {
    try {
      const res = await fetch(api("/api/pets"), { headers: authHdrs });
      if (!res.ok) throw new Error("Failed to load pets");
      const data = await res.json();
      setPets(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load pets");
    }
  };
  useEffect(() => { loadPets(); }, []);

  
  

  // --------- Form ----------
  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : "");
  };
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const resetForm = () => {
    setForm(EMPTY);
    setFile(null);
    setPreview("");
    setEditingId(null);
  };

  // --------- Create / Update ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("breed", form.breed);
      fd.append("age", form.age);
      fd.append("gender", form.gender);
      fd.append("status", form.status);
      fd.append("vaccinations", form.vaccinations); // backend splits
      if (file) fd.append("image", file); // field name "image"
      const isEdit = Boolean(editingId);

      const res = await fetch(
  isEdit ? api(`/api/pets/${editingId}`) : api("/api/pets"),
  {
    method: isEdit ? "PUT" : "POST",
    // don't set Content-Type for FormData
    headers: authHdrs,
    body: fd,
  }
);


      if (!res.ok) throw new Error(isEdit ? "Update failed" : "Create failed");
      await loadPets();
      resetForm();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // --------- Edit / Delete ----------
  const onEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || "",
      breed: p.breed || "",
      age: p.age ?? "",
      gender: p.gender || "",
      status: p.status || "Available",
      vaccinations: Array.isArray(p.vaccinations)
        ? p.vaccinations.join(", ")
        : p.vaccinations || "",
      imageUrl: p.imageUrl || "",
    });
    setPreview(p.imageUrl ? api(p.imageUrl) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this pet?")) return;
    try {
      const res = await fetch(api(`/api/pets/${id}`), {
        method: "DELETE",
        headers: authHdrs,
      });
      if (!res.ok) throw new Error("Delete failed");
      await loadPets();
    } catch (e) {
      setErr(e.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Pet" : "Add New Pet"}
      </h1>

      {err && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
          {err}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 bg-white border rounded-2xl p-4">
        <input className="rounded-xl border px-3 py-2" name="name" value={form.name} onChange={onChange} placeholder="Pet name" required />
        <input className="rounded-xl border px-3 py-2" name="breed" value={form.breed} onChange={onChange} placeholder="Breed" />
        <input className="rounded-xl border px-3 py-2" name="age" value={form.age} onChange={onChange} placeholder="Age" type="number" min="0" />
        <input className="rounded-xl border px-3 py-2" name="gender" value={form.gender} onChange={onChange} placeholder="Gender" />
        <select className="rounded-xl border px-3 py-2" name="status" value={form.status} onChange={onChange}>
          <option>Available</option><option>Pending</option><option>Adopted</option>

{/* <option>free to Adopt</option><option>dead</option><option>under treatment</option> */}

        </select>
        <input className="rounded-xl border px-3 py-2" name="vaccinations" value={form.vaccinations} onChange={onChange} placeholder="Vaccinations (comma separated)" />

        <input type="file" accept="image/*" onChange={onFileChange} className="rounded-xl border px-3 py-2 md:col-span-2" />

        {(preview || form.imageUrl) && (
          <img
            src={preview || (form.imageUrl ? api(form.imageUrl) : "")}
            alt="preview"
            className="h-44 w-full object-cover rounded-xl border md:col-span-2"
          />
        )}

        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={loading} className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60">
            {editingId ? (loading ? "Updating..." : "Update") : (loading ? "Saving..." : "Save")}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-xl border px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>


      {/* <div></div> */}

      <h2 className="text-xl font-semibold mt-8 mb-3">My Pets</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((p) => (
          <div key={p._id} className="rounded-2xl overflow-hidden border bg-white">
            <img
              src={p.imageUrl ? api(p.imageUrl) : "/assets/placeholder.jpg"}
              alt={p.name}
              className="h-44 w-full object-cover"
            />
           
           <div className="p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">
                {p.breed} {p.age ? `• ${p.age} yrs` : ""} {p.gender ? `• ${p.gender}` : ""}
              </div>
              <div className="mt-2 text-xs inline-block rounded-full bg-gray-100 px-2 py-0.5">
                {p.status}
              </div>
          
          

              <div className="mt-3 flex gap-2">
                <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-lg border">Edit</button>
                <button onClick={() => onDelete(p._id)} className="px-3 py-1 rounded-lg border text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {pets.length === 0 && <p className="text-gray-500">No pets yet. Add your first pet above.</p>}
      </div>
    </div>
  );
}
