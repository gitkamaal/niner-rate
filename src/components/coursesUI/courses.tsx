//src/app/components/coursesUI/courses.tsx

import React, { useEffect, useState } from 'react';

// Define the Course interface to describe the shape of course objects
interface Course {
  _id: string;
  code: string;
  title: string;
}

const CoursesPage: React.FC = () => {
  // Define state to store the fetched courses
  const [courses, setCourses] = useState<Course[]>([]);

  // Use useEffect hook to fetch courses data when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch courses
    const fetchCourses = async () => {
      try {
        // Make a GET request to the courses API endpoint
        const response = await fetch('/api/coursesRoute');
        // Check if the response is okay, otherwise throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        // Parse the JSON response
        const data = await response.json();
        // Ensure that the fetched data matches the Course interface
        const fetchedCourses: Course[] = data;
        // Update the state with the fetched courses
        setCourses(fetchedCourses);
      } catch (error) {
        // Handle errors if the fetch fails
        console.error('Error fetching courses:', error);
      }
    };

    // Call the fetchCourses function when the component mounts
    fetchCourses();
  }, []);

  // Render the list of courses
  return (
    <div>
      <h1>List of Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{`${course.code}: ${course.title}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;
