import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import { useAuth } from "../../context/AuthContext";

export default function AddPetForm() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    status: "Available",
    vaccinations: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErr("");

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("image", file);

      const res = await fetch(`${API_BASE}/api/pets`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      navigate("/shelter/pets");
    } catch (error) {
      console.error(error);
      setErr("Failed to save pet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {err && <p className="text-red-500">{err}</p>}

      <input
        name="name"
        placeholder="Pet name"
        value={form.name}
        onChange={onChange}
        required
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="breed"
        placeholder="Breed"
        value={form.breed}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full"
      />
      <select
        name="status"
        value={form.status}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="Available">Available</option>
        <option value="Adopted">pending</option>
        {/* <option value="Available">free to Adopt</option>
        <option value="Available">dead</option>
        <option value="Available">Under Treatment</option> */}
      </select>
      <input
        name="vaccinations"
        placeholder="Vaccinations (comma separated)"
        value={form.vaccinations}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full"
      />

      <input type="file" accept="image/*" onChange={onFile} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-24 w-24 object-cover rounded border"
        />
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:opacity-90"
      >
        {saving ? "Saving..." : "Save Pet"}
      </button>
    </form>
  );
}
