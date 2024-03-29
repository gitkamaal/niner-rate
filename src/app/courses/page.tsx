'use client';
// page.tsx
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';
import { HiExternalLink } from 'react-icons/hi';
import Navbar from '@/components/navbar';
import Link from 'next/link';

interface Course {
  _id: string;
  code: string;
  title: string;
}

const ITEMS_PER_PAGE = 12;

const Page: React.FC = () => {
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
      <Navbar />
      <main className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => (
            <Link key={course._id} href={`/courses/${course._id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                <div className="bg-[#A49665] p-4 flex justify-between items-center">
                  <h5 className="text-white">{course.code}</h5>
                  <HiExternalLink className="text-white" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Title: {course.title}
                  </p>
                </div>
              </div>
            </Link>
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

export default Page;
