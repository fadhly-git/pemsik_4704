import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { mahasiswaList } from "@/Data/Dummy";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  // State mahasiswa: mahasiswa, setMahasiswa
  const [mahasiswa, setMahasiswa] = useState(mahasiswaList);

  // State selected mahasiswa: selectedMahasiswa, setSelectedMahasiswa
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  // State modal: isModalOpen, setModalOpen
  const [isModalOpen, setIsModalOpen] = useState(false);

  // storeMahasiswa: tambah mahasiswa baru ke state mahasiswa
  const storeMahasiswa = (newMhs) => {
    // Validasi NIM unique
    const exists = mahasiswa.find((m) => m.nim === newMhs.nim);
    if (exists) {
      alert("NIM sudah terdaftar! Gunakan NIM yang berbeda.");
      return false;
    }
    setMahasiswa((prev) => [...prev, newMhs]);
    alert("Data berhasil ditambahkan!");
    return true;
  };

  // updateMahasiswa: update mahasiswa dengan nim dari state mahasiswa
  const updateMahasiswa = (nim, updatedData) => {
    setMahasiswa((prev) =>
      prev.map((mhs) => (mhs.nim === nim ? { ...mhs, ...updatedData } : mhs))
    );
    alert("Data berhasil diperbarui!");
  };

  // deleteMahasiswa: delete mahasiswa dengan nim dari state mahasiswa
  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
    alert("Data berhasil dihapus!");
  };

  // openAddModal: set true pada state modal, set null pada state selected mahasiswa
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setIsModalOpen(true);
  };

  // openEditModal: set true pada state modal, set objek mahasiswa pada state selected mahasiswa dari parameter
  const openEditModal = (mahasiswaObj) => {
    setSelectedMahasiswa(mahasiswaObj);
    setIsModalOpen(true);
  };

  // handleSubmit: kondisi ketika selected mahasiswa terisi maka update, ketika tidak maka tambah baris baru
  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      // Mode Edit: update mahasiswa
      updateMahasiswa(formData.nim, formData);
    } else {
      // Mode Add: tambah mahasiswa baru
      storeMahasiswa(formData);
    }
  };

  // handleDelete: menerima parameter nim mahasiswa untuk dipassing ke deleteMahasiswa
  const handleDelete = (nim) => {
    deleteMahasiswa(nim);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        {/* Memanggil komponen MahasiswaTable dengan passing props */}
        <MahasiswaTable
          mahasiswa={mahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
        />
      </Card>

      {/* Memanggil komponen MahasiswaModal dengan passing props */}
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
