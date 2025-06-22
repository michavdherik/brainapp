// firebase/profile.js
import { db } from './firebase'; // Assuming 'db' is your Firestore instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Function to get a user's profile
export const getUserProfile = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    // User document doesn't exist, maybe handle this case (e.g., create a basic profile)
    console.log("No such user profile!");
    return null;
  }
};

// Function to update a user's profile
export const updateUserProfile = async (userId, data) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, data);
};
