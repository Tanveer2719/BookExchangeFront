"use client";

import { useState } from "react";

function Page() {

  const [bookName, setBookName] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('authToken');
      const response = await fetch('http://tanveer2719.pythonanywhere.com/api/request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookName: bookName,
        }),
      });

      if (response.ok) {
        
        window.location.href = '/home/';
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Submit Book Reqest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="username"
            >
              BookName
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter the Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
