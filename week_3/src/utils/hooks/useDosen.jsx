import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "@/utils/apis/DosenApi";
import { toastSuccess, toastError } from "@/utils/helpers/toast-helper";

// Fetch all dosen with pagination
export const useDosen = (query = {}) =>
  useQuery({
    queryKey: ["dosen", query],
    queryFn: () => getAllDosen(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers?.["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Store dosen
export const useStoreDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error("Error storing dosen:", error);
      toastError("Gagal menambahkan data dosen");
    },
  });
};

// Update dosen
export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error updating dosen:", error);
      toastError("Gagal memperbarui data dosen");
    },
  });
};

// Delete dosen
export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Error deleting dosen:", error);
      toastError("Gagal menghapus data dosen");
    },
  });
};
