import React from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { useParams } from "react-router-dom";
import { getMahasiswaByNim } from "@/utils/apis/MahasiswaApi";
import { useState, useEffect } from "react";
import { toastError } from "@/utils/helpers/toast-helper";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        // Try to query by nim (backend json-server supports /mahasiswa?nim=...)
        const res = await getMahasiswaByNim(nim);
        const data = res.data;
        // API will return array; pick first match
        const found = Array.isArray(data) ? data[0] : data;
        setMahasiswa(found || null);
      } catch (err) {
        console.error(err);
        toastError("Gagal mengambil data mahasiswa: " + (err?.message || err));
      } finally {
        setLoading(false);
      }
    };

    fetchMahasiswa();
  }, [nim]);

  if (loading) return <p className="text-center">Memuat data...</p>;

  if (!mahasiswa) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">
        Detail Mahasiswa
      </Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;
