import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { getDosenById } from "@/utils/apis/DosenApi";
import { toastError } from "@/utils/helpers/toast-helper";

const DosenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dosen, setDosen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDosen = async () => {
      setIsLoading(true);
      try {
        const res = await getDosenById(id);
        setDosen(res.data);
      } catch (error) {
        console.error("Error fetching dosen:", error);
        toastError("Gagal memuat detail dosen");
        navigate("/admin/dosen");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDosen();
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!dosen) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Data dosen tidak ditemukan</p>
            <Button variant="primary" onClick={() => navigate("/admin/dosen")} className="mt-4">
              Kembali ke Daftar Dosen
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate("/admin/dosen")}>
          ← Kembali
        </Button>
      </div>

      <Card className="p-6">
        <Heading level={2} className="mb-6">Detail Dosen</Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">NIP</label>
              <p className="text-lg">{dosen.nip}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Nama Lengkap</label>
              <p className="text-lg">{dosen.nama}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <p className="text-lg">{dosen.email}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Keahlian</label>
              <p className="text-lg">{dosen.keahlian || "-"}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Informasi Tambahan</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">ID:</span> {dosen.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span> Aktif
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DosenDetail;
