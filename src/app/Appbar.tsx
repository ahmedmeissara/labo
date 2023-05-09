import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from 'next/navigation'
import Link from "next/link";

const fetchUser = async (username:any, password:any) => {
  
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json();
};

const Navbar = () => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { data: user, isLoading, isError, error, refetch }:any = useQuery(
    ["users", username, password],
    () => fetchUser(username, password),
    {
      enabled: false,
    }
  );

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const user = await refetch();
      localStorage.setItem("token", user.token); // Store token in localStorage
      router.push("/Ad4O69cwrPVg");
    } catch (error) {
      console.error(error);
    }
  };
  
const handleLogout = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
  router.push("/");
  setUsername("");
  setPassword("");
};


const isLoggedIn = !!token;


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
<nav className="bg-gray-800 rounded-md px-4 py-2 text-sm">
      <ul className="flex justify-between items-center px-4 py-3">
        <li>
          <Link href="/" className="text-gray-200 font-bold">Home
          </Link>
        </li>
        {isLoggedIn && user ? (
          <>
            <li>
              <Link href="/Ad4O69cwrPVg" className="text-gray-200 mx-4">Admin</Link>
            </li>
            <li>
              <span className="text-gray-200">{user.name}</span>
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
        ) : (
          <form onSubmit={handleLogin} className="flex">
            <li>
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-700 text-gray-200 rounded-l-md px-3 py-2 focus:outline-none focus:bg-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-700 text-gray-200 rounded-r-md px-3 py-2 focus:outline-none focus:bg-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
              >
                Login
              </button>
            </li>
          </form>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
