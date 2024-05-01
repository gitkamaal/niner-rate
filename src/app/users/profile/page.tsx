'use client';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Pagination from '@/components/pagination';
import ConfirmModal from '@/components/confirmModal';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  userId: string;
  savedCourses: string[];
}

interface UserReview {
  host: string;
  courseId: string;
  rating: number;
  review: string;
  createdAt: string;
  instructorName: string;
}

const Profile = () => {
  const { data: session, status } = useSession();
  const { userProfile, updateUserProfile } =
    useUser() ||
    ({} as { userProfile: UserProfile; updateUserProfile: Function }); // Add type annotation
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [savedCoursesDetails, setSavedCoursesDetails] = useState<any[]>([]);
  const userId = session?.user?.id;
  const [localUserProfile, setLocalUserProfile] = useState({
    firstName: '',
    lastName: '',
  });

  const [courseTitle, setCourseTitle] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);

  // state variables to manage the visibility of the confirmation modal and the course to delete
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  // Functions to handle the confirmation modal actions: confirm and cancel
  const handleConfirmDelete = () => {
    if (courseToDelete) {
      handleDeleteCourse(courseToDelete);
    }
    setShowConfirmModal(false);
    setCourseToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setCourseToDelete(null);
  };

  // Fetch course titles based on courseId
  const fetchCourseTitles = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        console.error('Failed to fetch courses');
        return;
      }
      const courses = await response.json();
      const courseTitleMap = courses.reduce((acc, course) => {
        acc[course._id] = course.title;
        return acc;
      }, {});
      setCourseTitle(courseTitleMap);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  useEffect(() => {
    fetchCourseTitles();
  }, []);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        if (!session || !session.user || !session.user.id) {
          return; // Return if no session or user ID found
        }

        // Make GET request to fetch user reviews for the host ID
        const response = await fetch(`/api/userReview?host=${userId}`); // tried session.user.id
        if (!response.ok) {
          throw new Error('Failed to fetch user reviews');
        }

        const data = await response.json();
        setUserReviews(data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    };

    fetchUserReviews();
  }, [session]);

  const fetchSavedCourses = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/savedCourses/${userId}`);
      if (!response.ok) {
        console.error('Failed to fetch saved courses');
        return;
      }
      const data = await response.json();
      setSavedCoursesDetails(data);
    } catch (error) {
      console.error('Failed to fetch saved courses:', error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setLocalUserProfile({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      });
    }

    if (userProfile && userProfile.userId && activeTab === 'savedCourses') {
      fetchSavedCourses();
    }
  }, [userProfile, activeTab, userId]);

  const handleDeleteCourse = async (courseCode) => {
    try {
      const response = await fetch(`/api/savedCourses/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseCode }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete course');
      }

      console.log('Updated saved courses:', result);
      fetchSavedCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

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

  const ITEMS_PER_PAGE = 12;

  const totalPages = Math.ceil(userReviews.length / ITEMS_PER_PAGE);
  const displayuserReviews = userReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Define the renderUserReviews function outside of the return statement
  const renderUserReviews = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const reviewsToDisplay = userReviews.slice(startIndex, endIndex);

    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
        <div className="space-y-4">
          {reviewsToDisplay.map((review) => (
            <div
              key={review.host}
              className="border border-gray-200 p-4 rounded-md"
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">
                  {courseTitle[review.courseId]}
                </h3>
                <p className="text-gray-600">
                  Date: {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-md text-gray-600 mr-2">Rating:</p>
                <span className="text-[25px] font-bold text-[#005035]">
                  {review.rating}
                </span>
                <span className="text-sm">/5</span>

                <div className="flex ml-2 ">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <StarFilledIcon
                        key={i}
                        className="w-5 h-5 text-[#A49665]"
                      />
                    ) : (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-[#A49665] mt-0.5"
                      />
                    )
                  )}
                  {review.instructorName && (
                    <span className=" mx-7 text-sm  text-gray-500">
                      Professor: {review.instructorName}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-md text-gray-500 mt-3 mb-2">{review.review}</p>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated')
    return <div>You must be logged in to view this page</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="flex flex-col items-center mt-20 py-8 px-4 w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-[#005035] mb-4">
            Hey, {localUserProfile.firstName || 'User'}!
          </h1>
          <ul className="flex space-x-6 border-b-2 mb-6">
            <li
              onClick={() => handleTabChange('profile')}
              className={`cursor-pointer pb-2 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[#005035] font-medium'
                  : 'font-medium hover:text-[#005035]'
              }`}
            >
              Profile
            </li>
            <li
              onClick={() => handleTabChange('ratings')}
              className={`cursor-pointer pb-2 ${
                activeTab === 'ratings'
                  ? 'border-b-2 border-[#005035] font-medium'
                  : 'font-medium hover:text-[#005035]'
              }`}
            >
              Ratings
            </li>
            <li
              onClick={() => handleTabChange('savedCourses')}
              className={`cursor-pointer pb-2 ${
                activeTab === 'savedCourses'
                  ? 'border-b-2 border-[#005035] font-medium'
                  : 'font-medium hover:text-[#005035]'
              }`}
            >
              Saved Courses
            </li>
          </ul>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
            {activeTab === 'profile' && (
              <div>
                {session && userProfile ? (
                  <div className="space-y-2">
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
                          <button
                            onClick={() => handleSave('firstName')}
                            className="btn ml-4 cursor-pointer text-[#005035] bg-green-500 hover:bg-green-600 rounded-md px-4 py-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{localUserProfile.firstName}</p>
                          <button
                            onClick={() => handleEditToggle('firstName')}
                            className="btn ml-4 cursor-pointer text-[#005035] bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>

                    <h2 className="pt-4 text-xl font-semibold">Last Name</h2>
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
                          <button
                            onClick={() => handleSave('lastName')}
                            className="btn ml-4 cursor-pointer text-[#005035] bg-green-500 hover:bg-green-600 rounded-md px-4 py-2"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{localUserProfile.lastName}</p>
                          <button
                            onClick={() => handleEditToggle('lastName')}
                            className="btn ml-4 cursor-pointer text-[#005035] bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>You must be logged in to view this page</p>
                )}
              </div>
            )}

            {/* Render user reviews */}
            {activeTab === 'ratings' && renderUserReviews()}

            {activeTab === 'savedCourses' && (
              <div>
                <h2>Saved Courses</h2>
                <div>
                  {savedCoursesDetails.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between border-b-2 py-2"
                    >
                      <div>
                        <h3>{course.title}</h3>
                        <p>{course.code}</p>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            (window.location.href = `/courses/${course._id}`)
                          }
                          className="btn text-[#005035] mr-4 bg-gray-500 hover:bg-gray-600 rounded-md px-4 py-2"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setCourseToDelete(course.code);
                            setShowConfirmModal(true);
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                          Delete Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          message={`Are you sure you want to delete "${courseToDelete}: ${
            savedCoursesDetails.find((course) => course.code === courseToDelete)
              ?.title
          }" from Saved Course?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Profile;
