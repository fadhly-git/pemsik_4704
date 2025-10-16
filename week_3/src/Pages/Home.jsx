import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Header } from "@/components/ui/Header";
import Modal from "@/components/ui/Modal";
import { Sidebar } from "@/components/ui/Sidebar";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-100 flex h-screen">
      <Sidebar>
        <div className="px-6 py-6 text-2xl font-bold"> ADMIN </div>
        <nav className="flex-1 px-2 space-y-2">
          <a
            href="#"
            className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            <span className="mr-3 text-lg">🏠</span> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 rounded-lg bg-blue-800 transition font-semibold"
          >
            <span className="mr-3 text-lg">🎓</span> Mahasiswa
          </a>
        </nav>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <Header>
          <h1 className="text-2xl font-bold text-gray-800">Mahasiswa</h1>
          <div className="ml-auto">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </Header>

        <main className="flex-1 p-8 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow border">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold flex-1">Daftar Mahasiswa</h2>
                <Button
                  id="btnTambah"
                  onClick={() => setOpen(true)}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold"
                >
                  + Tambah Mahasiswa
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr>
                      <th className="bg-blue-800 text-white px-4 py-2 rounded-tl w-1/6">
                        NIM
                      </th>
                      <th className="bg-blue-800 text-white px-4 py-2 w-3/5">
                        Nama
                      </th>
                      <th className="bg-blue-800 text-white px-4 py-2 rounded-tr w-1/6">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2 w-1/6">20211002</td>
                      <td className="px-4 py-2 w-3/5">Ali</td>
                      <td className="px-4 py-2 w-1/6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          Hapus
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 w-1/6">20211003</td>
                      <td className="px-4 py-2 w-3/5">Budi</td>
                      <td className="px-4 py-2 w-1/6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          Hapus
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2 w-1/6">20211004</td>
                      <td className="px-4 py-2 w-3/5">Cici</td>
                      <td className="px-4 py-2 w-1/6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          Hapus
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 w-1/6">20211005</td>
                      <td className="px-4 py-2 w-3/5">Dewi</td>
                      <td className="px-4 py-2 w-1/6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          Hapus
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2 w-1/6">20211001</td>
                      <td className="px-4 py-2 w-3/5">Eko</td>
                      <td className="px-4 py-2 w-1/6">
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                          Edit
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <!-- Modal Overlay --> */}
          <Modal isOpen={open}>
            <div className="flex items-center mb-6">
              <h3 className="text-xl font-bold flex-1">Tambah Mahasiswa</h3>
              <Button
                id="btnCloseModal"
                onClick={() => setOpen(false)}
                className="text-gray-500 text-2xl font-bold hover:text-gray-700 absolute right-6 top-6"
              >
                &times;
              </Button>
            </div>
            <Form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">NIM</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Nama</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  id="btnBatal"
                  onClick={() => setOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    alert("Data tersimpan!");
                    setOpen(false);
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold"
                >
                  Simpan
                </Button>
              </div>
            </Form>
          </Modal>
        </main>
      </div>
    </div>
  );
}
