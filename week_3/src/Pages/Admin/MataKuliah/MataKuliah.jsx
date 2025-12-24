import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";
import { confirmDelete, confirmUpdate, confirmSave } from "@/utils/helpers/swal-helpers";
import { useAuthStateContext } from "@/Context/AuthContext";
import {
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "@/utils/hooks/useMataKuliah";

const MataKuliah = () => {
  const { user } = useAuthStateContext();
  
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
  } = useMataKuliah({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: perPage,
  });

  const mataKuliahData = result.data;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { mutate: storeMataKuliahData } = useStoreMataKuliah();
  const { mutate: updateMataKuliahData } = useUpdateMataKuliah();
  const { mutate: deleteMataKuliahData } = useDeleteMataKuliah();

  const [selectedMatkul, setSelectedMatkul] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedMatkul(null);
    setIsModalOpen(true);
  };

  const openEditModal = (mk) => {
    setSelectedMatkul(mk);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMatkul(null);
  };

  const handleSaveMataKuliah = async (formData) => {
    if (selectedMatkul) {
      // Update
      const confirmed = await confirmUpdate();
      if (!confirmed) return;

      updateMataKuliahData(
        { id: formData.id, data: formData },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    } else {
      // Create
      const confirmed = await confirmSave();
      if (!confirmed) return;

      // eslint-disable-next-line no-unused-vars
      const { id, ...payload } = formData;
      
      storeMataKuliahData(payload, {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDeleteMataKuliah = async (id) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteMataKuliahData(id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Heading level={2}>Data Mata Kuliah</Heading>
          {user?.permission?.includes("matakuliah.create") && (
            <Button variant="primary" onClick={openAddModal}>
              + Tambah
            </Button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Cari nama/kode mata kuliah..."
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
            <option value="kode">Urutkan: Kode</option>
            <option value="sks">Urutkan: SKS</option>
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
        ) : user?.permission?.includes("matakuliah.read") ? (
          <>
            <MataKuliahTable
              mataKuliah={mataKuliahData}
              openEditModal={openEditModal}
              onDelete={handleDeleteMataKuliah}
              isLoading={isLoading}
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
            <p className="text-gray-500">Anda tidak memiliki akses untuk melihat data mata kuliah</p>
          </div>
        )}
      </Card>

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveMataKuliah}
        selectedMatkul={selectedMatkul}
      />
    </div>
  );
};

export default MataKuliah;
