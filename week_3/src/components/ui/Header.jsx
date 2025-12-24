import { confirmLogout } from "@/utils/helpers/swal-helpers";
import { toastSuccess } from "@/utils/helpers/toast-helper";
import { Button } from "./Button";
import { useAuthStateContext } from "@/Context/AuthContext";

const Header = () => {
  const { user, setUser } = useAuthStateContext();

  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) return;

    // perform logout
    setUser(null); // Hapus dari context + localStorage
    toastSuccess("Logout berhasil");
    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };


  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Login sebagai: <strong className="text-blue-600">{user?.role}</strong> - {user?.name}
          </p>
        </div>
        <div className="relative">
          <Button
            onClick={toggleProfileMenu}
            className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
          />
          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden z-50"
          >
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };