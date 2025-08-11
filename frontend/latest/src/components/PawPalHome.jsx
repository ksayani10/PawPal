import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Dogs", "Cats", "Vaccinated", "Puppies"];

const PawPalHome = () => {
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
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
