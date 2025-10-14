
# 🐾 PawPal — Veterinary Pet Adoption & Management System (MERN)

> A full-stack MERN application that streamlines pet adoption, veterinary appointments, and vaccination tracking with role-based dashboards for Shelter Staff, Pet Seekers/Owners, Veterinarians, and Admins. Project overview adapted from the team's website description PDF.  fileciteturn0file0

---

## ✨ Key Features

- **Pet Listings & Management (Shelter Staff)**
  - CRUD for pet profiles: photos, breed, age, vaccination records, status (Available / Adopted / Reserved)
  - Bulk uploads, filters/sort, PDF export (pet list by shelter/breed/status)



- **RBAC & Admin Portal**
  - Manage Users/Roles (Admin, Shelter Staff, Vet, Pet Seeker/Owner)
  - Manage pet-care articles/education content
  - System metrics & reports

- **Reports (All Modules)**
  - Each module supports PDF generation (history reports, summaries, confirmations)

> Stakeholder flow:
>  1) Shelter Staff registers pets; 2) Pet Seekers submit adoption forms; 3) On approval, seekers become Pet Owners; 4) Owners book vet/vaccine appointments; 5) Vets manage approvals and medical records; 6) Admin oversees users/content.  fileciteturn0file0

---

## 🧱 Tech Stack

- **Frontend:** React (Vite/CRA/Next.js), TypeScript (optional), React Router, Tailwind CSS / MUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + HTTP-only cookies (recommended)
- **Storage/Assets:** Local or S3-compatible storage
- **PDFs:** jsPDF + jspdf-autotable
- **Testing:** Jest + React Testing Library (client), Jest/Supertest (server)
- **Tooling:** ESLint, Prettier, Husky (pre-commit), Commitlint

> Replace or remove libraries as required by your current codebase.

---

