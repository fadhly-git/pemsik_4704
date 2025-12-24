# 🔐 Dokumentasi Permission System

## Overview
Sistem permission digunakan untuk mengontrol akses fitur-fitur dalam aplikasi berdasarkan role dan hak akses user.

## Struktur Permission

### Format
```
<resource>.<action>
```

- **resource**: Nama resource/modul (mahasiswa, dosen, matakuliah, user, dll)
- **action**: Tipe aksi yang diizinkan (page, read, create, update, delete)

### Contoh
- `mahasiswa.page` - Izin mengakses halaman mahasiswa
- `mahasiswa.read` - Izin melihat/membaca data mahasiswa
- `mahasiswa.create` - Izin menambah data mahasiswa baru
- `mahasiswa.update` - Izin mengubah data mahasiswa
- `mahasiswa.delete` - Izin menghapus data mahasiswa

## Daftar Permission Lengkap

### Dashboard
- `dashboard.page` - Akses ke halaman dashboard

### Mahasiswa Module
- `mahasiswa.page` - Akses ke halaman mahasiswa
- `mahasiswa.read` - Melihat daftar dan detail mahasiswa
- `mahasiswa.create` - Menambah mahasiswa baru
- `mahasiswa.update` - Edit data mahasiswa
- `mahasiswa.delete` - Hapus data mahasiswa

### Dosen Module
- `dosen.page` - Akses ke halaman dosen
- `dosen.read` - Melihat daftar dosen
- `dosen.create` - Menambah dosen baru
- `dosen.update` - Edit data dosen
- `dosen.delete` - Hapus data dosen

### Mata Kuliah Module
- `matakuliah.page` - Akses ke halaman mata kuliah
- `matakuliah.read` - Melihat daftar mata kuliah
- `matakuliah.create` - Menambah mata kuliah baru
- `matakuliah.update` - Edit data mata kuliah
- `matakuliah.delete` - Hapus data mata kuliah

### User Management Module
- `user.page` - Akses ke halaman user management
- `user.read` - Melihat daftar user
- `user.create` - Menambah user baru
- `user.update` - Edit data user (role, permission, dll)
- `user.delete` - Hapus user

### KRS Module
- `krs.page` - Akses ke halaman KRS
- `krs.read` - Melihat KRS

### Kelas Module
- `kelas.page` - Akses ke halaman kelas

## Role & Permission Presets

### Admin (Super User)
```json
{
  "role": "admin",
  "permission": [
    "dashboard.page",
    "mahasiswa.page", "mahasiswa.read", "mahasiswa.create", "mahasiswa.update", "mahasiswa.delete",
    "dosen.page", "dosen.read", "dosen.create", "dosen.update", "dosen.delete",
    "matakuliah.page", "matakuliah.read", "matakuliah.create", "matakuliah.update", "matakuliah.delete",
    "user.page", "user.read", "user.create", "user.update", "user.delete"
  ]
}
```

**Akses**: Full CRUD semua modul + User Management

### Dosen (Pengajar)
```json
{
  "role": "dosen",
  "permission": [
    "dashboard.page",
    "mahasiswa.page", "mahasiswa.read",
    "matakuliah.page", "matakuliah.read"
  ]
}
```

**Akses**: Dashboard, Read only Mahasiswa & Mata Kuliah

### Mahasiswa
```json
{
  "role": "mahasiswa",
  "permission": [
    "dashboard.page",
    "krs.page", "krs.read"
  ]
}
```

**Akses**: Dashboard, KRS read only

## Implementasi di Kode

### 1. Mengecek Permission di Component

```jsx
import { useAuthStateContext } from "@/Context/AuthContext";

function MyComponent() {
  const { user } = useAuthStateContext();

  return (
    <>
      {/* Cek single permission */}
      {user?.permission?.includes("mahasiswa.create") && (
        <Button>Tambah Mahasiswa</Button>
      )}

      {/* Cek multiple permissions (OR) */}
      {(user?.permission?.includes("mahasiswa.read") || 
        user?.permission?.includes("mahasiswa.update")) && (
        <Table />
      )}

      {/* Cek multiple permissions (AND) */}
      {user?.permission?.includes("mahasiswa.read") && 
       user?.permission?.includes("mahasiswa.update") && (
        <EditableTable />
      )}
    </>
  );
}
```

### 2. Menyembunyikan Menu di Sidebar

```jsx
// src/components/ui/Sidebar.jsx
{user?.permission?.includes("mahasiswa.page") && (
  <NavLink to="/admin/mahasiswa">
    <span>🎓</span>
    <span>Mahasiswa</span>
  </NavLink>
)}
```

### 3. Menyembunyikan Tombol Action

```jsx
// src/Pages/Admin/Mahasiswa/Mahasiswa.jsx
{user?.permission?.includes("mahasiswa.create") && (
  <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
)}
```

### 4. Menyembunyikan Tombol per Row

```jsx
// src/Pages/Admin/Mahasiswa/MahasiswaTable.jsx
<td className="actions">
  {user?.permission?.includes("mahasiswa.update") && (
    <Button onClick={() => onEdit(row)}>Edit</Button>
  )}
  {user?.permission?.includes("mahasiswa.delete") && (
    <Button onClick={() => onDelete(row.id)}>Hapus</Button>
  )}
</td>
```

## Helper Functions

### Membuat Custom Hook untuk Permission Check

```jsx
// src/hooks/usePermission.js
import { useAuthStateContext } from "@/Context/AuthContext";

export const usePermission = () => {
  const { user } = useAuthStateContext();

  const hasPermission = (permission) => {
    return user?.permission?.includes(permission);
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(p => user?.permission?.includes(p));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(p => user?.permission?.includes(p));
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions };
};

// Penggunaan:
const { hasPermission } = usePermission();

{hasPermission("mahasiswa.create") && <Button>Tambah</Button>}
```

## Best Practices

### ✅ DO
1. **Gunakan format permission yang konsisten**: `resource.action`
2. **Cek permission di level UI**: Sembunyikan tombol/menu yang tidak boleh diakses
3. **Jangan hardcode permission**: Simpan di constant atau config
4. **Validasi di backend juga**: Jangan hanya andalkan frontend
5. **Dokumentasikan setiap permission baru**

### ❌ DON'T
1. **Jangan expose sensitive data** meski UI disembunyikan
2. **Jangan lupa validasi permission** saat menambah fitur baru
3. **Jangan gunakan role check** untuk semua kontrol (gunakan permission yang spesifik)
4. **Jangan hardcode role names** di banyak tempat

## Menambah Permission Baru

### 1. Tambahkan ke AVAILABLE_PERMISSIONS
```jsx
// src/Pages/Admin/Users/UserModal.jsx
const AVAILABLE_PERMISSIONS = [
  // ... existing permissions
  { value: "nilai.page", label: "Nilai Page" },
  { value: "nilai.read", label: "Nilai Read" },
  { value: "nilai.create", label: "Nilai Create" },
  { value: "nilai.update", label: "Nilai Update" },
  { value: "nilai.delete", label: "Nilai Delete" },
];
```

### 2. Update di db/user.json
```json
{
  "id": 1,
  "name": "Admin",
  "permission": [
    // ... existing permissions
    "nilai.page",
    "nilai.read",
    "nilai.create",
    "nilai.update",
    "nilai.delete"
  ]
}
```

### 3. Implementasi di Component
```jsx
{user?.permission?.includes("nilai.page") && (
  <NavLink to="/admin/nilai">Nilai</NavLink>
)}
```

## Testing Permission

### Manual Testing
1. Login dengan user yang berbeda role
2. Cek menu yang muncul di sidebar
3. Cek tombol yang muncul di halaman
4. Coba akses URL langsung (e.g., `/admin/mahasiswa`)
5. Verifikasi action buttons (Edit, Delete) sesuai permission

### Console Debug
```javascript
// Di browser console
const user = JSON.parse(localStorage.getItem('user'));
console.log('Current Role:', user.role);
console.log('Permissions:', user.permission);
console.log('Has mahasiswa.create?', user.permission.includes('mahasiswa.create'));
```

## FAQ

### Q: Bagaimana jika user punya role admin tapi tidak punya permission?
A: Permission check tetap dilakukan. Role hanya untuk identifikasi tipe user, bukan untuk kontrol akses.

### Q: Apakah permission bisa di-override di client side?
A: Ya, karena disimpan di localStorage. Ini hanya untuk UX. **Backend harus tetap validasi permission!**

### Q: Bagaimana handle permission untuk nested resources?
A: Gunakan permission yang lebih spesifik, misal:
- `mahasiswa.krs.read` - Lihat KRS mahasiswa
- `mahasiswa.krs.update` - Edit KRS mahasiswa

### Q: Bisa pakai wildcard permission?
A: Bisa dengan custom logic:
```jsx
const hasPermission = (perm) => {
  if (user?.permission?.includes('*')) return true; // Super admin
  if (user?.permission?.includes(`${resource}.*`)) return true; // All access to resource
  return user?.permission?.includes(perm);
};
```

## Security Notes

⚠️ **PENTING**: 
1. Permission check di frontend **hanya untuk UX**
2. Backend **HARUS** validasi setiap request
3. Jangan kirim sensitive data jika user tidak punya akses
4. Implement rate limiting untuk prevent brute force
5. Log setiap aksi yang dilakukan user

## Referensi

- Context API: https://react.dev/reference/react/useContext
- Role-Based Access Control: https://en.wikipedia.org/wiki/Role-based_access_control
- Permission-Based Access Control: https://en.wikipedia.org/wiki/Attribute-based_access_control
