'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import SearchCourses from './searchCourse'; // Import the SearchCourses component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SearchInstructors from './searchInstructor';

type AlertVariant = 'default' | 'destructive';

const Page: React.FC = () => {
  // Always call useSession at the top, along with useState hooks
  const { data: session } = useSession();

  // Initialize all state variables at the top, unconditionally
  const [courseName, setCourseName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [resetTrigger, setResetTrigger] = useState(0);
  const [alert, setAlert] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: AlertVariant | null; // Use the AlertVariant type here
  }>({ show: false, title: '', description: '', type: null });

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

      // prompt user if course name field is empty
      if (!courseName.trim()) {
        setAlert({
          show: true,
          title: 'Error',
          description: 'Please provide a course name.',
          type: 'destructive',
        });
        setTimeout(
          () => setAlert({ show: false, title: '', description: '', type: null }),
          5000
        );
        return;
      }
      // prompt user if instructor name field is empty
      if (!instructorName.trim()) {
        setAlert({
          show: true,
          title: 'Error',
          description: 'Please provide a instructor name.',
          type: 'destructive',
        });
        setTimeout(
          () => setAlert({ show: false, title: '', description: '', type: null }),
          5000
        );
        return;
      }
      // prompt user if rating field is empty
      if (!rating || rating === 0) {
        setAlert({
          show: true,
          title: 'Error',
          description: 'Please provide a rating.',
          type: 'destructive',
        });
        setTimeout(
          () => setAlert({ show: false, title: '', description: '', type: null }),
          5000
        );
        return;
      }
      // prompt user if review field is empty
      if (!review.trim()) {
        setAlert({
          show: true,
          title: 'Error',
          description: 'Please provide a review.',
          type: 'destructive',
        });
        setTimeout(
          () => setAlert({ show: false, title: '', description: '', type: null }),
          5000
        );
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
          studentName: studentName || 'Anonymous',
          instructorName,
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
        setInstructorName('');
        setRating(null);
        setReview('');
        setSearchTerm(''); // Reset the search term (not working currently)
        setResetTrigger((rt) => rt + 1);
        setAlert({
          show: true,
          title: 'Success',
          description: 'Your review has been submitted successfully.',
          type: 'default',
        });
        setTimeout(
          () =>
            setAlert({ show: false, title: '', description: '', type: null }),
          5000
        );
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Error',
        description: 'Failed To Submit Review',
        type: 'destructive',
      });
      setTimeout(
        () => setAlert({ show: false, title: '', description: '', type: null }),
        5000
      );
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

  const handleInstructorSearch = (selectedInstructor: string) => {
    setInstructorName(selectedInstructor); // Set the selected course name
    setSearchTerm(selectedInstructor); // Update the search term
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center min-h-screen">
        {alert.show && (
          <div className={`alert alert-${alert.type} max-w-md w-full mb-4`}>
            <Alert variant={alert.type ?? 'default'}>
              {' '}
              {/* Use the non-null assertion here */}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          </div>
        )}
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
                resetTrigger={resetTrigger}
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
              Instructor:
              <SearchInstructors
                placeholder="Search for an instructor..."
                searchInstructors={handleInstructorSearch}
                searchTerm={searchTerm}
                resetTrigger={resetTrigger}
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
                placeholder="Leave blank to remain anonymous..."
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
                  className={`h-8 w-8 cursor-pointer ${index < (rating || 0)
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
                placeholder="Leave a review..."
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