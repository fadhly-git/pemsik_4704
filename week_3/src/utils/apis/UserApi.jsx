import axios from "@/utils/AxiosInstance";

// Registrasi user baru
export const registerUser = (data) => axios.post("/user", data);

// Ambil user berdasarkan email (digunakan sebelum registrasi untuk cek duplikat)
export const getUserByEmail = (email) =>
  axios.get(`/user?email=${encodeURIComponent(email)}`);

// Ambil semua user
export const getAllUsers = () => axios.get("/user");

// Ambil user berdasarkan ID
export const getUserById = (id) => axios.get(`/user/${id}`);

// Tambah user baru (alias untuk registerUser)
export const storeUser = (data) => axios.post("/user", data);

// Update user
export const updateUser = (id, data) => axios.put(`/user/${id}`, data);

// Hapus user
export const deleteUser = (id) => axios.delete(`/user/${id}`);
