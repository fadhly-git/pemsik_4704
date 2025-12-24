import { Button } from "@/components/ui/Button";
import { useAuthStateContext } from "@/Context/AuthContext";

const MataKuliahTable = ({ mataKuliah, openEditModal, onDelete }) => {
  const { user } = useAuthStateContext();
  
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700 border-collapse">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left border">No</th>
            <th className="py-3 px-4 text-left border">Kode</th>
            <th className="py-3 px-4 text-left border">Nama Mata Kuliah</th>
            <th className="py-3 px-4 text-center border">SKS</th>
            <th className="py-3 px-4 text-center border">Semester</th>
            <th className="py-3 px-4 text-left border">Deskripsi</th>
            <th className="py-3 px-4 text-center border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mataKuliah.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500 border">
                Belum ada data mata kuliah
              </td>
            </tr>
          ) : (
            mataKuliah.map((mk, index) => (
              <tr
                key={mk.id ?? mk.kode}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{mk.kode}</td>
                <td className="py-2 px-4 border">{mk.nama}</td>
                <td className="py-2 px-4 border text-center">{mk.sks}</td>
                <td className="py-2 px-4 border text-center">
                  {mk.semester || "-"}
                </td>
                <td className="py-2 px-4 border">
                  {mk.deskripsi ? (
                    <span className="text-sm">
                      {mk.deskripsi.length > 50
                        ? mk.deskripsi.substring(0, 50) + "..."
                        : mk.deskripsi}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-2 px-4 border text-center space-x-2">
                  {user?.permission?.includes("matakuliah.update") && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => openEditModal(mk)}
                    >
                      Edit
                    </Button>
                  )}
                  {user?.permission?.includes("matakuliah.delete") && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(mk.id ?? mk.kode)}
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

export default MataKuliahTable;
