import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";
import { confirmDelete, confirmUpdate, confirmSave } from "@/utils/helpers/swal-helpers";
import { useAuthStateContext } from "@/Context/AuthContext";
import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/utils/hooks/useDosen";

const Dosen = () => {
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
  } = useDosen({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: perPage,
  });

  const dosenData = result.data;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { mutate: storeDosenData } = useStoreDosen();
  const { mutate: updateDosenData } = useUpdateDosen();
  const { mutate: deleteDosenData } = useDeleteDosen();

  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedDosen(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dsn) => {
    setSelectedDosen(dsn);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDosen(null);
  };

  const handleSaveDosen = async (formData) => {
    if (selectedDosen) {
      // Update
      const confirmed = await confirmUpdate();
      if (!confirmed) return;

      updateDosenData(
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
      
      storeDosenData(payload, {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDeleteDosen = async (id) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    deleteDosenData(id);
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
          <Heading level={2}>Data Dosen</Heading>
          {user?.permission?.includes("dosen.create") && (
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
            placeholder="Cari nama/NIP/email..."
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
            <option value="nip">Urutkan: NIP</option>
            <option value="email">Urutkan: Email</option>
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
        ) : user?.permission?.includes("dosen.read") ? (
          <>
            <DosenTable
              dosen={dosenData}
              openEditModal={openEditModal}
              onDelete={handleDeleteDosen}
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
            <p className="text-gray-500">Anda tidak memiliki akses untuk melihat data dosen</p>
          </div>
        )}
      </Card>

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveDosen}
        selectedDosen={selectedDosen}
      />
    </div>
  );
};

export default Dosen;
