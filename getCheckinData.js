const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// Placeholder for your service account key path
// You need to download this from your Firebase project settings
// (Project settings > Service accounts > Generate new private key)
const serviceAccountPath = '/path/to/your/serviceAccountKey.json';

// Initialize Firebase Admin SDK
try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('Firebase Admin SDK initialized successfully.');

} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  console.error('Please ensure your service account key path is correct and the file exists.');
  process.exit(1); // Exit the script if initialization fails
}


const db = getFirestore();

async function getCheckins(userId) {
  try {
    // Query the 'checkins' collection
    const checkinsRef = db.collection('checkins');
    // Filter documents where 'userId' matches the provided userId
    // Order by timestamp in descending order (most recent first)
    const snapshot = await checkinsRef.where('userId', '==', userId).orderBy('timestamp', 'desc').get();

    if (snapshot.empty) {
      console.log('No check-ins found for user:', userId);
 return [];
    }

    const checkins = [];
    snapshot.forEach(doc => {
 checkins.push({ id: doc.id, ...doc.data() });
    });

    console.log('Check-ins for user', userId + ':');
 console.log(JSON.stringify(checkins, null, 2)); // Print data nicely formatted
    return checkins;

  } catch (error) {
    console.error('Error fetching check-ins:', error);
    return [];
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];
// Add a check to ensure a user ID is provided
if (!userId) {
 console.error('Error: User ID not provided.');
 console.log('Usage: node getCheckinData.js <user_id>');
 process.exit(1); // Exit the script if no user ID is provided
}

// Run the function
getCheckins(userId);