import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";
import { confirmDelete, confirmUpdate, confirmSave } from "@/utils/helpers/swal-helpers";
import { useAuthStateContext } from "@/Context/AuthContext";
import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/utils/hooks/useMahasiswa";
import { getAllKelas } from "@/utils/apis/KelasApi";
import { getAllMataKuliah } from "@/utils/apis/MataKuliahApi";

const Mahasiswa = () => {
  const { user } = useAuthStateContext();
  
  // State untuk kelas dan mata kuliah
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // React Query with pagination
  const {
    data: result = { data: [], total: 0 },
    isLoading,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: perPage,
  });

  const mahasiswaData = result.data;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { mutate: storeMhs } = useStoreMahasiswa();
  const { mutate: updateMhs } = useUpdateMahasiswa();
  const { mutate: deleteMhs } = useDeleteMahasiswa();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data kelas dan mata kuliah
  useEffect(() => {
    setTimeout(() => fetchData(), 500);
  }, []);
  
  const fetchData = async () => {
    try {
      const [resKelas, resMataKuliah] = await Promise.all([
        getAllKelas(),
        getAllMataKuliah(),
      ]);
      setKelas(resKelas.data);
      setMataKuliah(resMataKuliah.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menghitung total SKS mahasiswa
  const getTotalSks = (mhsId) => {
    return kelas
      .filter(k => k.mahasiswa_ids.includes(mhsId))
      .map(k => mataKuliah.find(mk => mk.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((a, b) => a + b, 0);
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setIsModalOpen(true);
  };

  const openEditModal = (mahasiswaObj) => {
    setSelectedMahasiswa(mahasiswaObj);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (selectedMahasiswa) {
      // Update
      const confirmed = await confirmUpdate();
      if (!confirmed) return;

      updateMhs(
        { id: formData.id, data: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      // Create
      const confirmed = await confirmSave(formData.nama);
      if (!confirmed) return;

      // Remove id from payload
      // eslint-disable-next-line no-unused-vars
      const { id, ...payload } = formData;
      
      storeMhs(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteMhs(id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page
  };

  return (
    <>
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Cari nama/NIM..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Sort By Field */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nama">Urutkan: Nama</option>
            <option value="nim">Urutkan: NIM</option>
            <option value="max_sks">Urutkan: Max SKS</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : user?.permission?.includes("mahasiswa.read") ? (
          <>
            <MahasiswaTable
              mahasiswa={mahasiswaData}
              openEditModal={openEditModal}
              onDelete={handleDelete}
              isLoading={isLoading}
              getTotalSks={getTotalSks}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
              totalCount={totalCount}
              isLoading={isLoading}
            />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Anda tidak memiliki akses untuk melihat data mahasiswa</p>
          </div>
        )}
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
};

export default Mahasiswa;
