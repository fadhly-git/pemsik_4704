import { useState } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/Button";
import { toastSuccess } from "@/utils/helpers/toast-helper";

const TanyaDosenModal = ({ isOpen, onClose, materi }) => {
  const [pertanyaan, setPertanyaan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pertanyaan.trim()) {
      toastSuccess(`Pertanyaan tentang "${materi?.judul}" berhasil dikirim!`);
      setPertanyaan("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold flex-1">Tanya Dosen</h3>
        <button
          onClick={onClose}
          className="text-gray-500 text-2xl font-bold hover:text-gray-700 absolute right-6 top-6"
        >
          &times;
        </button>
      </div>

      {materi && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Materi:</p>
          <p className="font-semibold text-gray-800">{materi.judul}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Pertanyaan Anda
          </label>
          <textarea
            value={pertanyaan}
            onChange={(e) => setPertanyaan(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            placeholder="Tulis pertanyaan Anda di sini..."
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="primary">
            Kirim Pertanyaan
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TanyaDosenModal;
