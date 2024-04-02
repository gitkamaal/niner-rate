'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface Course {
  _id: string;
  code: string;
  title: string;
  courseDescription: string;
}

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [searchParams] = useSearchParams();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('description');

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
      <div className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="mt-20 py-8 px-4 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#005035] mb-4">
                {course.title}
              </h2>

              <div className="mt-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        onClick={() => setActiveTab('description')}
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === 'description'
                            ? 'bg-gray-500 text-white'
                            : 'hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        href="#"
                      >
                        Description
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        onClick={() => setActiveTab('reviews')}
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === 'reviews'
                            ? 'bg-gray-500 text-white'
                            : 'hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        href="#"
                      >
                        Reviews
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {activeTab === 'description' && (
                <p className="text-base text-gray-700 dark:text-gray-300 mt-4 leading-7">
                  {course.courseDescription}
                </p>
              )}
              {activeTab === 'reviews' && (
                <p className="text-base text-gray-700 dark:text-gray-300 mt-2">
                  Reviews: {/* Render reviews here */}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
