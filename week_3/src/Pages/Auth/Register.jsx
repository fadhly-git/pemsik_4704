import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { toastError, toastSuccess } from "@/utils/helpers/toast-helper";
import { registerUser, getUserByEmail } from "@/utils/apis/UserApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mahasiswa",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toastError("Semua field wajib diisi");
    }

    // Validasi nama (minimal 3 karakter)
    if (form.name.length < 3) {
      return toastError("Nama minimal 3 karakter");
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toastError("Format email tidak valid");
    }

    // Validasi password (minimal 6 karakter)
    if (form.password.length < 6) {
      return toastError("Password minimal 6 karakter");
    }

    // Validasi password confirmation
    if (form.password !== form.confirmPassword) {
      return toastError("Password dan konfirmasi password tidak cocok");
    }

    setLoading(true);
    try {
      // Cek apakah email sudah terdaftar
      const exists = await getUserByEmail(form.email);
      if (Array.isArray(exists.data) && exists.data.length > 0) {
        setLoading(false);
        return toastError("Email sudah terdaftar. Silakan login atau gunakan email lain.");
      }

      // Kirim data registrasi (tanpa confirmPassword)
      const { confirmPassword, ...dataToSend } = form;
      await registerUser(dataToSend);
      toastSuccess("Registrasi berhasil. Silakan login.");
      
      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "mahasiswa",
      });
      
      // Redirect ke login setelah 1.5 detik
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      toastError("Gagal registrasi: " + (err?.response?.data?.message || err?.message || "Terjadi kesalahan"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Registrasi Akun</Heading>
      <Form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Lengkap *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@email.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
            required
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
        </Button>
      </Form>
      
      <p className="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun?{" "}
        <a href="/" className="text-blue-600 hover:underline font-semibold">
          Login di sini
        </a>
      </p>
    </Card>
  );
};

export default Register;
