import axios from "@/utils/AxiosInstance";

// Ambil semua mata kuliah dengan pagination
export const getAllMataKuliah = (params = {}) => 
  axios.get("/matakuliah", { params });
export const getAllMatakuliah = getAllMataKuliah; // Alias untuk backward compatibility

// Ambil 1 mata kuliah
export const getMataKuliah = (id) => axios.get(`/matakuliah/${id}`);
export const getMatakuliah = getMataKuliah; // Alias untuk backward compatibility

// Ambil mata kuliah berdasarkan kode (mengembalikan array)
export const getMataKuliahByKode = (kode) =>
  axios.get(`/matakuliah?kode=${encodeURIComponent(kode)}`);
export const getMatakuliahByKode = getMataKuliahByKode; // Alias untuk backward compatibility

// Tambah mata kuliah
export const storeMataKuliah = (data) => axios.post("/matakuliah", data);
export const storeMatakuliah = storeMataKuliah; // Alias untuk backward compatibility

// Update mata kuliah
export const updateMataKuliah = (id, data) =>
  axios.put(`/matakuliah/${id}`, data);
export const updateMatakuliah = updateMataKuliah; // Alias untuk backward compatibility

// Hapus mata kuliah
export const deleteMataKuliah = (id) => axios.delete(`/matakuliah/${id}`);
export const deleteMatakuliah = deleteMataKuliah; // Alias untuk backward compatibility

