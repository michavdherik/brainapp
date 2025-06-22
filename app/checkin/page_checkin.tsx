'use client'

import { useEffect, useState } from 'react'
import { getCheckinsByUserId } from '../../firebase/firestore' // Import getCheckinsByUserId from firestore.js
import { saveCheckin } from '../../firebase/saveCheckin' // Assuming correct path
import { getCurrentUser, logOut, signInWithEmail, signUpWithEmail} from '../../firebase/authUtils' // Import authentication functions, logOut, and User type
import { User } from 'firebase/auth'
import CheckIn from '../../components/CheckIn' // Import the CheckIn component

interface Checkin {
  // Define the structure of your checkin data here (should match what's saved)
  id?: string; // Add an optional ID field if you fetch IDs
  userId: string;
  timestamp: any; // Use `any` or a more specific Firestore Timestamp type if available
  date?: string; // YYYY-MM-DD format
  // Add fields for the checkin questions from CheckIn.tsx
  feeling?: string;
  symptoms?: string[]; // Assuming symptoms are saved as an array
  intensity?: string;
  triggers?: string[]; // Assuming triggers are saved as an array
  focus?: string[]; // Assuming focus is saved as an array
  // ... other fields
}

export default function CheckinPage() {
  const [user, setUser] = useState<User | null>(null)
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isFetchingCheckins, setIsFetchingCheckins] = useState(false)
  const [isSavingCheckin, setIsSavingCheckin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)

  // State for new check-in multi-step form visibilityimport { useEffect, useState } from 'react'
  const [isDoingNewCheckin, setIsDoingNewCheckin] = useState(false);

  // State for login/signup forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // Effect 1: Fetch initial user on mount
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true)
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data.");
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();

  }, []) // Empty dependency array means this runs once on mount


  // Effect 2: Fetch checkins when user state changes and when isDoingNewCheckin changes back to false (after saving)
  useEffect(() => {
    const fetchCheckins = async () => {
      if (user) { // Only fetch if a user is logged in
        setIsFetchingCheckins(true)
        try {
          const userCheckins = await getCheckinsByUserId(user.uid) // Use getCheckinsByUserId
          setCheckins(userCheckins as Checkin[])
        } catch (err: any) {
          console.error("Error fetching checkins:", err);
          setError("Failed to load checkins.");
        } finally {
          setIsFetchingCheckins(false);
        }
      } else {
        setCheckins([]); // Clear checkins if no user is logged in
      }
    };



    // Fetch checkins initially when user is set, or after completing a new checkin
    if (user && !isDoingNewCheckin) {
         fetchCheckins();
    }


  }, [user, isDoingNewCheckin]); // Dependency array includes 'user' and 'isDoingNewCheckin'

  const handleCheckInComplete = async (checkinData: Record<string, any>) => {
    if (!user) {
      setError("No user logged in to save checkin.")
      return
    }

    setIsSavingCheckin(true)
    try {
      await saveCheckin(user.uid, checkinData)
      // to refetch checkins. Alternatively, you could update state directly here.
      setIsDoingNewCheckin(false); // Hide the new check-in form
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error("Error saving checkin:", err);
      setError("Failed to save checkin.");
    } finally {
      setIsSavingCheckin(false);
    }
  };


  const handleSignIn = async () => {
    try {
      setError(null) // Clear previous errorsimport { useEffect, useState } from 'react'
      setAuthError(null) // Clear previous auth errors
      setIsLoadingUser(true) // Indicate loading during sign-in
      const userCredential = await signInWithEmail(email, password);
      setUser(userCredential.user);
      // Fetch checkins will be triggered by the second useEffect when user state updates
      setEmail('') // Clear form
      setPassword('') // Clear form
    } catch (err: any) {
      console.error("Error signing in:", err);
      setAuthError("Failed to sign in. Please check your email and password.");
    } finally {
       setIsLoadingUser(false); // Stop loading
    }
  };

  const handleSignUp = async () => {
    try {
       setError(null) // Clear previous errorsimport { useEffect, useState } from 'react'
       setAuthError(null) // Clear previous auth errors
      setIsLoadingUser(true) // Indicate loading during sign-up
      const userCredential = await signUpWithEmail(email, password);
      setUser(userCredential.user);
      // Note: New users won't have checkins initially, the second useEffect will handle it
      setCheckins([])
      setEmail('') // Clear form
      setPassword('') // Clear form
    } catch (err: any) {
       console.error("Error signing up:", err);
      setAuthError("Failed to sign up. Please try again.");
    } finally {
       setIsLoadingUser(false); // Stop loading
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut() // Changed from signOutUser() to logOut()
      setUser(null) // Clear user state on sign out
      setCheckins([]) // Clear checkins on sign out
      setIsDoingNewCheckin(false) // Hide the new check-in form on sign out
    } catch (err: any) {
      console.error("Error signing out:", err);
      setError("Failed to sign out.");
    }
  };


  if (isLoadingUser) {
    return <div>Loading user...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>Sign In or Sign Up</h1>
        {authError && <p style={{ color: 'red' }}>{authError}</p>}import { useEffect, useState } from 'react'
        <div >
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />import { useEffect, useState } from 'react'
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />import { useEffect, useState } from 'react'
          <button onClick={handleSignIn} disabled={isLoadingUser}>
            {isLoadingUser ? 'Signing In...' : 'Sign In'}import { useEffect, useState } from 'react'
          </button>
          <button onClick={handleSignUp} disabled={isLoadingUser}>import { useEffect, useState } from 'react'
            {isLoadingUser ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </div>
    );
  }

  // Render CheckIn component or the list of past checkins
  return (
    <div>
      <h1>Check-in Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Welcome, {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>

      {isDoingNewCheckin ? (import { useEffect, useState } from 'react'
        // Render the multi-step CheckIn form
        <CheckIn onCheckInComplete={handleCheckInComplete} />
      ) : (import { useEffect, useState } from 'react'
        // Render the list of past checkins and the button to start a new one
        <div>
          <h2>Your Past Checkins</h2>
          {isFetchingCheckins ? (
              <p>Loading checkins...</p>
          ) : checkins.length > 0 ? (
              <ul>
              {checkins.map((checkin) => (import { useEffect, useState } from 'react'
                  <li key={checkin.id || checkin.timestamp.toDate().toISOString()}> {/* Use ID or timestamp as key */}
                  {/* Display checkin data - adjust based on how data is saved */}
                  <p>Date: {checkin.date || checkin.timestamp.toDate().toLocaleDateString()}</p>
                  <p>Feeling: {checkin.feeling}</p>
                  <p>Symptoms: {Array.isArray(checkin.symptoms) ? checkin.symptoms.join(', ') : checkin.symptoms}</p>
                  <p>Mood: {checkin.mood}</p> {/* If mood is still relevant from older structure */}
                  {/* ... display other fields from the multi-step form answers */}
                  </li>
              ))}
              </ul>
          ) : (
              <p>No checkins yet.</p>
          )}

          <button onClick={() => setIsDoingNewCheckin(true)} disabled={isSavingCheckin}>
            Start New Checkin
          </button>
           {isSavingCheckin && <p>Saving new checkin...</p>}

        </div>
      )}
    </div>
  );
}
