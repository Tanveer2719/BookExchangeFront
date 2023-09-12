// components/Sidebar.tsx
import React, { useState } from 'react';

interface SidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  places: string[]; // Array of available places
}

interface FilterOptions {
  giveaway: boolean;
  buy: boolean;
  price: number | null; // Initialize with null
  place: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, places }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    giveaway: false,
    buy: false,
    price: null, // Initialize with null
    place: '', // Initialize with an empty string
  });

  const handleFilterChange = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-2">Filter</h2>
      <div>
        <h3 className="text-sm font-semibold mb-1">Filter by:</h3>
        <div className="mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filters.giveaway}
            onChange={() => setFilters({ ...filters, giveaway: !filters.giveaway })}
          />
          Giveaway
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filters.buy}
            onChange={() => setFilters({ ...filters, buy: !filters.buy })}
          />
          Buy
        </div>
        <div className="mb-2">
          <label>Price:</label>
          <select
            value={filters.price === null ? '' : filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value !== '' ? parseFloat(e.target.value) : null })}
          >
            <option value="">Select Price Range</option>
            <option value="10">Under $10</option>
            <option value="20">Under $20</option>
            {/* Add more price ranges as needed */}
          </select>
        </div>
        <div className="mb-2">
          <label>Place:</label>
          <select
            value={filters.place}
            onChange={(e) => setFilters({ ...filters, place: e.target.value })}
          >
            <option value="">Select Place</option>
            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
