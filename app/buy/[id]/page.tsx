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

function BUY(){
  const {id} = useParams();
  const [message, setMessage] = useState(''); 
  const [payment, setPaymentType] = useState('HandToHandCash');
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`http://tanveer2719.pythonanywhere.com/api/getbook/${id}`)
      .then(response => response.json())
      .then(data => {
        setBook(data); // Assuming data is in the correct format for a single book
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleConfirmPayment = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
      bookId: id,
    };
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://tanveer2719.pythonanywhere.com/api/sendotp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // The data was successfully sent to the backend
        console.log('book Purchased successfully');
        setMessage('OTP send to Owner email, collect the Otp and type it here'); 
        setShowOtpField(true);
      } else {
          // Handle error
          setMessage('Error in otp sending, please log in again');
          window.location.href = '/login';
          console.error('Error in otp sending');
      }
        // Do something with the response data
    } catch (error) {
        console.error('Error:', error);
      }

    
  };

  const handleOtpChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOtp(e.target.value);
  };

  const handleConfirmOTP = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
    
      const data = {
        bookId: id,
        otp: otp
      };
    
      try {
        const token = localStorage.getItem('authToken');
        console.log(token);
        const response = await fetch('http://tanveer2719.pythonanywhere.com/api/confirmotp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          // The data was successfully sent to the backend
          console.log('book Purchased successfully');
          setMessage('Book Purchased successfully');
          window.location.href = '/home'; 
      } else {
          // Handle error
          setMessage('Error in otp matching');
          console.error('Error in otp matching');
      }
        // Do something with the response data
      } catch (error) {
        console.error('Error:', error);
      }
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96" data-id={id}>
        <h2 className="text-xl font-bold mb-4">BUY BOOK</h2>
        <div className="mb-4">
        <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
          Title
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
          {book.bookName}
        </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Owner
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {book.owner}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
          Price
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
          {book.price} tk.
          </div>
        </div>

        <div className="mb-4">
          <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="type"
          >
              Select Payment Type: 
          </label>
          <select
              id="type"
              name="type"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={payment}
              onChange={(e) => {
                const selectedPayment = e.target.value;
                setPaymentType(selectedPayment);
              }}
              required
          >
              <option value="HandToHandCash">HandToHandCash</option>
          </select>
        </div>

        <div className="mb-4">
            <button
              type="submit"
              onClick={handleConfirmPayment}
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Confirm Payment
            </button>
          </div>

          {showOtpField && (
            <div className="mt-4">
              <label className="block text-gray-600 font-semibold mb-2" htmlFor="otp">
                OTP Verification
              </label>
              <input
                type="number"
                id="otp"
                name="otp"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>
          )}

          {showOtpField && (
            <div className="mb-4">
              <button
                type="submit"
                onClick={handleConfirmOTP}
                className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Confirm OTP
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">
            Message
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            {message} 
          </div>
        </div>

      </div>
    </div>

  );
}
  export default BUY;