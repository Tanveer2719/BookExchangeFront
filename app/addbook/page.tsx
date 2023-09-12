"use client";

// pages/signup.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Dropzone from "react-dropzone";

import uploadLogo from "../(assets)/upload.png";

import Image from "next/image";

interface Author {
    name: string;
    profileLink: string;
  }
  

interface AddBookData {
  title: string;
  edition: number;
  publisher: string;
  description: string;
  image: string;
  type: string;
  price: number;
  numAuthors: number;
  authors: Author[];
}

function addBookPage() {
  const [formData, setFormData] = useState<AddBookData>({
    title: "",
    edition: 0,
    publisher: "",
    description: "",
    image: "",
    type: "buy", 
    price:0,
    numAuthors : 0,
    authors: [],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
    ...formData,
    [name]: value,
    });
  };

  const generateAuthorInputs = () => {
    const numAuthors = parseInt(formData.numAuthors.toString(), 10);
    const newAuthors = [];
    for (let i = 0; i < numAuthors; i++) {
      newAuthors.push({ name: "", profileLink: "" });
    }
    setFormData({
      ...formData,
      authors: newAuthors,
    });
  };

  const handleAuthorInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index][name as keyof Author] = value;
    setFormData({
      ...formData,
      authors: updatedAuthors,
    });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);

    try {
    const token = localStorage.getItem('authToken');

    const response = await fetch('http://tanveer2719.pythonanywhere.com/api/addbook/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        // The data was successfully sent to the backend
        console.log('Data sent successfully');
        window.location.href = '/home'; 
    } else {
        // Handle error
        console.error('Error sending data to backend');
    }
    } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Book Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="edition"
            >
              Edition
            </label>
            <input
              type="number"
              id="edition"
              name="edition"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Book Edition"
              value={formData.edition}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="publisher"
            >
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter publisher name"
              value={formData.publisher}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numAuthors" className="block text-gray-600 font-semibold mb-2">
              Number of Authors:
            </label>
            <input
              type="number"
              id="numAuthors"
              name="numAuthors"
              min="1"
              value={formData.numAuthors}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={generateAuthorInputs}
            >
              Generate Author Inputs
            </button>
          </div>
          {formData.authors.map((author, index) => (
            <div key={index}>
              <label htmlFor="numAuthors" className="block text-gray-600 font-semibold mb-2">
              Author Name:
            </label>
            <input
                type="text"
                id={`authorName${index}`}
                name={`name`}  // Use the actual property name from Author type
                value={author.name}
                onChange={(e) => handleAuthorInputChange(e, index)}
                placeholder="Enter author name"
              />
              <label htmlFor="numAuthors" className="block text-gray-600 font-semibold mb-2">
              Author Profile Link
            </label>
            <input
              type="text"
              id={`authorLink${index}`}
              name={`profileLink`}  // Use the actual property name from Author type
              value={author.profileLink}
              onChange={(e) => handleAuthorInputChange(e, index)}
              placeholder="Enter author profile Link"
            />
            </div>
          ))}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Give a breif description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="type"
                >
                    Ad Type
                </label>
                <select
                    id="type"
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                >
                    <option value="buy">Buy</option>
                </select>
            </div>

            {formData.type === "buy" && (
                <div className="mb-4">
                    <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="price"
                    >
                    Price
                    </label>
                    <input
                    type="text"
                    id="price"
                    name="price"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    />
                </div>
            )}

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="image"
            >
              ImageUrl
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter image url"
              value={formData.image}
              onChange={handleInputChange}
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

export default addBookPage;
