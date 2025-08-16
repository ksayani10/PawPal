
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { API_BASE } from "../config"; // VITE_API_URL=http://localhost:5002

 


// const EMPTY = {
//   name: "",
//   breed: "",
//   age: "",
//   gender: "",
//   status: "Available",
//   vaccinations: "",   // comma separated in UI
//   imageUrl: "",
// };

// const api = (p) => `${API_BASE}${p}`;

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



//   // --------- Load ----------
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
//   useEffect(() => { loadPets(); }, []);

  
  

//   // --------- Form ----------
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
  

//   // --------- Create / Update ----------
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
//       if (file) fd.append("image", file); // field name "image"
//       const isEdit = Boolean(editingId);

//       const res = await fetch(
//   isEdit ? api(`/api/pets/${editingId}`) : api("/api/pets"),
//   {
//     method: isEdit ? "PUT" : "POST",
//     // don't set Content-Type for FormData
//     headers: authHdrs,
//     body: fd,
//   }
// );


//       if (!res.ok) throw new Error(isEdit ? "Update failed" : "Create failed");
//       await loadPets();
//       resetForm();
//     } catch (e) {
//       setErr(e.message || "Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------- Edit / Delete ----------
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
//     setPreview(p.imageUrl ? api(p.imageUrl) : "");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const onDelete = async (id) => {
//     if (!confirm("Delete this pet?")) return;
//     try {
//       const res = await fetch(api(`/api/pets/${id}`), {
//         method: "DELETE",
//         headers: authHdrs,
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       await loadPets();
//     } catch (e) {
//       setErr(e.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         {editingId ? "Edit Pet" : "Add New Pet"}
//       </h1>

//       {err && (
//         <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
//           {err}
//         </div>
//       )}

//       <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 bg-white border rounded-2xl p-4">
//         <input className="rounded-xl border px-3 py-2" name="name" value={form.name} onChange={onChange} placeholder="Pet name" required />
//         <input className="rounded-xl border px-3 py-2" name="breed" value={form.breed} onChange={onChange} placeholder="Breed" />
//         <input className="rounded-xl border px-3 py-2" name="age" value={form.age} onChange={onChange} placeholder="Age" type="number" min="0" />
//         <input className="rounded-xl border px-3 py-2" name="gender" value={form.gender} onChange={onChange} placeholder="Gender" />
//         <select className="rounded-xl border px-3 py-2" name="status" value={form.status} onChange={onChange}>
//           <option>Available</option><option>Pending</option><option>Adopted</option>

// {/* <option>free to Adopt</option><option>dead</option><option>under treatment</option> */}

//         </select>
//         <input className="rounded-xl border px-3 py-2" name="vaccinations" value={form.vaccinations} onChange={onChange} placeholder="Vaccinations (comma separated)" />

//         <input type="file" accept="image/*" onChange={onFileChange} className="rounded-xl border px-3 py-2 md:col-span-2" />

//         {(preview || form.imageUrl) && (
//           <img
//             src={preview || (form.imageUrl ? api(form.imageUrl) : "")}
//             alt="preview"
//             className="h-44 w-full object-cover rounded-xl border md:col-span-2"
//           />
//         )}

//         <div className="md:col-span-2 flex gap-3">
//           <button type="submit" disabled={loading} className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60">
//             {editingId ? (loading ? "Updating..." : "Update") : (loading ? "Saving..." : "Save")}
//           </button>
//           {editingId && (
//             <button type="button" onClick={resetForm} className="rounded-xl border px-4 py-2">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>


//       {/* <div></div> */}

//       <h2 className="text-xl font-semibold mt-8 mb-3">My Pets</h2>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {pets.map((p) => (
//           <div key={p._id} className="rounded-2xl overflow-hidden border bg-white">
//             <img
//               src={p.imageUrl ? api(p.imageUrl) : "/assets/placeholder.jpg"}
//               alt={p.name}
//               className="h-44 w-full object-cover"
//             />
           
//            <div className="p-4">
//               <div className="font-semibold">{p.name}</div>
//               <div className="text-sm text-gray-600">
//                 {p.breed} {p.age ? `• ${p.age} yrs` : ""} {p.gender ? `• ${p.gender}` : ""}
//               </div>
//               <div className="mt-2 text-xs inline-block rounded-full bg-gray-100 px-2 py-0.5">
//                 {p.status}
//               </div>
          
          

//               <div className="mt-3 flex gap-2">
//                 <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-lg border">Edit</button>
//                 <button onClick={() => onDelete(p._id)} className="px-3 py-1 rounded-lg border text-red-600">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {pets.length === 0 && <p className="text-gray-500">No pets yet. Add your first pet above.</p>}
//       </div>
//     </div>
//   );
// }


// src/pages/PetProfile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config"; // VITE_API_BASE=http://localhost:5002

const EMPTY = {
  name: "",
  breed: "",
  age: "",
  gender: "",
  status: "Available",
  vaccinations: "", // comma separated in UI
  imageUrl: "",
};

const api = (p) => `${API_BASE}${p}`;
const isAbs = (url = "") => /^https?:\/\//i.test(url);
const resolveImg = (url = "") => (isAbs(url) ? url : api(url || ""));

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

  // ---------- Load ----------
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
  useEffect(() => {
    loadPets();
  }, []); // eslint-disable-line

  // clean up object URL previews
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ---------- Form ----------
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

  // ---------- Create / Update ----------
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
      if (file) fd.append("image", file);
      if (!file && form.imageUrl) fd.append("imageUrl", form.imageUrl); // allow URL fallback

      const isEdit = Boolean(editingId);
      const res = await fetch(
        isEdit ? api(`/api/pets/${editingId}`) : api("/api/pets"),
        {
          method: isEdit ? "PUT" : "POST",
          headers: authHdrs, // do NOT set Content-Type when sending FormData
          body: fd,
        }
      );

      if (!res.ok) throw new Error(isEdit ? "Update failed" : "Create failed");
      await loadPets();
      resetForm();
      // optional: scroll back to top to see the updated list
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Edit / Delete ----------
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
    setFile(null);
    setPreview(p.imageUrl ? resolveImg(p.imageUrl) : "");
    // jump to form section
    document.getElementById("pet-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this pet?")) return;
    const old = pets;
    setPets((p) => p.filter((x) => x._id !== id)); // optimistic
    try {
      const res = await fetch(api(`/api/pets/${id}`), {
        method: "DELETE",
        headers: authHdrs,
      });
      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      setErr(e.message || "Delete failed");
      setPets(old); // rollback
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* ---------- TOP: MY PETS + ADD CTA ---------- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <button
          onClick={() =>
            document.getElementById("pet-form")?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-xl border px-4 py-2 hover:bg-gray-100"
        >
          + Add Pet
        </button>
      </div>

      <section className="bg-white rounded-2xl shadow-sm p-4">
        {err && <div className="mb-3 text-red-600 text-sm">{err}</div>}
        {pets.length === 0 ? (
          <p className="text-sm text-gray-600">No pets yet — add one below.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((p) => (
              <div key={p._id} className="rounded-2xl overflow-hidden border bg-white">
                <img
                  src={p.imageUrl ? resolveImg(p.imageUrl) : "/assets/placeholder.jpg"}
                  alt={p.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">
                    {p.breed} {p.age ? `• ${p.age} yrs` : ""} {p.gender ? `• ${p.gender}` : ""}
                  </div>
                  <div className="mt-2 text-xs inline-block rounded-full bg-gray-100 px-2 py-0.5">
                    {p.status || "Available"}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-lg border">
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p._id)}
                      className="px-3 py-1 rounded-lg border text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- BOTTOM: ADD / EDIT FORM ---------- */}
      <section id="pet-form" className="bg-white border rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-1">
          {editingId ? "Edit Pet" : "Add a new pet"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Fill the form and submit — the new/updated pet shows above.
        </p>

        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            className="rounded-xl border px-3 py-2"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Pet name"
            required
          />
          <input
            className="rounded-xl border px-3 py-2"
            name="breed"
            value={form.breed}
            onChange={onChange}
            placeholder="Breed"
          />
          <input
            className="rounded-xl border px-3 py-2"
            name="age"
            value={form.age}
            onChange={onChange}
            placeholder="Age"
            type="number"
            min="0"
          />
          <input
            className="rounded-xl border px-3 py-2"
            name="gender"
            value={form.gender}
            onChange={onChange}
            placeholder="Gender"
          />
          <select
            className="rounded-xl border px-3 py-2"
            name="status"
            value={form.status}
            onChange={onChange}
          >
            <option>Available</option>
            <option>Pending</option>
            <option>Adopted</option>
          </select>
          <input
            className="rounded-xl border px-3 py-2"
            name="vaccinations"
            value={form.vaccinations}
            onChange={onChange}
            placeholder="Vaccinations (comma separated)"
          />

          {/* Optional image URL (when not uploading a file) */}
          <input
            className="rounded-xl border px-3 py-2 md:col-span-2"
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            placeholder="Image URL (optional if you upload a file)"
          />

          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="rounded-xl border px-3 py-2 md:col-span-2"
          />

          {(preview || form.imageUrl) && (
            <img
              src={preview || resolveImg(form.imageUrl)}
              alt="preview"
              className="h-44 w-full object-cover rounded-xl border md:col-span-2"
            />
          )}

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-60"
            >
              {editingId ? (loading ? "Updating..." : "Update") : (loading ? "Saving..." : "Save")}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-xl border px-4 py-2">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
