import { useState, useEffect } from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const MahasiswaModal = ({ isModalOpen, onClose, onSubmit, selectedMahasiswa }) => {
  const [form, setForm] = useState({
    id: null,
    nim: "",
    nama: "",
    status: true,
    max_sks: 0,
  });

  // useEffect: ketika selectedMahasiswa ada maka setForm di isi dengan detail selectedMahasiswanya
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        id: selectedMahasiswa.id ?? null,
        nim: selectedMahasiswa.nim,
        nama: selectedMahasiswa.nama,
        status:
          selectedMahasiswa.status === true ||
          selectedMahasiswa.status === "true" ||
          selectedMahasiswa.status === 1 ||
          selectedMahasiswa.status === "1",
        max_sks: selectedMahasiswa.max_sks || 0,
      });
    } else {
      setForm({
        id: null,
        nim: "",
        nama: "",
        status: true,
        max_sks: 0,
      });
    }
  }, [selectedMahasiswa, isModalOpen]);

  // handleChange: untuk form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handleSubmit dengan validasi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validasi: berikan validasi yang diperlukan
    if (!form.nim || !form.nama || !form.max_sks) {
      alert("NIM, Nama, dan Max SKS wajib diisi");
      return;
    }

    // Validasi NIM: izinkan huruf, angka dan titik (contoh: A11.2022)
    if (!/^[A-Za-z0-9.]+$/.test(form.nim)) {
      alert("NIM hanya boleh berisi huruf, angka, dan titik (contoh: A11.2022)");
      return;
    }

    // Panggil onSubmit dengan parameter state form
    onSubmit(form);

    // Panggil onClose
    onClose();
  };

  // Kondisi ketika isModalOpen false maka null
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Form Modal */}
        <Form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Input NIM */}
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              name="nim"
              id="nim"
              value={form.nim}
              onChange={handleChange}
              readOnly={selectedMahasiswa !== null}
              placeholder="Masukkan NIM"
              required
              className={
                selectedMahasiswa ? "bg-gray-100 cursor-not-allowed" : ""
              }
            />
            {selectedMahasiswa && (
              <p className="text-xs text-gray-500 mt-1">
                NIM tidak dapat diubah
              </p>
            )}
          </div>

          {/* Input Nama */}
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              name="nama"
              id="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>

          {/* Input Max SKS */}
          <div>
            <Label htmlFor="max_sks">Max SKS</Label>
            <Input
              type="number"
              name="max_sks"
              id="max_sks"
              value={form.max_sks}
              onChange={handleChange}
              placeholder="Masukkan Max SKS"
              required
              min="0"
            />
          </div>

          {/* Input Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={form.status}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="status" className="mb-0">
              Status Aktif
            </Label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
