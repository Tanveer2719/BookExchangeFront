"use client";

import Link from "next/link";
import { useState } from "react";
import { fetchUsers } from "../sanity/sanity-utils";

async function fetchUserInfo() {
  const token = localStorage?.getItem('authToken');

  const response = await fetch('http://tanveer2719.pythonanywhere.com/api/userinfo/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response;
}


function Page() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const users = fetchUsers();

    console.log("Username:", username);
    console.log("Password:", password);
    
    try {
      const response = await fetch('http://tanveer2719.pythonanywhere.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,  // Use 'username' instead of 'email'
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.access_token);
        const userInfoResponse = await fetchUserInfo();
        const userInfo = await userInfoResponse.json();
        const userName = userInfo.username;

        setUsername(userName);
        setIsLogged(true);

        console.log(userName);

        // Redirect to the homepage
        window.location.href = '/home/';
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error:', error);
    }


    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login To Continue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="username"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>

        {/* Don't have an account? Sign Up link */}
        <p className="text-gray-600 text-center">
          Dont have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
