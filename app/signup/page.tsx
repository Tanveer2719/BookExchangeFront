"use client";

// pages/signup.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Dropzone from "react-dropzone";

import uploadLogo from "../(assets)/upload.png";

import Image from "next/image";

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profileImage: File | null;
  institution: string;
  phoneNo: string;
  place:string;
  upzilla:string;
  district:string;
}

function SignupPage() {
  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    profileImage: null,
    institution: "",
    phoneNo: "",
    place: "",
    upzilla: "",
    district: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^01[3-9]\d{8}$/; // Regex for Bangladeshi mobile numbers
    
    return regex.test(phoneNumber);
  }

  const handleImageDrop = (acceptedFiles: File[]) => {
    setFormData({
      ...formData,
      profileImage: acceptedFiles[0],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validatePhoneNumber(formData.phoneNo)) {
      // Valid Bangladeshi phone number, proceed with form submission
      try {
        // const token = localStorage?.getItem('authToken');

        const response = await fetch('http://tanveer2719.pythonanywhere.com/api/signup/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Token ${token}`,
          },
          body: JSON.stringify(formData),
          credentials: 'include', // Make sure credentials are included
        });

        if (response.ok) {
          // The data was successfully sent to the backend
          console.log('Data sent successfully');
          window.location.href = '/login/'; 
        } else {
          // Handle error
          console.error('Error sending data to backend');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
    } else {
      // Invalid phone number
      console.log("Invalid phone number");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your preffered username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="institution"
            >
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your institution"
              value={formData.institution}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="phoneNo"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your phoneNo(11 digits)"
              value={formData.phoneNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="place"
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your location"
              value={formData.place}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="upzilla"
            >
              Upzilla
            </label>
            <input
              type="text"
              id="upzilla"
              name="upzilla"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your upzilla"
              value={formData.upzilla}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="district"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your district"
              value={formData.district}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Already have an account? Login link */}
        <p className="text-gray-600 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
