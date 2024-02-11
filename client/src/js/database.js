import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open a connection to the database
  const db = await openDB('jate', 1);
  
  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');
  
  // Open up the desired object store
  const store = tx.objectStore('jate');
  
  // Use the put method to update the content in the database
  // Assuming 'id' is 1 for the content entry
  const request = store.put({ id: 1, value: content });
  
  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Open a connection to the database
  const db = await openDB('jate', 1);
  
  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');
  
  // Open up the desired object store
  const store = tx.objectStore('jate');
  
  // Use the get method to fetch the content from the database
  const request = store.get(1); // Assuming 'id' is 1 for the content entry
  
  // Confirm the request and retrieve the result
  const result = await request;
  console.log('Data retrieved from the database', result);
  
  // Return the value, making sure to handle the case where result is undefined
  return result?.value;
};
