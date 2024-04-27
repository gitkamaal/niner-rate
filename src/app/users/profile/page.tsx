'use client';
import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect , useState} from 'react';
import { useUser } from '../../contexts/UserContext';

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  userId: string;
  savedCourses: string[];
}

interface UserReview {
  id: string;
  rating: number;
  review: string;
  userId: string;
}

const Profile = () => {
  const { data: session, status } = useSession();
  const { userProfile, updateUserProfile } = useUser() || {} as { userProfile: UserProfile, updateUserProfile: Function }; // Add type annotation
  const [editMode, setEditMode] = useState({ firstName: false, lastName: false });
  const [activeTab, setActiveTab] = useState('profile');
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [savedCoursesDetails, setSavedCoursesDetails] = useState<any[]>([]);
  const userId = session?.user?.id;
  const [localUserProfile, setLocalUserProfile] = useState({
    firstName: '',
    lastName: '',
  });

  const fetchUserReviews = async () => {
    if (!session || !session.user || !session.user.id) return;

    try {
      const response = await fetch(`/api/userReview/${userId}`);
      if (!response.ok) {
        console.error('Failed to fetch user reviews');
        return;
      }
      const data = await response.json();
      setUserReviews(data);
    } catch (error) {
      console.error('Failed to fetch user reviews:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'ratings') {
      fetchUserReviews();
    }
  }, [activeTab]);

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
        body: JSON.stringify({courseCode}),
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
    className={`cursor-pointer pb-2 ${activeTab === 'ratings' ? 'border-b-2 border-[#005035] font-medium'  : 'font-medium hover:text-[#005035]'}`}>
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
            )} </div>}
            
            {activeTab === 'ratings' && (
          <div>
            <h2>User Ratings</h2>
            <div>
              {userReviews.map(review => (
                <div key={review.id}>
                  <p>{review.rating}</p>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        )}
            {activeTab === 'savedCourses' &&  <div>
      <h2>Saved Courses</h2>
      <div>
        {savedCoursesDetails.map(course => (
          <div key={course.code} className="flex items-center justify-between border-b-2 py-2">
            <div>
              <h3>{course.title}</h3>
              <p>{course.code}</p>
            </div>
            <div>
            <a href={`/courses/${course._id}`} className="text-[#005035] hover:underline mr-4">View</a>
            <button onClick={() => handleDeleteCourse(course.code)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#005035] hover:bg-[#003e2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            Delete Course
            </button>
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