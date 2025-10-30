import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (nim, nama) => {
    if (confirm(`Yakin ingin menghapus data ${nama}?`)) {
      onDelete(nim);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Belum ada data mahasiswa
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs, index) => (
              <tr
                key={mhs.nim}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      mhs.status
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
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(mhs)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(mhs.nim, mhs.nama)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
