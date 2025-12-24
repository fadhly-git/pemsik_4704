import { Button } from "@/components/ui/Button";
import { useAuthStateContext } from "@/Context/AuthContext";

const DosenTable = ({ dosen, openEditModal, onDelete }) => {
  const { user } = useAuthStateContext();
  
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left border">No</th>
            <th className="py-3 px-4 text-left border">NIP</th>
            <th className="py-3 px-4 text-left border">Nama</th>
            <th className="py-3 px-4 text-left border">Email</th>
            <th className="py-3 px-4 text-left border">Keahlian</th>
            <th className="py-3 px-4 text-center border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dosen.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500 border">
                Belum ada data dosen
              </td>
            </tr>
          ) : (
            dosen.map((dsn, index) => (
              <tr
                key={dsn.id ?? dsn.nip}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{dsn.nip}</td>
                <td className="py-2 px-4 border">{dsn.nama}</td>
                <td className="py-2 px-4 border">{dsn.email}</td>
                <td className="py-2 px-4 border">{dsn.keahlian || "-"}</td>
                <td className="py-2 px-4 border text-center space-x-2">
                  {user?.permission?.includes("dosen.update") && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => openEditModal(dsn)}
                    >
                      Edit
                    </Button>
                  )}
                  {user?.permission?.includes("dosen.delete") && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(dsn.id ?? dsn.nip)}
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

export default DosenTable;
