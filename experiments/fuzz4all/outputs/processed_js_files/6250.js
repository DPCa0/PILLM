 

 
const database = new Map([
  ['1', { name: 'Alice', age: 30 }],
  ['2', { name: 'Bob', age: 25 }],
  ['3', { name: 'Carol', age: 35 }],
]);

 
const fetchData = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (database.has(id)) {
        resolve(database.get(id));
      } else {
        reject(new Error(`No user found with ID ${id}`));
      }
    }, 1000);
  });
};

 
(async () => {
  try {
    const ids = ['1', '2', '3', '4'];
    
     
    const results = await Promise.allSettled(ids.map(fetchData));
    
     
    const successfulResults = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
    
    const unsuccessfulResults = results
      .filter(result => result.status === 'rejected')
      .map(result => result.reason.message);
    
    print('Successfully fetched users:', successfulResults);
    print('Failed to fetch users:', unsuccessfulResults);
    
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
})();
