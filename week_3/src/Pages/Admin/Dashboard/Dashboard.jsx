import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useNavigate } from "react-router-dom";
import { modulList } from "@/Data/DummyMateri";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ambil data user dari localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Hitung progress dari localStorage
    const savedModul = localStorage.getItem("modulProgress");
    if (savedModul) {
      const modul = JSON.parse(savedModul);
      const selesai = modul.filter((m) => m.selesai).length;
      const total = modul.length;
      setProgress(Math.round((selesai / total) * 100));
    } else {
      // Jika belum ada, simpan data awal
      localStorage.setItem("modulProgress", JSON.stringify(modulList));
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <Heading as="h2" align="left" className="mb-2">
          Selamat Datang, {user?.name || "Mahasiswa"}! 👋
        </Heading>
        <p className="text-gray-600">
          Mari lanjutkan perjalanan belajar Anda hari ini
        </p>
      </Card>

      {/* Progress Card */}
      <Card>
        <Heading as="h3" align="left" className="mb-4">
          Progress Belajar Anda
        </Heading>
        <ProgressBar progress={progress} />
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            Anda telah menyelesaikan{" "}
            <span className="font-semibold text-blue-600">{progress}%</span>{" "}
            dari total materi
          </p>
          <Button onClick={() => navigate("/admin/kelas")} size="lg">
            Lanjutkan Belajar →
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-4xl font-bold text-blue-600">
            {modulList.length}
          </div>
          <p className="text-gray-600 mt-2">Total Materi</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl font-bold text-green-600">
            {Math.round((progress / 100) * modulList.length)}
          </div>
          <p className="text-gray-600 mt-2">Materi Selesai</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl font-bold text-orange-600">
            {modulList.length - Math.round((progress / 100) * modulList.length)}
          </div>
          <p className="text-gray-600 mt-2">Tersisa</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
