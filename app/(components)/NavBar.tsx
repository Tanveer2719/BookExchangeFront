// components/NavBar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../(assets)/Screenshot 2023-09-10 031318.png";
import profilePic from "../(assets)/profile-user.png";
import cartIcon from "../(assets)/shopping-cart.png";

interface NavBarProps {
  isLoggedIn: boolean;
  cartItemCount: number; // Add a prop for cart item count
  username: string;
}

function NavBar({ isLoggedIn, cartItemCount, username}: NavBarProps) {

 const handlePostAdClick = () => {
    // Navigate to the desired page
    window.location.href = '/addbook'; // Specify the URL of the new page
  };
  const handleRequestBookClick = () => {
    // Navigate to the desired page
    window.location.href = '/request'; // Specify the URL of the new page
  };

  return (
    <nav className="bg-blue-500 p-10 h-32">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">
            <Image
              className="rounded-3xl"
              src={logo}
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search"
            className="w-80 bg-gray-100 px-4 py-2 rounded-md focus:outline-none"
          />
          
          {isLoggedIn ? (
            <>
              <button
                onClick={handlePostAdClick}
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100">
                Post Your Ad
              </button>
              <button
                onClick={handleRequestBookClick}
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100">
                RequestBook
              </button>
              <Link href="/cart">
                {/* Display the "Cart" icon and item count */}
                <div className="relative">
                  <Image
                    src={cartIcon}
                    alt="cart"
                    width={25}
                    height={25}
                  />
                  {cartItemCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </div>
                  )}
                </div>
              </Link>
              <Link href="/profile/">
                <Image src={profilePic} alt="profile" width={25} height={25} />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
