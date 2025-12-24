import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { modulList } from "@/Data/DummyMateri";
import { toastSuccess } from "@/utils/helpers/toast-helper";

// Helper untuk get data dari localStorage
const getStoredProgress = () => {
  try {
    const stored = localStorage.getItem("modulProgress");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return modulList; // Return default jika tidak ada di localStorage
};

// Helper untuk save data ke localStorage
const saveProgress = (data) => {
  try {
    localStorage.setItem("modulProgress", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Fetch modul progress dari localStorage
export const useModulProgress = () =>
  useQuery({
    queryKey: ["modulProgress"],
    queryFn: () => Promise.resolve(getStoredProgress()),
    staleTime: Infinity,
  });

// Toggle selesai status dengan localStorage
export const useToggleSelesai = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      // Simulasi API call dengan delay
      return new Promise((resolve) => {
        setTimeout(() => resolve({ id }), 100);
      });
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["modulProgress"] });

      // Snapshot previous value
      const previousModul = queryClient.getQueryData(["modulProgress"]);

      // Cek apakah modul sudah selesai
      const currentModul = previousModul?.find((m) => m.id === id);
      if (currentModul?.selesai) {
        // Jika sudah selesai, jangan lakukan apa-apa
        return { previousModul, shouldUpdate: false };
      }

      // Optimistically update - hanya set ke true (tidak toggle)
      const updatedModul = previousModul.map((m) =>
        m.id === id ? { ...m, selesai: true } : m
      );
      
      queryClient.setQueryData(["modulProgress"], updatedModul);
      
      // Save to localStorage
      saveProgress(updatedModul);

      return { previousModul, shouldUpdate: true };
    },
    onError: (_err, _id, context) => {
      // Rollback on error
      if (context?.previousModul) {
        queryClient.setQueryData(["modulProgress"], context.previousModul);
        saveProgress(context.previousModul);
      }
    },
    onSuccess: (_data, id, context) => {
      if (!context?.shouldUpdate) return;

      const modul = queryClient
        .getQueryData(["modulProgress"])
        ?.find((m) => m.id === id);

      if (modul?.selesai) {
        toastSuccess(`Materi "${modul.judul}" ditandai selesai!`);
      }
    },
    onSettled: () => {
      // Re-read from localStorage untuk memastikan sinkronisasi
      const currentData = getStoredProgress();
      queryClient.setQueryData(["modulProgress"], currentData);
    },
  });
};

// Calculate progress
export const useProgress = () => {
  const { data: modul = [] } = useModulProgress();

  const selesai = modul.filter((m) => m.selesai).length;
  const total = modul.length;
  const progress = total > 0 ? Math.round((selesai / total) * 100) : 0;

  return { progress, selesai, total };
};
