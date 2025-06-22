// firebase/auth.js
import { auth, db } from './firebase' // Assuming 'db' is your Firestore instance
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail // Import sendPasswordResetEmail
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

// Function to register a new user with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user document in Firestore with the user's UID as the document ID
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      symptoms: [],
      triggers: [],
      activities: []
    });

    return user; // Return the user object
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}

// Function to log in a user with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user; // Return the user object
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}


// Function to send a magic link to a user's email for passwordless login
// 1. Send magic link
export const sendLoginLink = async (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/complete-signin',
    handleCodeInApp: true,
    // This is the deep link to your app.
    // This will be used to redirect the user back to your app after they click the magic link.
    // You might need to configure this depending on your app's setup.
  }
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  window.localStorage.setItem('emailForSignIn', email)
}

// 2. Complete sign-in
export const completeSignIn = async () => {
  const email = window.localStorage.getItem('emailForSignIn')
  if (isSignInWithEmailLink(auth, window.location.href)) {
    await signInWithEmailLink(auth, email, window.location.href)
    // Clear email from local storage
    window.localStorage.removeItem('emailForSignIn');
  }
}

export const getCurrentUser = () => {
  return auth.currentUser;
}
// Function to watch for changes in the user's authentication state
// 3. Watch auth state
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Function to sign out the current user
// 4. Sign out
export const logOut = async () => {
  await signOut(auth)
}

// Function to send a password reset email
export const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
}
