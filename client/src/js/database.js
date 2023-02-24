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

  //Creating a variable and setting it to await the start of the database
  const jateDb = await openDB('TextEditor', 1);

  //Creating a variable for the transaction
  const tx = jateDb.transaction('TextEditor', 'readwrite');
  
  //Creating a variable for the story
  const store = tx.objectStore('TextEditor');

  //Preforming the update
  const request = store.put({ id: 1, value: content});

  //Awaiting the result and logging it to the terminal
  const result = await request;
  console.log("Saved to the database", result.value)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    //Creating a variable and setting it to await the start of the database
    const jateDb = await openDB('TextEditor', 1);

    //Creating a variable for the transaction
    const tx = jateDb.transaction('TextEditor', 'readonly');
    
    //Creating a variable for the story
    const store = tx.objectStore('TextEditor');
    
    //Getting the first variable from the store
    const request = store.get(1);

    //Awaiting the request and logging out the results
    const result = await request;
    result
      ? console.log('🚀 - data retrieved from the database', result.value)
      : console.log('🚀 - data not found in the database');
    return result?.value;
};

initdb();
