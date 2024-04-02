'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Course {
  _id: string;
  code: string;
  title: string;
}

type SearchInputProps = {
  className?: string;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      const filteredSuggestions = data.filter(
        (v) => regex.test(v.code) || regex.test(v.title)
      );
      setSuggestions(filteredSuggestions.slice(0, 6));
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
        className="w-full px-4 py-2 rounded-lg placeholder-gray-500"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg "
          style={{ zIndex: 1000 }}
        >
          {' '}
          {}
          {suggestions.map((item, index) => (
            <Link key={index} href={`/courses/${item._id}`}>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                {item.code} - {item.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
