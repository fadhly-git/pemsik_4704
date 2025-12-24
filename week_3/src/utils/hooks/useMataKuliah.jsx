import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "@/utils/apis/MataKuliahApi";
import { toastSuccess, toastError } from "@/utils/helpers/toast-helper";

// Fetch all mata kuliah with pagination
export const useMataKuliah = (query = {}) =>
  useQuery({
    queryKey: ["matakuliah", query],
    queryFn: () => getAllMataKuliah(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers?.["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Store mata kuliah
export const useStoreMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Data mata kuliah berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error("Error storing mata kuliah:", error);
      toastError("Gagal menambahkan data mata kuliah");
    },
  });
};

// Update mata kuliah
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Data mata kuliah berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error updating mata kuliah:", error);
      toastError("Gagal memperbarui data mata kuliah");
    },
  });
};

// Delete mata kuliah
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      toastSuccess("Data mata kuliah berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Error deleting mata kuliah:", error);
      toastError("Gagal menghapus data mata kuliah");
    },
  });
};
