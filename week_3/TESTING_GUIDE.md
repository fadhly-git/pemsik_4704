# Testing Autentikasi dan Otorisasi

## 🚀 Cara Menjalankan

1. Install dependencies (jika belum):
```bash
npm install
```

2. Jalankan aplikasi:
```bash
npm run dev:all
```

Ini akan menjalankan:
- JSON Server di `http://localhost:3001` dengan auto-sync ke file `db/*.json`
- Vite dev server di `http://localhost:5173`

## 👥 Akun Testing

### Admin
- **Email**: admin@mail.com
- **Password**: admin123
- **Permissions**: Semua akses (dashboard, mahasiswa, dosen, matakuliah, user - full CRUD)

### Dosen
- **Email**: dosen@mail.com
- **Password**: dosen123
- **Permissions**: Dashboard, Mahasiswa (read only), Mata Kuliah (read only)

### Mahasiswa
- **Email**: mahasiswa@mail.com
- **Password**: mahasiswa123
- **Permissions**: Dashboard, KRS (read only)

## ✨ Fitur yang Diimplementasikan

### 1. Autentikasi
- ✅ Login dengan email dan password
- ✅ Logout dengan konfirmasi
- ✅ Session persist menggunakan localStorage
- ✅ Auto redirect jika sudah login
- ✅ Protected routes - redirect ke login jika belum login

### 2. Context Management
- ✅ `AuthContext` untuk menyimpan state user global
- ✅ `useAuthStateContext()` hook untuk akses user dari komponen mana saja
- ✅ Auto sync dengan localStorage

### 3. Otorisasi Berbasis Permission
- ✅ **Sidebar**: Menu hanya tampil jika user punya permission `.page`
- ✅ **Header**: Menampilkan nama dan role user yang sedang login
- ✅ **Tombol Tambah**: Hanya tampil jika punya permission `.create`
- ✅ **Tabel Data**: Hanya tampil jika punya permission `.read`
- ✅ **Tombol Edit**: Hanya tampil jika punya permission `.update`
- ✅ **Tombol Hapus**: Hanya tampil jika punya permission `.delete`

### 4. User Management
- ✅ Halaman manajemen user khusus admin
- ✅ CRUD user dengan role dan permission
- ✅ UI untuk memilih/unselect permissions
- ✅ Validasi: user tidak bisa menghapus diri sendiri
- ✅ Password optional saat edit (tidak perlu diisi jika tidak diubah)

### 5. Auto-Sync ke File JSON
- ✅ Custom JSON Server dengan middleware
- ✅ Setiap perubahan data (POST, PUT, DELETE) otomatis sync ke `db/*.json`
- ✅ Fix masalah error 404 saat delete data yang baru dibuat

## 🧪 Skenario Testing

### Skenario 1: Login sebagai Admin
1. Login dengan akun admin
2. Cek semua menu muncul di sidebar (Dashboard, Mahasiswa, Dosen, Mata Kuliah, Users)
3. Masuk ke halaman Mahasiswa
4. Cek tombol "Tambah", "Edit", dan "Hapus" muncul
5. Tambah mahasiswa baru
6. Edit mahasiswa
7. Hapus mahasiswa
8. **Cek file `db/mahasiswa.json`** - perubahan harus tersimpan!

### Skenario 2: Login sebagai Dosen
1. Login dengan akun dosen
2. Cek menu yang muncul: Dashboard, Mahasiswa, Mata Kuliah (tidak ada Users)
3. Masuk ke halaman Mahasiswa
4. Cek tombol "Tambah", "Edit", "Hapus" TIDAK muncul (read only)
5. Coba akses `/admin/users` via URL - harus tidak bisa akses tabel

### Skenario 3: Login sebagai Mahasiswa
1. Login dengan akun mahasiswa
2. Cek menu yang muncul: Hanya Dashboard (tidak ada menu lain)
3. Coba akses `/admin/mahasiswa` via URL - tetap bisa akses (karena ProtectedRoute hanya cek login)
4. Tapi tombol dan tabel tidak muncul karena tidak ada permission

### Skenario 4: User Management (Admin)
1. Login sebagai admin
2. Masuk ke menu Users
3. Tambah user baru dengan role "dosen"
4. Pilih permission yang sesuai (misal: dashboard.page, mahasiswa.page, mahasiswa.read)
5. Simpan
6. Logout dan login dengan user baru tersebut
7. Cek menu dan akses sesuai permission yang diberikan
8. Login kembali sebagai admin
9. Edit user: tambah/kurangi permission
10. Edit user: ubah password
11. **Jangan bisa hapus diri sendiri** - tombol hapus tidak muncul untuk akun sendiri

### Skenario 5: Testing Auto-Sync
1. Login sebagai admin
2. Tambah data mahasiswa baru
3. Buka file `db/mahasiswa.json` - data harus sudah ada
4. Hapus data mahasiswa yang baru dibuat
5. Cek lagi file `db/mahasiswa.json` - data harus sudah terhapus
6. **TIDAK BOLEH ERROR 404** saat delete

## 📂 File-file Penting

- `src/Context/AuthContext.jsx` - Context untuk autentikasi
- `src/Pages/Auth/Login.jsx` - Halaman login dengan context
- `src/Pages/Layouts/Components/ProtectedRoute.jsx` - Route protection
- `src/components/ui/Sidebar.jsx` - Sidebar dengan permission control
- `src/components/ui/Header.jsx` - Header dengan info user
- `src/Pages/Admin/*/` - Semua halaman admin dengan permission control
- `src/Pages/Admin/Users/` - Halaman user management
- `db/user.json` - Database user dengan role dan permission
- `server.cjs` - Custom JSON Server dengan auto-sync
- `sync-middleware.cjs` - Middleware untuk sync db.json ke file individual

## 🔧 Permission Format

Permission menggunakan format: `<resource>.<action>`

Contoh:
- `dashboard.page` - Akses ke halaman dashboard
- `mahasiswa.read` - Baca data mahasiswa
- `mahasiswa.create` - Tambah data mahasiswa
- `mahasiswa.update` - Edit data mahasiswa
- `mahasiswa.delete` - Hapus data mahasiswa
- `user.page` - Akses ke halaman user management

## 💡 Tips Development

1. **Tambah Permission Baru**: Edit `UserModal.jsx` di `AVAILABLE_PERMISSIONS`
2. **Tambah Role Baru**: Edit `UserModal.jsx` di `ROLE_OPTIONS`
3. **Implementasi Permission di Halaman Baru**:
   ```jsx
   import { useAuthStateContext } from "@/Context/AuthContext";
   
   const { user } = useAuthStateContext();
   
   {user?.permission?.includes("resource.action") && (
     <Component />
   )}
   ```

4. **Cek Multiple Permissions**:
   ```jsx
   {(user?.permission?.includes("resource.read") || 
     user?.permission?.includes("resource.update")) && (
     <Component />
   )}
   ```

## 🐛 Troubleshooting

### Data tidak tersimpan di db/*.json
- Pastikan menjalankan dengan `npm run dev:all`
- Pastikan `server.cjs` dan `sync-middleware.cjs` ada
- Cek console server - harus ada log "Synced db.json to individual files..."

### Error 404 saat delete data baru
- Sudah diperbaiki dengan auto-sync middleware
- Data langsung tersimpan dengan ID dari json-server

### Permission tidak berfungsi
- Cek `user.permission` di console: `console.log(user.permission)`
- Pastikan permission ada di `db/user.json`
- Pastikan format permission benar (lowercase, titik pemisah)

### User tidak bisa logout
- Cek `setUser(null)` dipanggil
- Cek localStorage dihapus
- Refresh halaman jika perlu
