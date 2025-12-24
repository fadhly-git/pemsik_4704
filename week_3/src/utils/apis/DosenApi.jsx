import axios from "@/utils/AxiosInstance";

// Ambil semua dosen dengan pagination
export const getAllDosen = (params = {}) => 
  axios.get("/dosen", { params });

// Ambil 1 dosen berdasarkan id
export const getDosen = (id) => axios.get(`/dosen/${id}`);

// Alias untuk getDosen (untuk konsistensi penamaan)
export const getDosenById = (id) => axios.get(`/dosen/${id}`);

// Ambil dosen berdasarkan NIP (mengembalikan array)
export const getDosenByNip = (nip) =>
  axios.get(`/dosen?nip=${encodeURIComponent(nip)}`);

// Tambah dosen
export const storeDosen = (data) => axios.post("/dosen", data);

// Update dosen
export const updateDosen = (id, data) => axios.put(`/dosen/${id}`, data);

// Hapus dosen
export const deleteDosen = (id) => axios.delete(`/dosen/${id}`);
