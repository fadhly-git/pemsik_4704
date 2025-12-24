import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Context/AuthContext";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete, getTotalSks }) => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Max SKS</th>
            <th className="py-2 px-4 text-center">SKS Terpakai</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                Belum ada data mahasiswa
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs, index) => {
              const totalSks = getTotalSks ? getTotalSks(mhs.id) : 0;
              
              return (
                <tr
                  key={mhs.id ?? mhs.nim}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama || mhs.name}</td>
                  <td className="py-2 px-4 text-center">{mhs.max_sks || "-"}</td>
                  <td className="py-2 px-4 text-center">{totalSks}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${mhs.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {mhs.status ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                    >
                      Detail
                    </Button>
                    {user?.permission?.includes("mahasiswa.update") && (
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => openEditModal(mhs)}
                      >
                        Edit
                      </Button>
                    )}
                    {user?.permission?.includes("mahasiswa.delete") && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(mhs.id ?? mhs.nim)}
                      >
                        Hapus
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
