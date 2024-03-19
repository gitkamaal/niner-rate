'use client';
import React, { useState } from 'react';

// Mock data
const mockData = [
  'Course 101',
  'Course 102',
  'Course 201',
  'Course 202',
  'Data Science',
  'Design Patterns',
];

type SearchInputProps = {
  className?: string;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions(mockData.sort().filter((v) => regex.test(v)));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        value={searchTerm}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg placeholder-gray-500" // Adjusted classes here
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {' '}
          {/* Added rounded-lg, mt-1 for margin top, and shadow-lg for a subtle shadow */}
          {suggestions.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
