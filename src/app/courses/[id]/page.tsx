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
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

interface Course {
  _id: string;
  code: string;
  title: string;
  courseDescription: string;
}

interface Review {
  _id: string;
  rating: number;
  review: string;
  studentName: string;
  createdAt: string;
}

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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
        const data = await response.json();
        console.log(data); // Log the data
        setCourse(data.course);
        setReviews(data.reviews);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };

    fetchData();
  }, [pathname]); // Depend on pathname to refetch when it changes

  const overallRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

  if (!course) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="mt-20 py-8 px-4 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#005035] mb-4">
                {course.code + ': ' + course.title}
              </h2>
              <div className="flex items-center mb-2">
                <span className="text-md font-medium  mr-1">Course Rating: </span>
                <span className="text-[32px] font-bold text-[#005035]">{overallRating.toFixed(1)}</span>
                <span className="text-md font-bold mr-1 text-gray-500">/5</span>
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) =>
                    i < overallRating ? (
                      <StarFilledIcon key={i} className="w-5 h-5 text-[#A49665]" />
                    ) : (
                      <StarIcon key={i} className="w-4 h-4 text-[#A49665]" />
                    ))}
                </div>
              </div>
              <div className="text-md ">
                Based on <span className="font-bold">{reviews.length}</span> reviews
              </div>

              <div className="mt-6 mb-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        onClick={() => setActiveTab('description')}
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'description'
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
                        className={`group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'reviews'
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
                <div className="p-4">
                  {reviews.map((review) => {
                    const date = new Date(review.createdAt);
                    const formattedDate = date.toLocaleDateString(); // Format the date
                    return (
                      <div key={review._id} className="border bg-gray-100 border-gray-300 rounded-md mb-4 p-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <span className="text-[25px] font-bold mr-1">{review.rating}</span> 
                              <span className="text-sm mr-2">/5</span> 
                              {[...Array(5)].map((_, i) =>
                                i < review.rating ? (
                                  <StarFilledIcon key={i} className="w-4 h-4 text-[#A49665]" />
                                ) : (
                                  <StarIcon key={i} className="w-4 h-4 text-[#A49665]" />
                                ))}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">{formattedDate}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          {review.studentName}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {review.review}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
