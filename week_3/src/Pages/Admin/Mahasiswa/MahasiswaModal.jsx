import { useState, useEffect } from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const MahasiswaModal = ({ isModalOpen, onClose, onSubmit, selectedMahasiswa }) => {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: true,
  });

  // useEffect: ketika selectedMahasiswa ada maka setForm di isi dengan detail selectedMahasiswanya
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim,
        nama: selectedMahasiswa.nama,
        status: selectedMahasiswa.status,
      });
    } else {
      setForm({
        nim: "",
        nama: "",
        status: true,
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
    if (!form.nim || !form.nama) {
      alert("NIM dan Nama wajib diisi");
      return;
    }

    // Validasi NIM harus berupa angka
    if (!/^\d+$/.test(form.nim)) {
      alert("NIM harus berupa angka");
      return;
    }

    // Konfirmasi sebelum submit
    const confirmMessage = selectedMahasiswa
      ? `Yakin ingin mengubah data ${form.nama}?`
      : `Yakin ingin menambahkan data ${form.nama}?`;

    if (!confirm(confirmMessage)) {
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
