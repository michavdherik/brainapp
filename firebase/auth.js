// auth.js
import { auth } from './firebase'
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

// 1. Send magic link
export const sendLoginLink = async (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/complete-signin',
    handleCodeInApp: true,
  }
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  window.localStorage.setItem('emailForSignIn', email)
}

// 2. Complete sign-in
export const completeSignIn = async () => {
  const email = window.localStorage.getItem('emailForSignIn')
  if (isSignInWithEmailLink(auth, window.location.href)) {
    await signInWithEmailLink(auth, email, window.location.href)
  }
}

// 3. Watch auth state
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// 4. Sign out
export const logOut = async () => {
  await signOut(auth)
}
