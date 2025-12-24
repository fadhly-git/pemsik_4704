import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/Context/AuthContext";
import "./index.css";

import AuthLayout from "@/Pages/Auth/AuthLayout";
import AdminLayout from "@/Pages/Layouts/Components/AdminLayout";
import ProtectedRoute from "@/Pages/Layouts/Components/ProtectedRoute";
import { Login } from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import Dashboard from "@/Pages/Admin/Dashboard/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail/MahasiswaDetail";
import Dosen from "@/Pages/Admin/Dosen/Dosen";
import MataKuliah from "@/Pages/Admin/MataKuliah/MataKuliah";
import Kelas from "@/Pages/Admin/Kelas/Kelas";
import RencanaStudi from "@/Pages/Admin/Kelas/RencanaStudi";
import Users from "@/Pages/Admin/Users/Users";
import { PageNotFound } from "@/Pages/Error/PageNotFound";
import { Toaster } from "react-hot-toast";

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "kelas",
        element: <Kelas />,
      },
      {
        path: "dosen",
        element: <Dosen />,
      },
      {
        path: "matakuliah",
        element: <MataKuliah />,
      },
      {
        path: "rencana-studi",
        element: <RencanaStudi />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":nim",
            element: <MahasiswaDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
