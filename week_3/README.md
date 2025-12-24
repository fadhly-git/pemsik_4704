# 🎓 Sistem Manajemen Akademik dengan Autentikasi & Otorisasi

Aplikasi manajemen akademik berbasis React dengan sistem autentikasi dan otorisasi menggunakan Context API, menampilkan fitur CRUD untuk Mahasiswa, Dosen, Mata Kuliah, dan User Management dengan kontrol akses berbasis role dan permission.

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi
- Login/Logout dengan session management
- Role-based access control (Admin, Dosen, Mahasiswa)
- Permission-based UI rendering
- Protected routes
- Context API untuk state management global

### 👥 User Management
- CRUD User dengan role dan permission
- UI untuk manage permission per user
- Password encryption (basic)
- Validasi: user tidak bisa hapus diri sendiri

### 📊 CRUD Management
- **Mahasiswa**: Manajemen data mahasiswa
- **Dosen**: Manajemen data dosen
- **Mata Kuliah**: Manajemen mata kuliah
- Semua dengan permission control (Create, Read, Update, Delete)

### 🔄 Auto-Sync Database
- Custom JSON Server dengan middleware
- Auto-sync dari `db.json` ke file individual `db/*.json`
- Fix masalah error 404 saat delete data baru

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18+
- npm atau yarn

### Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd week_3
```

2. Install dependencies
```bash
npm install
```

3. Jalankan aplikasi
```bash
npm run dev:all
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:5173
- Backend (JSON Server): http://localhost:3001

## 👤 Akun Testing

| Role | Email | Password | Akses |
|------|-------|----------|-------|
| **Admin** | admin@mail.com | admin123 | Full access ke semua fitur |
| **Dosen** | dosen@mail.com | dosen123 | Read only Mahasiswa & Mata Kuliah |
| **Mahasiswa** | mahasiswa@mail.com | mahasiswa123 | Dashboard & KRS only |

## 📁 Struktur Project

```
week_3/
├── src/
│   ├── Context/
│   │   ├── AuthContext.jsx          # Context untuk autentikasi
│   │   └── AuthStateContext.jsx     # State definition
│   ├── Pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx            # Halaman login
│   │   │   ├── Register.jsx
│   │   │   └── AuthLayout.jsx
│   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   ├── Mahasiswa/           # CRUD Mahasiswa
│   │   │   ├── Dosen/               # CRUD Dosen
│   │   │   ├── MataKuliah/          # CRUD Mata Kuliah
│   │   │   └── Users/               # User Management
│   │   └── Layouts/
│   │       └── Components/
│   │           ├── AdminLayout.jsx
│   │           └── ProtectedRoute.jsx
│   ├── components/
│   │   └── ui/
│   │       ├── Sidebar.jsx          # Sidebar dengan permission control
│   │       ├── Header.jsx           # Header dengan info user
│   │       └── ...
│   └── utils/
│       └── apis/
│           ├── AuthApi.js
│           ├── MahasiswaApi.jsx
│           ├── DosenApi.jsx
│           ├── MataKuliahApi.jsx
│           └── UserApi.jsx
├── db/                               # Database JSON
│   ├── user.json                    # User dengan role & permission
│   ├── mahasiswa.json
│   ├── dosen.json
│   └── matakuliah.json
├── server.cjs                        # Custom JSON Server
├── sync-middleware.cjs               # Middleware auto-sync
├── merge-json.cjs                    # Merge db/*.json ke db.json
└── TESTING_GUIDE.md                  # Panduan testing lengkap
```

## 🔑 Permission System

### Format Permission
Permission menggunakan format: `<resource>.<action>`

### Available Permissions
- `dashboard.page` - Akses dashboard
- `mahasiswa.page`, `mahasiswa.read`, `mahasiswa.create`, `mahasiswa.update`, `mahasiswa.delete`
- `dosen.page`, `dosen.read`, `dosen.create`, `dosen.update`, `dosen.delete`
- `matakuliah.page`, `matakuliah.read`, `matakuliah.create`, `matakuliah.update`, `matakuliah.delete`
- `user.page`, `user.read`, `user.create`, `user.update`, `user.delete`
- `kelas.page`, `krs.page`, `krs.read`

### Implementasi di Komponen
```jsx
import { useAuthStateContext } from "@/Context/AuthContext";

const { user } = useAuthStateContext();

// Contoh: Tampilkan tombol jika punya permission
{user?.permission?.includes("mahasiswa.create") && (
  <Button onClick={handleCreate}>Tambah Mahasiswa</Button>
)}
```

## 🛠️ Teknologi yang Digunakan

- **React 19** - UI Library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **JSON Server** - Mock backend
- **React Hot Toast** - Notifications
- **SweetAlert2** - Konfirmasi dialog
- **Context API** - State management

## 📚 Dokumentasi Lengkap

- [FEATURES.md](./FEATURES.md) - Dokumentasi fitur autentikasi & otorisasi
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Panduan testing lengkap

## 🐛 Troubleshooting

### Data tidak tersimpan di db/*.json
Pastikan menjalankan dengan `npm run dev:all` yang menggunakan custom server dengan auto-sync middleware.

### Error 404 saat delete data baru
Sudah diperbaiki dengan implementasi auto-sync middleware yang langsung sync setiap perubahan.

### Permission tidak berfungsi
Cek `user.permission` di console dan pastikan permission ada di `db/user.json`.

## 📝 License

MIT License - Bebas digunakan untuk pembelajaran dan pengembangan.

## 👨‍💻 Author

Dikembangkan untuk Tugas Week 3 - Pemrograman Web Sistem Informasi
```
