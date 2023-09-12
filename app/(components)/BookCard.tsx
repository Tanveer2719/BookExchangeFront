import React from "react";
import Image from "next/image";
// import Link from 'next/link';
import router from "next/router";

interface BookCardProps {
  id:number;
  bookName: string;
  authorName: string;
  imageURL: string;
  price: number;
  place: string;
  isGiveaway: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  bookName,
  authorName,
  imageURL,
  price,
  place,
  isGiveaway,
}) => {
  const displayPrice = isGiveaway ? 0 : price;

  const goToDetails = () => {
    // console.log(id);
    window.location.href=`/bookdetails/${id}`
  };


  return (
    <div className="bg-white border rounded-md p-4 shadow-md" data-id={id}>
      <Image
        src={imageURL}
        alt={bookName}
        className="rounded-md w-full h-auto"
        width={300} // Adjust the width to your desired value
        height={400} // Adjust the height to your desired value
      />
      <h3 className="text-lg font-semibold mt-2">{bookName}</h3>
      <p className="text-sm text-gray-500">{authorName}</p>
      <div className="mt-2">
        <p className="text-lg font-semibold text-blue-600">Tk:{displayPrice}</p>
        <p className="text-gray-500">Location: {place}</p>
        {isGiveaway ? (
          <p className="text-green-600">Giveaway</p>
        ) : (
          <p className="text-red-600">For Sale</p>
        )}
      </div>
      <button
        onClick={goToDetails}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        {isGiveaway ? "View" : "View"}
      </button>
    </div>
  );
};

export default BookCard;
