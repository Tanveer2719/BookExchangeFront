"use client";

import React, { useState, useEffect } from 'react';
import NavBar from './(components)/NavBar';
import BookCard from './(components)/BookCard';
import Sidebar from './(components)/Sidebar';
import imageURL from './(assets)/book.jpg'

interface Book {
  id:number;
  bookName: string;
  authorName: string;
  edition: number;
  imageUrl: string;
  isGiveaway: boolean;
  price: number;
  place:string;
}

interface FilterOptions {
  giveaway: boolean;
  buy: boolean;
  price: number | null;
  place: string;
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    giveaway: false,
    buy: false,
    price: null, // Initialize with null
    place: '', // Initialize with an empty string
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCartHandler = () => {
    setCartItemCount(cartItemCount + 1);
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/getbooks/')
      .then(response => response.json())
      .then(data => {
        // Assuming data is in the correct format similar to fetchedBooks
        setBooks(data);
  
        // Collect unique categories and places from the book data
        const uniquePlaces: string[] = Array.from(new Set(data.map((book: Book) => {
          return book.place;
        })));
        
        setPlaces(uniquePlaces);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  

  // Filter books based on the selected filters
  const filteredBooks = books.filter((book) => {
    if (filters.giveaway && !book.isGiveaway) {
      return false;
    }
    if (filters.buy && book.isGiveaway) {
      return false;
    }
    if (filters.price !== null && book.price > filters.price) {
      return false;
    }
    if (filters.place && !book.place.toLowerCase().includes(filters.place.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <NavBar isLoggedIn={false} cartItemCount={cartItemCount} username={''} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1">
            <Sidebar onFilterChange={handleFilterChange} places={places} />
          </div>
          <div className="md:col-span-1 lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBooks.map((book, index) => (
                <BookCard
                  key={index}
                  id={book.id}
                  bookName={book.bookName}
                  authorName={book.authorName}
                  imageURL={book.imageUrl}
                  price={book.price}
                  place={book.place}
                  isGiveaway={book.isGiveaway}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
