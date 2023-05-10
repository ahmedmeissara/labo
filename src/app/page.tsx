"use client"; // this is a client component 👈🏽
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
const fetchUser = async (username: any, password: any) => {
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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  
    if (token) {
      router.push("/");
    }
  }, []);
  

  const { data: user, refetch }: any = useQuery(
    ["users", username, password],
    () => fetchUser(username, password),
    {
      enabled: false,
    }
  );

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      const user = await refetch();
      localStorage.setItem("token", user.token); // Store token in localStorage
      router.push("/Ad4O69cwrPVg");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

           
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
              <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-md"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="text-blue-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

       
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);
};

export default Login;
