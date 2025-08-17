// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";


// const categories = ["All", "Dogs", "Cats", "Vaccinated", "Puppies"];

// const PawPalHome = () => {
//   const [pets, setPets] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get("http://localhost:5002/api/pets");
//         setPets(response.data); // Make sure backend sends an array
//       } catch (error) {
//         console.error("Error fetching pets:", error);
//       }
//     };

//     fetchPets();
//   }, []);

//   const filteredPets = pets.filter((pet) => {
//     const matchCategory =
//       selectedCategory === "All" || pet.category === selectedCategory;
//     const matchSearch =
//       pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <div
//         className="relative h-[350px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
//         style={{ backgroundImage: "url('/images/pets-banner.jpg')" }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold">Discover Adorable Pets</h1>
//         <p className="text-lg mt-2">Rescued and ready for a loving home</p>

//         {/* Search Bar */}
//         <div className="mt-6 flex items-center bg-white rounded-full shadow-lg w-[90%] max-w-md px-4 py-2">
//           <AiOutlineSearch className="text-orange-500 text-xl mr-2" />
//           <input
//             type="text"
//             placeholder="Search for pets..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full outline-none text-gray-700"
//           />
//         </div>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex justify-center flex-wrap gap-3 my-6">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-4 py-2 rounded-full font-medium ${
//               selectedCategory === cat
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-orange-100"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Pet Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-10">
//         {filteredPets.map((pet) => (
//           <div
//             key={pet._id}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
//           >
//             <img
//               src={pet.imageUrl}
//               alt={pet.name}
//               className="h-48 w-full object-cover"
//             />
//             <div className="p-4 relative">
//               <span className="absolute top-2 left-2 bg-orange-200 text-orange-800 px-2 py-1 text-xs rounded-full">
//                 {pet.category}
//               </span>
//               <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
//                 <AiOutlineHeart className="text-xl" />
//               </button>
//               <h3 className="mt-6 text-lg font-bold">{pet.name}</h3>
//               <p className="text-sm text-gray-600">{pet.breed}</p>
//               <button
//                 onClick={() => navigate(`/pet/${pet._id}`)}
//                 className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
//               >
//                 Adopt Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PawPalHome;


// src/components/PawPalHome.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import hero from "../assets/hero-pet.jpeg"

// function PawIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
//       <path fill="currentColor" d="M11.8 13.1c-2.6-1.9-6.2.1-6.2 2.9 0 2.2 2 3.9 6.2 3.9s6.3-1.7 6.3-3.9c0-2.8-3.6-4.8-6.3-2.9zM6.2 11.4c.9 0 1.7-.9 1.7-2.1 0-1.1-.8-2-1.7-2s-1.7.9-1.7 2 .8 2.1 1.7 2.1zm4.4-1.1c1 0 1.8-1 1.8-2.2 0-1.1-.8-2.1-1.8-2.1s-1.8 1-1.8 2.1c0 1.2.8 2.2 1.8 2.2zm7.1 1.1c.9 0 1.7-.9 1.7-2.1 0-1.1-.8-2-1.7-2-1 0-1.7.9-1.7 2s.7 2.1 1.7 2.1zM14.9 10c1 0 1.8-1 1.8-2.2 0-1.1-.8-2.1-1.8-2.1S13 6.7 13 7.8c0 1.2.8 2.2 1.9 2.2z" />
//     </svg>
//   );
// }

// export default function PawPalHome() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
//         <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
//             <PawIcon className="h-6 w-6 text-orange-600" />
//             <span className="text-xl">PawPal</span>
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-6 text-sm">
//             <Link className="hover:text-orange-600" to="/">Home</Link>
//             <Link className="hover:text-orange-600" to="/community">Community</Link>
//             <Link className="hover:text-orange-600" to="/about">About Us</Link>
//             <Link
//               to="/login"
//               className="rounded-xl border px-3 py-1.5 hover:bg-gray-50"
//             >
//               Log in
//             </Link>
//             <Link
//               to="/signup"
//               className="rounded-xl bg-orange-600 text-white px-3 py-1.5 hover:bg-orange-700"
//             >
//               Sign up
//             </Link>
//           </nav>

//           {/* Hamburger (top-right) */}
//           <button
//             aria-label="Open menu"
//             onClick={() => setOpen(true)}
//             className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border text-gray-900"
//           >
//             {/* 3 lines */}
//             <span className="sr-only">Open menu</span>
//             <span className="block h-[2px] w-5 bg-current rounded mb-1"></span>
//             <span className="block h-[2px] w-5 bg-current rounded mb-1"></span>
//             <span className="block h-[2px] w-5 bg-current rounded"></span>
//           </button>
//         </div>

//         {/* Mobile drawer (slides from right) */}
//         <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
//           {/* overlay */}
//           <div
//             className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
//             onClick={() => setOpen(false)}
//           />
//           {/* panel */}
//           <div
//             className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-5 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 font-semibold">
//                 <PawIcon className="h-6 w-6 text-orange-600" />
//                 PawPal
//               </div>
//               <button
//                 aria-label="Close menu"
//                 onClick={() => setOpen(false)}
//                 className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"
//               >
//                 ✕
//               </button>
//             </div>
//             <nav className="mt-6 grid gap-1 text-[15px]">
//               <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/">Home</Link>
//               <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/community">Community</Link>
//               <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/about">About Us</Link>
//               <div className="h-px bg-gray-200 my-2" />
//               <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-gray-50" to="/login">Log in</Link>
//               <Link
//                 onClick={() => setOpen(false)}
//                 to="/signup"
//                 className="mt-2 rounded-xl bg-orange-600 text-white px-3 py-2 text-center hover:bg-orange-700"
//               >
//                 Create account
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="relative">
//         {/* background accents */}
//         <div className="absolute inset-x-0 -top-24 -z-10 blur-3xl opacity-30">
//           <div className="mx-auto h-48 max-w-3xl bg-gradient-to-r from-orange-300 to-amber-200 rounded-full"></div>
//         </div>

//         <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 ring-1 ring-orange-200 px-3 py-1 text-xs font-medium">
//               <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
//               Adopt • Foster • Volunteer
//             </div>
//             <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
//               Find your <span className="text-orange-600">new best friend</span> today.
//             </h1>
//             <p className="mt-4 text-gray-600 leading-7">
//               PawPal connects loving humans with verified shelters. Browse pets,
//               book visits, and complete adoptions with a simple, guided flow.
//             </p>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <Link
//                 to="/shelter/pets"
//                 className="rounded-xl bg-orange-600 text-white px-5 py-3 font-semibold hover:bg-orange-700"
//               >
//                 Explore Pets
//               </Link>
//               <Link
//                 to="/signup"
//                 className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
//               >
//                 Create Account
//               </Link>
//             </div>

//             {/* Stats */}
//             <dl className="mt-8 grid grid-cols-3 gap-4 text-center md:text-left md:w-96">
//               <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
//                 <dt className="text-xs text-gray-500">Pets adopted</dt>
//                 <dd className="text-xl font-bold text-gray-900">1,240+</dd>
//               </div>
//               <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
//                 <dt className="text-xs text-gray-500">Shelters</dt>
//                 <dd className="text-xl font-bold text-gray-900">120</dd>
//               </div>
//               <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
//                 <dt className="text-xs text-gray-500">Cities</dt>
//                 <dd className="text-xl font-bold text-gray-900">35</dd>
//               </div>
//             </dl>
//           </div>

//           {/* Hero image/card */}
//           <div className="relative">
//             <div className="rounded-3xl overflow-hidden ring-1 ring-gray-200 shadow-sm bg-white">
//               <img
//                 src="/assets/hero-pet.jpg"
//                 onError={(e) => { e.currentTarget.src = "/assets/hero-pet.jpeg"; }}
//                 alt="Happy dog and cat"
//                 className="h-80 w-full object-cover md:h-[28rem]"
//               />
//             </div>
//             <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-white/90 backdrop-blur ring-1 ring-gray-200 p-4 shadow">
//               <div className="text-sm font-semibold">Verified shelters only</div>
//               <div className="text-xs text-gray-500">Every listing is reviewed by PawPal.</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="mx-auto max-w-7xl px-4 py-10">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why PawPal?</h2>
//         <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           <Feature
//             title="Smart matching"
//             desc="Filter by size, temperament, and lifestyle to find the perfect companion."
//           />
//           <Feature
//             title="Seamless visits"
//             desc="Book appointments with shelters in one click. No endless phone calls."
//           />
//           <Feature
//             title="Safe & transparent"
//             desc="Profiles include health, vaccination, and behavior notes from shelters."
//           />
//         </div>
//       </section>

//       {/* CTA band */}
//       <section className="mx-auto max-w-7xl px-4 pb-16">
//         <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <div className="text-2xl font-bold">Ready to meet your new pal?</div>
//             <p className="text-white/90">Browse nearby shelters and start the adoption journey.</p>
//           </div>
//           <div className="flex gap-3">
//             <Link to="/shelter/pets" className="rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-white/90">
//               View Pets
//             </Link>
//             <Link to="/community" className="rounded-xl border border-white/30 px-5 py-3 font-semibold hover:bg-white/10">
//               Join Community
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t bg-white">
//         <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm">
//           <div className="flex items-center gap-2 text-gray-600">
//             <PawIcon className="h-4 w-4 text-orange-600" />
//             <span>© {new Date().getFullYear()} PawPal</span>
//           </div>
//           <div className="flex gap-4">
//             <Link className="hover:text-orange-600" to="/privacy">Privacy</Link>
//             <Link className="hover:text-orange-600" to="/terms">Terms</Link>
//             <Link className="hover:text-orange-600" to="/contact">Contact</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function Feature({ title, desc }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200 hover:ring-orange-200 hover:shadow-sm transition">
//       <div className="h-9 w-9 rounded-lg bg-orange-100 text-orange-700 grid place-items-center mb-3">
//         <PawIcon className="h-5 w-5" />
//       </div>
//       <div className="font-semibold text-gray-900">{title}</div>
//       <div className="text-sm text-gray-600 mt-1">{desc}</div>
//     </div>
//   );
// }



// src/components/PawPalHome.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/home-hero.png";
import heroFallback from "../assets/hero-fallback.png";
import heroDog from "../assets/hero-dog.png";



/* tiny inline icons */
const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <path strokeWidth="2" d="M20 20l-3.5-3.5" />
  </svg>
);
const CartIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" d="M3 3h2l.8 4M7 13h9l3-7H5.8" />
    <circle cx="9" cy="19" r="1.7" />
    <circle cx="16" cy="19" r="1.7" />
  </svg>
);
const PawIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M11.8 13.1c-2.6-1.9-6.2.1-6.2 2.9 0 2.2 2 3.9 6.2 3.9s6.3-1.7 6.3-3.9c0-2.8-3.6-4.8-6.3-2.9zM6.2 11.4c.9 0 1.7-.9 1.7-2.1 0-1.1-.8-2-1.7-2s-1.7.9-1.7 2 .8 2.1 1.7 2.1zm4.4-1.1c1 0 1.8-1 1.8-2.2 0-1.1-.8-2.1-1.8-2.1s-1.8 1-1.8 2.1c0 1.2.8 2.2 1.8 2.2zm7.1 1.1c.9 0 1.7-.9 1.7-2.1 0-1.1-.8-2-1.7-2-1 0-1.7.9-1.7 2s.7 2.1 1.7 2.1zM14.9 10c1 0 1.8-1 1.8-2.2 0-1.1-.8-2.1-1.8-2.1S13 6.7 13 7.8c0 1.2.8 2.2 1.9 2.2z"/>
  </svg>
);

export default function PawPalHome() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-neutral-900">
      {/* HERO background image + soft vignette */}
      <img
        src="/assets/home-hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-neutral-900/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

      {/* NAVBAR (floating pill) */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 pt-6 flex items-center justify-between">
          {/* brand */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <PawIcon className="h-6 w-6 text-orange-500" />
            <span className="font-semibold text-lg tracking-tight">PawPal</span>
          </Link>

          {/* center nav (desktop) */}
          <nav className="hidden lg:flex items-center justify-center">
            <div className="rounded-full bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/5 px-5 py-2">
              <ul className="flex items-center gap-6 text-sm text-gray-700">
                <li><Link className="hover:text-orange-600" to="/">Homepages</Link></li>
                <li><Link className="hover:text-orange-600" to="/pages">Pages</Link></li>
                <li><Link className="hover:text-orange-600" to="/services">Services</Link></li>
                <li><Link className="hover:text-orange-600" to="/portfolio">Portfolio</Link></li>
                <li><Link className="hover:text-orange-600" to="/blog">Blog</Link></li>
                <li><Link className="hover:text-orange-600" to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </nav>

          {/* right buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow ring-1 ring-black/5 grid place-items-center hover:bg-white">
              <SearchIcon className="h-5 w-5 text-gray-800" />
            </button>
            <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow ring-1 ring-black/5 grid place-items-center hover:bg-white">
              <CartIcon className="h-5 w-5 text-gray-800" />
            </button>
            <Link
              to="/contact"
              className="ml-1 rounded-full bg-white text-gray-900 px-4 py-2 text-sm font-semibold shadow hover:bg-orange-50 ring-1 ring-black/5"
            >
              Get In Touch ✈
            </Link>

                        {/* Right: Login hamburger (works on all breakpoints) */}
<div className="flex items-center">
  <Link
    to="/login"
    aria-label="Log in"
    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 shadow hover:bg-white"
  >
    <span className="sr-only">Log in</span>
    <span className="block h-[2px] w-5 bg-black rounded mb-1"></span>
    <span className="block h-[2px] w-5 bg-black rounded mb-1"></span>
    <span className="block h-[2px] w-5 bg-black rounded"></span>
  </Link>
</div>


          </div>

          {/* mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 ring-1 ring-black/5"
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-5 bg-black rounded mb-1" />
            <span className="block h-[2px] w-5 bg-black rounded mb-1" />
            <span className="block h-[2px] w-5 bg-black rounded" />
          </button>
        </div>

        

        {/* mobile drawer */}
        <div className={`fixed inset-0 z-30 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl transition-transform ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <PawIcon className="h-6 w-6 text-orange-600" /> PawPal
              </div>
              <button className="h-9 w-9 rounded-full hover:bg-gray-100" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            <ul className="mt-6 space-y-2 text-[15px]">
              <li><Link onClick={()=>setMobileOpen(false)} to="/">Homepages</Link></li>
              <li><Link onClick={()=>setMobileOpen(false)} to="/pages">Pages</Link></li>
              <li><Link onClick={()=>setMobileOpen(false)} to="/services">Services</Link></li>
              <li><Link onClick={()=>setMobileOpen(false)} to="/portfolio">Portfolio</Link></li>
              <li><Link onClick={()=>setMobileOpen(false)} to="/blog">Blog</Link></li>
              <li><Link onClick={()=>setMobileOpen(false)} to="/contact">Contact Us</Link></li>
              <div className="h-px bg-gray-200 my-2" />
              <Link
                to="/signup"
                onClick={()=>setMobileOpen(false)}
                className="inline-block rounded-full bg-orange-600 text-white px-4 py-2 font-semibold"
              >
                Sign up
              </Link>
            </ul>
          </div>
        </div>
      </header>

      {/* HERO CONTENT */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-10 items-center">
          {/* Left column: headline & CTAs */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 ring-1 ring-white/30 px-3 py-1 text-xs font-medium backdrop-blur">
              Want to have
            </div>
            <h1 className="mt-5 font-black leading-tight drop-shadow-md text-[36px] sm:text-[44px] md:text-[60px]">
              Good Products<br/>for your <span className="text-orange-400">Pet</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold shadow-lg shadow-orange-500/20"
              >
                Know More ✗
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-white/95 hover:bg-white text-gray-900 px-5 py-3 font-semibold ring-1 ring-black/5"
              >
                Contact Us ✗
              </Link>
            </div>
          </div>

          {/* Right column: framed hero focus (glass card to echo reference) */}
          <div className="hidden md:block">
            <div className="rounded-[24px] bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl h-[440px] w-full"></div>
          </div>
        </div>

        {/* vertical slider dots (decorative) */}
        <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </section>
    </main>
  );
}
