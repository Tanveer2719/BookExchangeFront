// pages/bookdetails/[id].tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

interface Book {
  bookName: string;
  authorName: string;
  edition: number;
  imageUrl: string;
  publisher: string;
  price: number;
  location: string;
  owner: string;
  description: string;
}



function BookDetails() {
  const {id} = useParams();
  const [message, setMessage] = useState('');
  
  const [book, setBook] = useState<Book | null>(null);
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8000/api/getbook/${id}`)
      .then(response => response.json())
      .then(data => {
        setBook(data); // Assuming data is in the correct format for a single book
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

const goToBuyPage = () => {
  const token = localStorage.getItem('authToken');
  // console.log(token);
  if (token) {
    // User has a valid token, navigate to the buy page
    setMessage('Authorization token exists. Navigating to buy page...');
    window.location.href = `/buy/${id}`;
  } else {
    // User is not authenticated, handle accordingly (e.g., display a message, redirect to login page)
    setMessage('You are not authorized to access this page. Please Log in');
    window.location.href = '/login';
    console.log("User is not authenticated");
  }

};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 border rounded-lg p-6 shadow-xl" data-id={id}>
        <h2 className="text-xl font-bold mb-4">Book Details</h2>
        <img
          src={book.imageUrl}
          alt={book.bookName}
          className="rounded-md"
          style={{ width: '300px', height: '400px' }}
        />
        <h3 className="text-lg font-semibold text-black-600">{book.bookName}</h3>
        <p className="text-sm text-gray-500">
          Author: <span className="highlight">{book.authorName}</span>
        </p>
        <p className="text-sm text-gray-500">Edition: {book.edition}</p>
        <p className="text-sm text-gray-500">Publisher: {book.publisher}</p>
        <div className="mt-2">
          <p className="text-lg font-semibold text-blue-600">
            Tk: {book.price}
          </p>
          <p className="text-gray-500">
          <span className="font-bold">Location:</span> {book.location}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Owner:</span>{book.owner}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Description:</span> {book.description}
          </p>
        </div>

        <button
          onClick={goToBuyPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          BUY
        </button>
        <p style={{ color: 'red', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>{message}</p>
      </div>
    </div>
  );
}

export default BookDetails;
