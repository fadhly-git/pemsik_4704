import { useState, useEffect } from "react";
import Modal  from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const AVAILABLE_PERMISSIONS = [
  { value: "dashboard.page", label: "Dashboard Page" },
  { value: "mahasiswa.page", label: "Mahasiswa Page" },
  { value: "mahasiswa.read", label: "Mahasiswa Read" },
  { value: "mahasiswa.create", label: "Mahasiswa Create" },
  { value: "mahasiswa.update", label: "Mahasiswa Update" },
  { value: "mahasiswa.delete", label: "Mahasiswa Delete" },
  { value: "dosen.page", label: "Dosen Page" },
  { value: "dosen.read", label: "Dosen Read" },
  { value: "dosen.create", label: "Dosen Create" },
  { value: "dosen.update", label: "Dosen Update" },
  { value: "dosen.delete", label: "Dosen Delete" },
  { value: "matakuliah.page", label: "Mata Kuliah Page" },
  { value: "matakuliah.read", label: "Mata Kuliah Read" },
  { value: "matakuliah.create", label: "Mata Kuliah Create" },
  { value: "matakuliah.update", label: "Mata Kuliah Update" },
  { value: "matakuliah.delete", label: "Mata Kuliah Delete" },
  { value: "kelas.page", label: "Kelas Page" },
  { value: "krs.page", label: "KRS Page" },
  { value: "krs.read", label: "KRS Read" },
  { value: "user.page", label: "User Page" },
  { value: "user.read", label: "User Read" },
  { value: "user.create", label: "User Create" },
  { value: "user.update", label: "User Update" },
  { value: "user.delete", label: "User Delete" },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "dosen", label: "Dosen" },
  { value: "mahasiswa", label: "Mahasiswa" },
];

const UserModal = ({ isModalOpen, onClose, onSubmit, selectedUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mahasiswa",
    permission: [],
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        ...selectedUser,
        password: "", // Don't show password
        permission: selectedUser.permission || [],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "mahasiswa",
        permission: [],
      });
    }
  }, [selectedUser, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionValue) => {
    setFormData((prev) => {
      const permissions = prev.permission || [];
      if (permissions.includes(permissionValue)) {
        return {
          ...prev,
          permission: permissions.filter((p) => p !== permissionValue),
        };
      } else {
        return {
          ...prev,
          permission: [...permissions, permissionValue],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Jika update dan password kosong, hapus field password
    const dataToSubmit = { ...formData };
    if (selectedUser && !dataToSubmit.password) {
      delete dataToSubmit.password;
    }
    
    onSubmit(dataToSubmit);
  };

  const handleSelectAllPermissions = () => {
    setFormData((prev) => ({
      ...prev,
      permission: AVAILABLE_PERMISSIONS.map((p) => p.value),
    }));
  };

  const handleDeselectAllPermissions = () => {
    setFormData((prev) => ({
      ...prev,
      permission: [],
    }));
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title={selectedUser ? "Edit User" : "Tambah User"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">
            Password {selectedUser && "(kosongkan jika tidak diubah)"}
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required={!selectedUser}
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Permissions</Label>
            <div className="space-x-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleSelectAllPermissions}
              >
                Select All
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleDeselectAllPermissions}
              >
                Deselect All
              </Button>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {AVAILABLE_PERMISSIONS.map((perm) => (
                <label key={perm.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.permission?.includes(perm.value)}
                    onChange={() => handlePermissionChange(perm.value)}
                    className="rounded"
                  />
                  <span className="text-sm">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {formData.permission?.length || 0} permissions dipilih
          </p>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="primary">
            {selectedUser ? "Update" : "Simpan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
