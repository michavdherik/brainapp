// completeCheckin.js
import { db, auth } from './firebase' // Import auth
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { startOfDay, endOfDay } from 'date-fns';

export const saveCheckin = async (checkinData) => {
  const user = auth.currentUser // Use the imported auth instance

  if (!user) {
    throw new Error('Geen gebruiker ingelogd')
  }

  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  const checkinsRef = collection(db, 'checkins');
  const q = query(checkinsRef, where('userId', '==', user.uid), where('createdAt', '>=', startOfToday), where('createdAt', '<=', endOfToday));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error('You have already submitted a check-in today.');
  }

  await addDoc(collection(db, 'checkins'), {
    userId: user.uid,
    checkinData,
    createdAt: serverTimestamp(),
    date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
  })
}
