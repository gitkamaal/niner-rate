import React, { useEffect, useState } from 'react';

interface Instructor {
  _id: string;
  name: string;
}

type SearchInstructorProps = {
  className?: string;
  placeholder?: string;
  searchInstructors: (name: string) => void;
  searchTerm: string;
  resetTrigger: number;
};

const SearchInstructors: React.FC<SearchInstructorProps> = ({
  className,
  placeholder,
  searchInstructors,
  searchTerm,
  resetTrigger,
}) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState<string>(searchTerm);
  const [suggestions, setSuggestions] = useState<Instructor[]>([]);
  const [data, setData] = useState<Instructor[]>([]);

  // Fetch initial data
  useEffect(() => {
    fetch('/api/instructors')
      .then((response) => response.json())
      .then(setData);
  }, []);

  // Reset when trigger changes
  useEffect(() => {
    setInternalSearchTerm(''); // reset the search term
    setSuggestions([]); // clear suggestions
  }, [resetTrigger]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSearchTerm(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      const filtered = data.filter(
        (v) => regex.test(v.name)
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (name: string) => {
    setInternalSearchTerm(name);
    setSuggestions([]);
    searchInstructors(name);
  };

  return (
    <div className={className}>
      <input
        type="search"
        value={internalSearchTerm}
        onChange={onChange}
        className="w-full p-2 mb-4 border hover:border-[#A49665] focus:border-[#A49665] rounded-lg outline-none"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-72 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {suggestions.map((instructor, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSuggestionClick(instructor.name)}
            >
              {instructor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInstructors;
