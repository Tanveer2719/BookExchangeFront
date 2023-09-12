"use client";
import React, { useEffect, useState } from 'react';

interface User {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  institution: string;
  dateOfRegistration: string;
  notifications:string;
  request:string;
  bought:string;
}

function ProfilePage() {
  const [User, setUser] = useState<User | null>(null);
  const [selectedOption, setSelectedOption] = useState('notification');

  const token = localStorage?.getItem('authToken');
  
  useEffect(() => {
    fetch(`http://tanveer2719.pythonanywhere.com/api/getUser/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the header
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data); // Assuming data is in the correct format for a single book
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const goToHome = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = '/home'; 
  };

  if (User) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">USER PROFILE</h2>
          <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Full Name
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.fullname}
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
              Username
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
              {User.username}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
              Email
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.email}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
              Phone
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.phone}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
              Location
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.location}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Institution
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.institution}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            DateOfRegistration
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.dateOfRegistration}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Notifications
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.notifications}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Book Requests
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.request}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Books Bought
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {User.bought}
            </div>
          </div>

            
          <div className="mb-4">
            <button
              type="submit"
              onClick={goToHome}
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Home
            </button>
          </div>
        </div>
      </div>

    );
  else
    return <div>Loading...</div>;
}


export default ProfilePage;
