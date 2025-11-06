import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Accordion } from "@/components/ui/Accordion";
import { ProgressBar } from "@/components/ui/ProgressBar";
import TanyaDosenModal from "@/components/molecules/TanyaDosenModal";
import { modulList } from "@/Data/DummyMateri";
import { toastSuccess, toastInfo } from "@/utils/helpers/toast-helper";

const Kelas = () => {
  const [modul, setModul] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateri, setSelectedMateri] = useState(null);

  useEffect(() => {
    const savedModul = localStorage.getItem("modulProgress");
    if (savedModul) {
      const parsed = JSON.parse(savedModul);
      setModul(parsed);
      calculateProgress(parsed);
    } else {
      setModul(modulList);
      localStorage.setItem("modulProgress", JSON.stringify(modulList));
    }
  }, []);

  const calculateProgress = (modulData) => {
    const selesai = modulData.filter((m) => m.selesai).length;
    const total = modulData.length;
    const progressValue = Math.round((selesai / total) * 100);
    setProgress(progressValue);
  };

  const handleToggleSelesai = (id) => {
    const updatedModul = modul.map((m) =>
      m.id === id ? { ...m, selesai: !m.selesai } : m
    );
    setModul(updatedModul);
    localStorage.setItem("modulProgress", JSON.stringify(updatedModul));
    calculateProgress(updatedModul);

    const modulItem = updatedModul.find((m) => m.id === id);
    if (modulItem.selesai) {
      toastSuccess(`Materi "${modulItem.judul}" ditandai selesai!`);
    } else {
      toastInfo(`Status materi "${modulItem.judul}" direset`);
    }
  };

 
  const handleTanyaDosen = (materiItem) => {
    setSelectedMateri(materiItem);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <Heading as="h2" align="left" className="mb-4">
          Modul Pembelajaran
        </Heading>
        <ProgressBar progress={progress} />
      </Card>

      {/* Accordion Materi */}
      <Card>
        <Accordion
          items={modul}
          onToggleSelesai={handleToggleSelesai}
          onTanyaDosen={handleTanyaDosen}
        />
      </Card>

      {/* Modal Tanya Dosen */}
      <TanyaDosenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        materi={selectedMateri}
      />
    </div>
  );
};

export default Kelas;
