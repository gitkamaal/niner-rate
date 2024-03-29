'use client';
// Ensure this component is placed within the `app` directory if you're using Next.js 13 or newer features.

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';

interface Course {
  _id: string;
  code: string;
  title: string;
}

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [searchParams] = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Assuming your URL structure is /courses/{id}
    const courseId = pathname.split('/')[2]; // Adjust based on your actual URL structure
    // Alternatively, if you have the ID in search parameters: const courseId = searchParams.get('id');

    const fetchData = async () => {
      if (!courseId) return;
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data: Course = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };

    fetchData();
  }, [pathname]); // Depend on pathname to refetch when it changes

  if (!course) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="py-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-[#A49665] p-4">
            <h5 className="text-white">{course.code}</h5>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Title: {course.title}
            </p>
            {/* Additional course details here */}
          </div>
        </div>
      </main>
    </>
  );
}
