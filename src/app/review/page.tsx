'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import SearchCourses from './searchCourse'; // Import the SearchCourses component

type AlertVariant = 'default' | 'destructive';

const Page: React.FC = () => {
  // Always call useSession at the top, along with useState hooks
  const { data: session } = useSession();

  // Initialize all state variables at the top, unconditionally
  const [courseName, setCourseName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Guard clause after all hooks
  if (!session) {
    return <div>Session is not available</div>;
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implementation remains unchanged
    try {
      // Fetch the course by its name from the server
      const courseResponse = await fetch(
        `/api/courseByName?code=${courseName}`
      );
      const courseData = await courseResponse.json();

      if (!courseData._id) {
        console.error('No matching course found for name:', courseName);
        return;
      }

      // Send the form data to the server
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: courseData._id,
          studentName: session.user.firstName,
          rating,
          review,
          userId: session.user.id,
        }),
      });

      // Check if the response is successful
      if (response.ok) {
        // Reset form fields on successful submission
        setCourseName('');
        setStudentName('');
        setRating(null);
        setReview('');
        setSearchTerm(''); // Reset the search term (not working currently)
        console.log('submitted');
        // Handle success, e.g., show a success message
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to submit review:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  // Function to handle clicking on a star
  const handleStarClick = (index: number) => {
    setRating(index + 1); // Increment index to make rating start from 1
  };

  // Function to handle course search
  const handleCourseSearch = (selectedCourse: string) => {
    setCourseName(selectedCourse); // Set the selected course name
    setSearchTerm(selectedCourse); // Update the search term
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="border shadow-md rounded-lg px-5 py-5 bg-white"
        >
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Review a Course
            </h1>
          </div>
          <div>
            <label>
              Course Name:
              <SearchCourses
                placeholder="Search for a course..."
                searchCourses={handleCourseSearch}
                searchTerm={searchTerm}
              />
            </label>
            <label style={{ display: 'none' }}>
              Selected Course:
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full p-2 mb-4 hover:border-[#A49665] focus:border-[#A49665] border rounded-lg outline-none"
              />
            </label>
          </div>
          <div>
            <label>
              Student Name:
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-2 mb-4 border hover:border-[#A49665] focus:border-[#A49665] rounded-lg outline-none"
              />
            </label>
          </div>
          <div>
            <label>Rating:</label>
            <div className="flex mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 cursor-pointer ${
                    index < (rating || 0)
                      ? 'fill-current text-yellow-500'
                      : 'text-gray-400'
                  }`}
                  viewBox="0 0 24 24"
                  onClick={() => handleStarClick(index)}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              ))}
            </div>
          </div>
          <div>
            <label>
              Review:
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 mb-4 h-32 hover:border-[#A49665] focus:border-[#A49665] border rounded-lg outline-none"
              />
            </label>
          </div>
          <div className="mt-1 flex justify-center bg-[#005035] hover:bg-[#A49665] text-white focus:border-[#A49665] transition-colors duration-500 border outline-none rounded-lg px-3 py-2">
            <button type="submit">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
