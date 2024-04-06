import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      
      fetch(`/api/users/${session.user.id}`)
        .then((res) => res.json())
        .then(setUserProfile);
    }
  }, [session?.user?.id]);

  const updateUserProfile = async (updatedFields) => {
    const response = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      
      console.error('Failed to update user profile');
      return;
    }

    
    const updatedUserProfile = await response.json();

    
    setUserProfile(updatedUserProfile);
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);