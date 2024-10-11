'use client';

import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

// Define the UserData interface
interface UserData {
  id: number; // User ID
  first_name: string; // User's first name
  last_name?: string; // User's last name (optional)
  username?: string; // User's username (optional)
  bio?: string; // User's bio (optional)
  language_code: string; // User's language code
  is_premium?: boolean; // Indicates if the user is a premium user (optional)
}

export default function Home() {
  // State to hold user data and loading state
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Check if user data is available in WebApp
    const user = WebApp.initDataUnsafe.user;
    
    if (user) {
      // Set user data from WebApp
      setUserData(user as UserData);
    } else {
      console.error('User data is not available');
    }
    setLoading(false); // Update loading state
  }, []);

  return (
    <>
      {loading ? ( // Display loading state
        <p>Loading user data...</p>
      ) : userData ? ( // Display user data if available
        <div>
          <h1>Welcome, {userData.first_name}!</h1>
          {userData.last_name && <h2>{userData.last_name}</h2>}
          {userData.bio && <p>{userData.bio}</p>}
          <p>Username: {userData.username}</p>
          <p>Language: {userData.language_code}</p>
          <p>Premium User: {userData.is_premium ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No user data available.</p> // Display message if no user data
      )}
    </>
  );
}
