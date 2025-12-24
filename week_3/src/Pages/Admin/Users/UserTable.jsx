import { Button } from "@/components/ui/Button";
import { useAuthStateContext } from "@/Context/AuthContext";

const UserTable = ({ users, openEditModal, onDelete, currentUserId }) => {
  const { user } = useAuthStateContext();

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      dosen: "bg-blue-100 text-blue-800",
      mahasiswa: "bg-green-100 text-green-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left border">No</th>
            <th className="py-3 px-4 text-left border">Nama</th>
            <th className="py-3 px-4 text-left border">Email</th>
            <th className="py-3 px-4 text-center border">Role</th>
            <th className="py-3 px-4 text-center border">Permissions</th>
            <th className="py-3 px-4 text-center border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500 border">
                Belum ada data user
              </td>
            </tr>
          ) : (
            users.map((usr, index) => (
              <tr
                key={usr.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{usr.name}</td>
                <td className="py-2 px-4 border">{usr.email}</td>
                <td className="py-2 px-4 border text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(usr.role)}`}>
                    {usr.role}
                  </span>
                </td>
                <td className="py-2 px-4 border text-center">
                  <span className="text-xs text-gray-600">
                    {usr.permission?.length || 0} permissions
                  </span>
                </td>
                <td className="py-2 px-4 border text-center space-x-2">
                  {user?.permission?.includes("user.update") && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => openEditModal(usr)}
                    >
                      Edit
                    </Button>
                  )}
                  {user?.permission?.includes("user.delete") && usr.id !== currentUserId && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(usr.id)}
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
