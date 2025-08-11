import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../config";
import { useAuth } from "../../context/AuthContext";

export default function PetList() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [err, setErr] = useState("");

  const auth = token ? { Authorization: `Bearer ${token}` } : {};

//   useEffect(() => {
//     (async () => {
//       try {
//         setErr("");
//         const res = await fetch(`${API_BASE}/api/pets`, { headers: auth });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setPets(data);
//       } catch (e) {
//         console.error(e);
//         setErr("Failed to load pets");
//       }
//     })();
//   }, []);


useEffect(() => {
  (async () => {
    try {
      setErr("");
      const auth = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`${API_BASE}/api/pets`, {
        headers: auth,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPets(data);
    } catch (e) {
      console.error(e);
      setErr("Failed to load pets");
    }
  })();
}, [token]);




  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Pets</h1>
        <Link
          to="/shelter/pets/new"
          className="rounded-lg bg-orange-500 px-4 py-2 text-white"
        >
          + Add New Pet
        </Link>
      </div>

      {err && <p className="text-red-500">{err}</p>}

      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((p) => (
            <li
              key={p._id}
              className="border rounded-lg p-3 hover:shadow transition"
            >
              {p.imageUrl && (
                <img
                  src={
                    p.imageUrl.startsWith("http")
                      ? p.imageUrl
                      : `${API_BASE}${p.imageUrl}`
                  }
                  alt={p.name}
                  className="h-40 w-full object-cover rounded"
                />
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {p.breed || "—"} • {p.gender || "—"} • {p.age ?? "—"} yrs
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
