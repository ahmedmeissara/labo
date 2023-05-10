import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 rounded-md px-4 py-2 text-sm">
      <ul className="flex justify-between items-center px-4 py-3">
        <li>
          <Link href="/" className="text-gray-200 font-bold">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link href="/Ad4O69cwrPVg" className="text-gray-200 mx-4">
                Admin
              </Link>
            </li>
            <li>
              <button
                className="text-gray-200 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
