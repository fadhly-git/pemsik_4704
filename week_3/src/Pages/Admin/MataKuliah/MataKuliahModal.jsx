import { useState, useEffect } from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const MataKuliahModal = ({ isModalOpen, onClose, onSubmit, selectedMatkul }) => {
  const [form, setForm] = useState({
    id: null,
    kode: "",
    nama: "",
    sks: "",
    semester: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (selectedMatkul) {
      setForm({
        id: selectedMatkul.id ?? null,
        kode: selectedMatkul.kode,
        nama: selectedMatkul.nama,
        sks: selectedMatkul.sks,
        semester: selectedMatkul.semester || "",
        deskripsi: selectedMatkul.deskripsi || "",
      });
    } else {
      setForm({
        id: null,
        kode: "",
        nama: "",
        sks: "",
        semester: "",
        deskripsi: "",
      });
    }
  }, [selectedMatkul, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.kode || !form.nama || !form.sks) {
      alert("Kode, Nama, dan SKS wajib diisi");
      return;
    }

    // Validasi SKS (hanya angka 1-4)
    const sksValue = parseInt(form.sks);
    if (isNaN(sksValue) || sksValue < 1 || sksValue > 6) {
      alert("SKS harus berupa angka antara 1-6");
      return;
    }

    // Validasi Semester (hanya angka 1-8)
    if (form.semester) {
      const semesterValue = parseInt(form.semester);
      if (isNaN(semesterValue) || semesterValue < 1 || semesterValue > 8) {
        alert("Semester harus berupa angka antara 1-8");
        return;
      }
    }

    onSubmit({
      ...form,
      sks: parseInt(form.sks),
      semester: form.semester ? parseInt(form.semester) : null,
    });
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">
            {selectedMatkul ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="kode">Kode Mata Kuliah *</Label>
            <Input
              type="text"
              name="kode"
              id="kode"
              value={form.kode}
              onChange={handleChange}
              readOnly={selectedMatkul !== null}
              placeholder="Contoh: IF101"
              required
              className={
                selectedMatkul ? "bg-gray-100 cursor-not-allowed" : ""
              }
            />
            {selectedMatkul && (
              <p className="text-xs text-gray-500 mt-1">
                Kode tidak dapat diubah
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="nama">Nama Mata Kuliah *</Label>
            <Input
              type="text"
              name="nama"
              id="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Mata Kuliah"
              required
            />
          </div>

          <div>
            <Label htmlFor="sks">SKS *</Label>
            <Input
              type="number"
              name="sks"
              id="sks"
              value={form.sks}
              onChange={handleChange}
              placeholder="1-6"
              min="1"
              max="6"
              required
            />
          </div>

          <div>
            <Label htmlFor="semester">Semester</Label>
            <Input
              type="number"
              name="semester"
              id="semester"
              value={form.semester}
              onChange={handleChange}
              placeholder="1-8"
              min="1"
              max="8"
            />
          </div>

          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Masukkan deskripsi mata kuliah"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
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

export default MataKuliahModal;
