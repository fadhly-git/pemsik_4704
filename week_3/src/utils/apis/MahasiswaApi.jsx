import axios from "@/Utils/AxiosInstance";

// Ambil semua mahasiswa dengan pagination
export const getAllMahasiswa = (params = {}) => 
  axios.get("/mahasiswa", { params });

// Ambil 1 mahasiswa
export const getMahasiswa = (id) => axios.get(`/mahasiswa/${id}`);

// Ambil mahasiswa berdasarkan nim (mengembalikan array)
export const getMahasiswaByNim = (nim) =>
	axios.get(`/mahasiswa?nim=${encodeURIComponent(nim)}`);

// Tambah mahasiswa
export const storeMahasiswa = (data) => axios.post("/mahasiswa", data);

// Update mahasiswa
export const updateMahasiswa = (id, data) => axios.put(`/mahasiswa/${id}`, data);

// Hapus mahasiswa
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);