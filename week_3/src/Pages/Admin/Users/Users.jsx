import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import { confirmDelete, confirmUpdate, confirmSave } from "@/utils/helpers/swal-helpers";
import { toastError, toastSuccess } from "@/utils/helpers/toast-helper";
import { useAuthStateContext } from "@/Context/AuthContext";
import {
  getAllUsers,
  storeUser,
  updateUser,
  deleteUser,
} from "@/utils/apis/UserApi";

const Users = () => {
  const { user } = useAuthStateContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toastError("Gagal memuat data user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users berdasarkan pencarian
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const openAddModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (usr) => {
    setSelectedUser(usr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (formData) => {
    if (selectedUser) {
      // Update
      const confirmed = await confirmUpdate();
      if (confirmed) {
        try {
          await updateUser(formData.id, formData);
          await fetchUsers();
          toastSuccess("Data user berhasil diperbarui");
          closeModal();
        } catch (error) {
          console.error("Error updating user:", error);
          toastError("Gagal memperbarui data user");
        }
      }
    } else {
      // Create
      const confirmed = await confirmSave();
      if (confirmed) {
        try {
          await storeUser(formData);
          await fetchUsers();
          toastSuccess("Data user berhasil ditambahkan");
          closeModal();
        } catch (error) {
          console.error("Error creating user:", error);
          toastError("Gagal menambahkan data user");
        }
      }
    }
  };

  const handleDeleteUser = async (id) => {
    // Cegah user menghapus diri sendiri
    if (user.id === id) {
      toastError("Anda tidak bisa menghapus akun Anda sendiri!");
      return;
    }

    const confirmed = await confirmDelete();
    if (confirmed) {
      try {
        await deleteUser(id);
        await fetchUsers();
        toastSuccess("Data user berhasil dihapus");
      } catch (error) {
        console.error("Error deleting user:", error);
        toastError("Gagal menghapus data user");
      }
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Heading level={2}>Manajemen User</Heading>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-64"
            />
            {user?.permission?.includes("user.create") && (
              <Button variant="primary" onClick={openAddModal}>
                + Tambah
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : user?.permission?.includes("user.read") ? (
          <>
            <UserTable
              users={filteredUsers}
              openEditModal={openEditModal}
              onDelete={handleDeleteUser}
              currentUserId={user.id}
            />
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-4">
                Menampilkan {filteredUsers.length} dari {users.length} data
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Anda tidak memiliki akses untuk melihat data user</p>
          </div>
        )}
      </Card>

      <UserModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Users;
