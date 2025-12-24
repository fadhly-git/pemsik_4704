import { useState, useEffect } from "react";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const DosenModal = ({ isModalOpen, onClose, onSubmit, selectedDosen }) => {
  const [form, setForm] = useState({
    id: null,
    nip: "",
    nama: "",
    email: "",
    keahlian: "",
  });

  useEffect(() => {
    if (selectedDosen) {
      setForm({
        id: selectedDosen.id ?? null,
        nip: selectedDosen.nip,
        nama: selectedDosen.nama,
        email: selectedDosen.email,
        keahlian: selectedDosen.keahlian || "",
      });
    } else {
      setForm({
        id: null,
        nip: "",
        nama: "",
        email: "",
        keahlian: "",
      });
    }
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nip || !form.nama || !form.email) {
      alert("NIP, Nama, dan Email wajib diisi");
      return;
    }

    // Validasi NIP (hanya angka)
    if (!/^\d+$/.test(form.nip)) {
      alert("NIP hanya boleh berisi angka");
      return;
    }

    // Validasi email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Format email tidak valid");
      return;
    }

    onSubmit(form);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedDosen ? "Edit Dosen" : "Tambah Dosen"}
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
            <Label htmlFor="nip">NIP *</Label>
            <Input
              type="text"
              name="nip"
              id="nip"
              value={form.nip}
              onChange={handleChange}
              readOnly={selectedDosen !== null}
              placeholder="Masukkan NIP"
              required
              className={
                selectedDosen ? "bg-gray-100 cursor-not-allowed" : ""
              }
            />
            {selectedDosen && (
              <p className="text-xs text-gray-500 mt-1">
                NIP tidak dapat diubah
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="nama">Nama *</Label>
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

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan Email"
              required
            />
          </div>

          <div>
            <Label htmlFor="keahlian">Keahlian</Label>
            <Input
              type="text"
              name="keahlian"
              id="keahlian"
              value={form.keahlian}
              onChange={handleChange}
              placeholder="Masukkan Keahlian"
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

export default DosenModal;
