'use client';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  userId: string;
  savedCourses: string[];
}

interface Review {
  courseId: string;
  studentName: string;
  rating: number;
  review: string;
}

const Profile = () => {
  const { data: session, status } = useSession();
  const { userProfile, updateUserProfile } = useUser() || {} as { userProfile: UserProfile, updateUserProfile: Function }; // Add type annotation
  const [editMode, setEditMode] = useState({ firstName: false, lastName: false });
  const [activeTab, setActiveTab] = useState('profile');
  const [savedCoursesDetails, setSavedCoursesDetails] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]); // State to store user's reviews
  const userId = session?.user?.id;
  const [localUserProfile, setLocalUserProfile] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (userProfile) {
      setLocalUserProfile({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      });
      
    }

    if (userProfile && userProfile.userId && activeTab === 'ratings') {
      // Fetch user's reviews
      const fetchUserReviews = async () => {
        try {
          const response = await fetch(`/api/review?userId=${userProfile.userId}`);
          if (!response.ok) {
            console.error('Failed to fetch user reviews');
            return;
          }
          const data = await response.json();
          setUserReviews(data);
        } catch (error) {
          console.error('Error fetching user reviews:', error);
        }
      };

      fetchUserReviews();
    }
  }, [userProfile, activeTab]);

  const handleEditToggle = (field) => {
    setEditMode((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (field) => {
    await updateUserProfile({ [field]: localUserProfile[field] });
    handleEditToggle(field);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') return <div>You must be logged in to view this page</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="flex flex-col items-center mt-20 py-8 px-4 w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-[#005035] mb-4">Hey, {localUserProfile.firstName || 'User'}!</h1>
          <ul className="flex space-x-6 border-b-2 mb-6">
            <li
              onClick={() => handleTabChange('profile')}
              className={`cursor-pointer pb-2 ${activeTab === 'profile' ? 'border-b-2 border-[#005035] font-medium' : 'font-medium hover:text-[#005035]'}`}>
              Profile
            </li>
            <li
              onClick={() => handleTabChange('ratings')}
              className={`cursor-pointer pb-2 ${activeTab === 'ratings' ? 'border-b-2 border-[#005035] font-medium' : 'font-medium hover:text-[#005035]'}`}>
              Ratings
            </li>
            <li
              onClick={() => handleTabChange('savedCourses')}
              className={`cursor-pointer pb-2 ${activeTab === 'savedCourses' ? 'border-b-2 border-[#005035] font-medium' : 'font-medium hover:text-[#005035]'}`}>
              Saved Courses
            </li>
          </ul>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            {activeTab === 'profile' && <div>
              {session && userProfile ? (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">First Name</h2>
                  <div className="flex justify-between items-end">
                    {editMode.firstName ? (
                      <>
                        <input
                          type="text"
                          name="firstName"
                          value={localUserProfile.firstName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <button onClick={() => handleSave('firstName')} className="ml-4 text-[#005035] hover:underline">Save</button>
                      </>
                    ) : (
                      <>
                        <p>{localUserProfile.firstName}</p>
                        <a onClick={() => handleEditToggle('firstName')} className="ml-4 cursor-pointer text-[#005035] hover:underline">Edit</a>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold">Last Name</h2>
                  <div className="flex justify-between items-end">
                    {editMode.lastName ? (
                      <>
                        <input
                          type="text"
                          name="lastName"
                          value={localUserProfile.lastName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <button onClick={() => handleSave('lastName')} className="ml-4 text-[#005035] hover:underline">Save</button>
                      </>
                    ) : (
                      <>
                        <p>{localUserProfile.lastName}</p>
                        <a onClick={() => handleEditToggle('lastName')} className="ml-4 cursor-pointer text-[#005035] hover:underline">Edit</a>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <p>You must be logged in to view this page</p>
              )}
            </div>}

            {activeTab === 'ratings' && (
              <div>
                <h2>Ratings</h2>
                {userReviews.length > 0 ? (
                  userReviews.map((review, index) => (
                    <div key={index}>
                      <p>Course: {review.courseId}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Review: {review.review}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews found.</p>
                )}
              </div>
            )}

            {activeTab === 'savedCourses' && <div>
              <h2>Saved Courses</h2>
              <div>
                {savedCoursesDetails.map(course => (
                  <div key={course.code} className="flex items-center justify-between border-b-2 py-2">
                    <div>
                      <h3>{course.title}</h3>
                      <p>{course.code}</p>
                    </div>
                    <div>
                      <a href={`/courses/${course._id}`} className="text-[#005035] hover:underline">View</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>}
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;