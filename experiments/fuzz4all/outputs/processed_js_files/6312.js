Certainly! Here's a JavaScript program that uses some advanced features like async/await, destructuring, and promises in a complex way:

// Utility function to simulate API calls with delays
const simulateApiCall = (endpoint, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${endpoint}`);
    }, delay);
  });
};

// Async function to fetch data from multiple "endpoints"
const fetchData = async () => {
  const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];

  // Using Promise.all to handle multiple asynchronous operations in parallel
  const results = await Promise.all(endpoints.map(async (endpoint) => {
    const data = await simulateApiCall(endpoint, Math.random() * 1000 + 500);
    return { endpoint, data };
  }));

  // Destructuring to extract data from the results
  for (const { endpoint, data } of results) {
    print(`Fetched from ${endpoint}: ${data}`);
  }
};

// Immediately Invoked Function Expression (IIFE) with async
(async () => {
  print('Starting data fetching...');
  await fetchData();
  print('All data fetched successfully.');
})();

This code simulates asynchronous API calls to multiple endpoints using promises, async/await, and destructuring for handling responses efficiently.