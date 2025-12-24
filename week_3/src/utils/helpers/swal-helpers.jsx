import Swal from "sweetalert2";

const confirmAction = async ({
  title = "Konfirmasi",
  text = "Apakah anda yakin?",
  icon = "question",
  confirmButtonText = "Ya",
  cancelButtonText = "Batal",
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};

export const confirmLogout = async () => {
  return confirmAction({
    title: "Yakin ingin logout?",
    text: "Anda akan keluar dari sistem.",
    icon: "warning",
    confirmButtonText: "Ya, logout",
  });
};

export const confirmDelete = async () => {
  return confirmAction({
    title: "Yakin ingin menghapus data ini?",
    text: "Tindakan ini tidak bisa dikembalikan.",
    icon: "warning",
    confirmButtonText: "Ya, hapus",
  });
};

export const confirmUpdate = async () => {
  return confirmAction({
    title: "Yakin ingin memperbarui data ini?",
    text: "Perubahan akan disimpan ke sistem.",
    icon: "question",
    confirmButtonText: "Ya, perbarui",
  });
};

export const confirmSave = async (name = "data ini") => {
  return confirmAction({
    title: `Yakin ingin menyimpan ${name}?`,
    text: "Data akan ditambahkan ke sistem.",
    icon: "question",
    confirmButtonText: "Ya, simpan",
  });
};