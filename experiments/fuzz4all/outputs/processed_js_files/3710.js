 

 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ user: 'Alice', age: 30, location: 'Wonderland' });
  }, 1000);
});

 
const processData = data => new Promise((resolve, reject) => {
  setTimeout(() => {
    const { user, ...otherDetails } = data;
    if (user) {
      resolve({ greeting: `Hello, ${user}!`, ...otherDetails });
    } else {
      reject(new Error('User not found.'));
    }
  }, 1000);
});

 
(async () => {
  try {
    print('Fetching data...');
    const data = await fetchData();
    
    print('Processing data...');
    const processedData = await processData(data);
    
    print('Output:', processedData);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
