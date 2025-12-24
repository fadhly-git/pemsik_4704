import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { login } from "@/utils/apis/AuthApi";
import Heading from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { toastError, toastSuccess } from "@/utils/helpers/toast-helper";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect jika sudah login
  if (user) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const userData = await login(email, password);
      setUser(userData); // Simpan ke context + localStorage
      toastSuccess("Login berhasil");
      
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 100); // Beri waktu React update context
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Masukkan email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Masukkan password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <Link href="#" className="text-sm">
            Lupa password?
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link href="#">Daftar</Link>
      </p>
    </Card>
  );
};

export { Login };
