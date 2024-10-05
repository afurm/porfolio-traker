import { ref, get, child } from 'firebase/database';
import { database } from './firebaseConfig';

export const getTransactions = async (userId: string) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}/portfolio`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert the object to an array of transactions
      return Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
