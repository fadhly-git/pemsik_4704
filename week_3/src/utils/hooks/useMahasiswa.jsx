import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getMahasiswaByNim,
} from "@/utils/apis/MahasiswaApi";
import { toastSuccess, toastError } from "@/utils/helpers/toast-helper";

// Fetch all mahasiswa with pagination
export const useMahasiswa = (query = {}) =>
  useQuery({
    queryKey: ["mahasiswa", query],
    queryFn: () => getAllMahasiswa(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers?.["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Fetch mahasiswa by NIM
export const useMahasiswaByNim = (nim) =>
  useQuery({
    queryKey: ["mahasiswa", nim],
    queryFn: () => getMahasiswaByNim(nim),
    select: (res) => {
      const data = res?.data;
      return Array.isArray(data) ? data[0] : data;
    },
    enabled: !!nim,
  });

// Store mahasiswa
export const useStoreMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Data mahasiswa berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error("Error storing mahasiswa:", error);
      toastError("Gagal menambahkan data mahasiswa");
    },
  });
};

// Update mahasiswa
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Data mahasiswa berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error updating mahasiswa:", error);
      toastError("Gagal memperbarui data mahasiswa");
    },
  });
};

// Delete mahasiswa
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      toastSuccess("Data mahasiswa berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Error deleting mahasiswa:", error);
      toastError("Gagal menghapus data mahasiswa");
    },
  });
};
