# Dokumentasi Fitur CRUD - Week 3

## 📋 Overview

Proyek ini telah dilengkapi dengan fitur CRUD (Create, Read, Update, Delete) untuk mengelola data:
- **Mahasiswa** ✅
- **Dosen** ✅ (Baru)
- **Mata Kuliah** ✅ (Baru)
- **User/Registrasi** ✅ (Ditingkatkan)

## 🎯 Fitur yang Ditambahkan

### 1. **CRUD Dosen**
Halaman pengelolaan data dosen dengan fitur:
- ✅ Tambah data dosen baru
- ✅ Edit data dosen
- ✅ Hapus data dosen
- ✅ Lihat daftar dosen
- ✅ Pencarian dosen (berdasarkan nama, NIP, email, keahlian)
- ✅ Validasi form (NIP, email, dll)
- ✅ Konfirmasi sebelum hapus/update
- ✅ Toast notification untuk feedback

**Lokasi File:**
- `src/Pages/Admin/Dosen/Dosen.jsx` - Component utama
- `src/Pages/Admin/Dosen/DosenModal.jsx` - Modal tambah/edit
- `src/Pages/Admin/Dosen/DosenTable.jsx` - Tabel data
- `src/Pages/Admin/Dosen/DosenDetail.jsx` - Halaman detail (optional)

**Data Fields:**
- NIP (required, read-only saat edit)
- Nama (required)
- Email (required, validasi format)
- Keahlian (optional)

### 2. **CRUD Mata Kuliah**
Halaman pengelolaan data mata kuliah dengan fitur:
- ✅ Tambah mata kuliah baru
- ✅ Edit mata kuliah
- ✅ Hapus mata kuliah
- ✅ Lihat daftar mata kuliah
- ✅ Pencarian mata kuliah (berdasarkan kode, nama, deskripsi)
- ✅ Validasi SKS (1-6) dan Semester (1-8)
- ✅ Konfirmasi sebelum hapus/update
- ✅ Toast notification untuk feedback

**Lokasi File:**
- `src/Pages/Admin/MataKuliah/MataKuliah.jsx` - Component utama
- `src/Pages/Admin/MataKuliah/MataKuliahModal.jsx` - Modal tambah/edit
- `src/Pages/Admin/MataKuliah/MataKuliahTable.jsx` - Tabel data

**Data Fields:**
- Kode Mata Kuliah (required, read-only saat edit)
- Nama Mata Kuliah (required)
- SKS (required, 1-6)
- Semester (optional, 1-8)
- Deskripsi (optional, textarea)

### 3. **Registrasi User (Enhanced)**
Halaman registrasi yang telah ditingkatkan dengan:
- ✅ Field konfirmasi password
- ✅ Pilihan role (mahasiswa, dosen, admin)
- ✅ Validasi lengkap:
  - Nama minimal 3 karakter
  - Format email valid
  - Password minimal 6 karakter
  - Password dan konfirmasi harus sama
- ✅ Cek email duplikat
- ✅ Auto redirect ke login setelah sukses
- ✅ Better error handling
- ✅ Loading state

**Lokasi File:**
- `src/Pages/Auth/Register.jsx`

## 🔌 API Integration

Semua fitur menggunakan **Axios** untuk komunikasi dengan backend:

### API Dosen (`src/utils/apis/DosenApi.jsx`)
```javascript
- getAllDosen() - GET /dosen
- getDosenById(id) - GET /dosen/:id
- getDosenByNip(nip) - GET /dosen?nip=xxx
- storeDosen(data) - POST /dosen
- updateDosen(id, data) - PUT /dosen/:id
- deleteDosen(id) - DELETE /dosen/:id
```

### API Mata Kuliah (`src/utils/apis/MataKuliahApi.jsx`)
```javascript
- getAllMataKuliah() - GET /matakuliah
- getMataKuliah(id) - GET /matakuliah/:id
- getMataKuliahByKode(kode) - GET /matakuliah?kode=xxx
- storeMataKuliah(data) - POST /matakuliah
- updateMataKuliah(id, data) - PUT /matakuliah/:id
- deleteMataKuliah(id) - DELETE /matakuliah/:id
```

### API User (`src/utils/apis/UserApi.jsx`)
```javascript
- registerUser(data) - POST /user
- getUserByEmail(email) - GET /user?email=xxx
- loginUser(credentials) - POST /user/login (jika ada)
```

## 🗺️ Routing

Route baru yang ditambahkan di `src/App.jsx`:

```javascript
/admin/dosen - Halaman CRUD Dosen
/admin/matakuliah - Halaman CRUD Mata Kuliah
/register - Halaman Registrasi User (enhanced)
```

## 🎨 UI/UX Features

### Pencarian & Filter
- Input pencarian real-time
- Filter berdasarkan multiple fields
- Counter hasil pencarian

### Modal Forms
- Responsive design
- Auto-fill untuk mode edit
- Field disabled untuk primary key
- Validasi client-side
- Auto-close setelah submit

### Konfirmasi Actions
- SweetAlert untuk konfirmasi delete/update
- Toast notification untuk feedback
- Loading states

### Sidebar Navigation
- Icon + Text menu
- Active state highlighting
- Responsive mobile-friendly

## 📊 Data Structure

### Dosen (db/dosen.json)
```json
{
  "id": 1,
  "nip": "197001012005011001",
  "nama": "Dr. Siti Nurhaliza, M.Kom",
  "email": "siti.nurhaliza@kampus.ac.id",
  "keahlian": "Artificial Intelligence"
}
```

### Mata Kuliah (db/matakuliah.json)
```json
{
  "id": 1,
  "kode": "IF101",
  "nama": "Algoritma & Pemrograman",
  "sks": 3,
  "semester": 1,
  "deskripsi": "Mata kuliah dasar pemrograman..."
}
```

### User (db/user.json)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "mahasiswa"
}
```

## 🚀 Cara Menjalankan

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Jalankan JSON Server (Backend)**
   ```bash
   npm run server
   # atau
   json-server --watch db.json --port 3001
   ```

3. **Jalankan Vite Dev Server (Frontend)**
   ```bash
   npm run dev
   ```

4. **Akses aplikasi**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔐 Authentication Flow

1. User registrasi di `/register`
2. Data disimpan ke `db/user.json`
3. Redirect ke login `/`
4. Setelah login, akses halaman admin
5. Protected routes dengan `ProtectedRoute` component

## 📦 Component Structure

```
src/
├── Pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx (✅ Enhanced)
│   │   └── AuthLayout.jsx
│   └── Admin/
│       ├── Dashboard/
│       ├── Mahasiswa/
│       ├── Dosen/ (✅ New)
│       │   ├── Dosen.jsx
│       │   ├── DosenModal.jsx
│       │   ├── DosenTable.jsx
│       │   └── DosenDetail.jsx
│       ├── MataKuliah/ (✅ New)
│       │   ├── MataKuliah.jsx
│       │   ├── MataKuliahModal.jsx
│       │   └── MataKuliahTable.jsx
│       └── Kelas/
├── components/
│   └── ui/
│       ├── Sidebar.jsx (✅ Updated)
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Form.jsx
│       ├── Input.jsx
│       └── ...
└── utils/
    ├── AxiosInstance.jsx
    ├── apis/
    │   ├── DosenApi.jsx (✅ Updated)
    │   ├── MataKuliahApi.jsx (✅ Updated)
    │   ├── MahasiswaApi.jsx
    │   └── UserApi.jsx
    └── helpers/
        ├── swal-helpers.jsx
        └── toast-helper.jsx
```

## ✨ Best Practices yang Diterapkan

1. **Separation of Concerns**
   - Modal, Table, dan Main component terpisah
   - API calls dalam file terpisah

2. **Reusable Components**
   - Button, Input, Card, Form components
   - Helper functions untuk toast & swal

3. **Error Handling**
   - Try-catch untuk semua API calls
   - User-friendly error messages
   - Loading states

4. **Validation**
   - Client-side validation
   - Format validation (email, numbers)
   - Required field validation

5. **UX Enhancements**
   - Loading indicators
   - Confirmation dialogs
   - Toast notifications
   - Search functionality

## 🔧 Customization

Untuk mengembangkan lebih lanjut:

1. **Tambah field baru**: Edit Modal component dan data structure
2. **Tambah validasi**: Update handleSubmit di Modal
3. **Tambah fitur export**: Implementasi di main component
4. **Tambah pagination**: Implementasi di Table component
5. **Tambah filter advanced**: Tambah state dan UI untuk filter

## 📝 Notes

- Semua data disimpan di `db.json` (JSON Server)
- Untuk production, ganti dengan real backend API
- Password di user.json sebaiknya di-hash (implementasi tambahan)
- Bisa tambahkan role-based access control
- Bisa tambahkan file upload untuk foto dosen/mahasiswa

## 🐛 Known Issues & Future Improvements

- [ ] Implementasi pagination untuk data banyak
- [ ] Advanced filtering (by semester, by keahlian, dll)
- [ ] Bulk actions (delete multiple, export)
- [ ] Import data dari Excel/CSV
- [ ] Profile dosen dengan foto
- [ ] Relasi mata kuliah dengan dosen pengampu

---

**Author**: Assistant AI  
**Date**: December 17, 2025  
**Version**: 1.0.0
