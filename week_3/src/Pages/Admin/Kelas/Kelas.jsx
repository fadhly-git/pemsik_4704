import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Accordion } from "@/components/ui/Accordion";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import TanyaDosenModal from "@/components/molecules/TanyaDosenModal";
import { useModulProgress, useToggleSelesai, useProgress } from "@/utils/hooks/useKelas";
import { useQueryClient } from "@tanstack/react-query";
import { toastInfo } from "@/utils/helpers/toast-helper";

const Kelas = () => {
  const queryClient = useQueryClient();
  const { data: modul = [], isLoading } = useModulProgress();
  const { progress } = useProgress();
  const { mutate: toggleSelesai } = useToggleSelesai();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateri, setSelectedMateri] = useState(null);

  const handleToggleSelesai = (id) => {
    toggleSelesai(id);
  };

  const handleResetProgress = () => {
    localStorage.removeItem("modulProgress");
    queryClient.invalidateQueries({ queryKey: ["modulProgress"] });
    toastInfo("Progress direset ke awal");
  };
 
  const handleTanyaDosen = (materiItem) => {
    setSelectedMateri(materiItem);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Heading as="h2" align="left" className="mb-4">
              Modul Pembelajaran
            </Heading>
            <ProgressBar progress={progress} />
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleResetProgress}
            className="ml-4"
          >
            🔄 Reset Progress
          </Button>
        </div>
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
