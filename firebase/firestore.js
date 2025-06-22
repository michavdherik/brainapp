import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { app } from './firebase'

const db = getFirestore(app)

export const addData = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data)
  return docRef.id
}

export const getData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getCheckinsByUserId = async (userId) => {
  const checkinsCollection = collection(db, 'checkins');
  const q = query(checkinsCollection, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
