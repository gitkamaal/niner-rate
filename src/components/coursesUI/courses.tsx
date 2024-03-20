import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';
import { HiExternalLink } from 'react-icons/hi';

interface Course {
  _id: string;
  code: string;
  title: string;
}

const ITEMS_PER_PAGE = 12;

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const displayedCourses = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <main className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="bg-[#A49665] p-4 flex justify-between items-center">
                <h5 className="text-white">{course.code}</h5>
                <a
                  href={`#`} // TODO: Link to course page
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  <HiExternalLink size={20} />
                </a>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Title: {course.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
};

export default CoursesPage;
