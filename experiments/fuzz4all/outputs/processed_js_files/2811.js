Certainly! Below is a short JavaScript program demonstrating some advanced features such as Promises, async/await, destructuring, and the spread operator in a complex way:

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}`, status: 200 });
      } else {
        reject(new Error('URL not provided'));
      }
    }, 1000);
  });
};

 
const fetchAndProcessData = async () => {
  try {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

     
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.all(promises);

     
    results.forEach(({ data, status }) => {
      if (status === 200) {
        print(`Success: ${data}`);
      } else {
        print(`Failed with status: ${status}`);
      }
    });

     
    const additionalData = { extra: 'Extra data' };
    const completeData = { ...results[0], ...additionalData };
    print('Complete Data:', completeData);

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

 
fetchAndProcessData();

This script fetches data from multiple URLs concurrently, processes the fetched data, and demonstrates using modern JavaScript features such as destructuring assignment, the spread operator, and asynchronous programming with Promises and async/await.