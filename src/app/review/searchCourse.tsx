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
  searchCourses: (term: string) => void;
  searchTerm: string;
};

const SearchCourses: React.FC<SearchInputProps> = ({
  className,
  placeholder,
  searchCourses,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [data, setData] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const onSuggestionClick = (code: string) => {
    setSearchTerm(`${code}`);
    setSuggestions([]); // Hide the suggestions list after clicking on a suggestion
    searchCourses(code); // Pass the selected course to the parent component
  };

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
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={onChange}
        className="  w-full p-2 mb-4 border hover:border-[#A49665] focus:border-[#A49665] rounded-lg outline-none "
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul
          className="  absolute z-10 w-72 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg "
          style={{ zIndex: 1000 }}
        >
          {' '}
          {}
          {suggestions.map((item, index) => (
            <div key={index}>
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSuggestionClick(item.code)}
              >
                {item.code}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCourses;
