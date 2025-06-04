// completeCheckin.js
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const saveCheckin = async (checkinData) => {
  const user = getAuth().currentUser

  if (!user) {
    throw new Error('Geen gebruiker ingelogd')
  }

  await addDoc(collection(db, 'checkins'), {
    userId: user.uid,
    checkinData,
    createdAt: serverTimestamp(),
    date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
  })
}
