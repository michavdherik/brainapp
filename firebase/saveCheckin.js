import { db } from '../firebase/firestore';

export const saveCheckin = async (userId, checkinData) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to save checkin data.");
    }

    // Add a new document with a generated ID to the 'checkins' collection
    const docRef = await db.collection('checkins').add({
      userId: userId,
      ...checkinData, // Spread the rest of the checkin data
      timestamp: new Date(), // Optional: add a timestamp
    });

    console.log("Checkin data saved with ID: ", docRef.id);
    return docRef.id; // Return the ID of the newly created document

  } catch (error) {
    console.error("Error saving checkin data: ", error);
    throw error; // Re-throw the error for handling in the component
  }
};