Certainly! Here's a JavaScript program that uses advanced features, including Promises, async/await, destructuring, and higher-order functions.

// Simulate fetching user data with Promises
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 35 },
        { id: 3, name: 'Charlie', age: 24 }
      ]);
    }, 1000);
  });
};

// Utility function to filter and transform user data
const processUserData = async () => {
  try {
    const users = await fetchUserData();
    const adults = users.filter(({ age }) => age >= 30);
    const names = adults.map(({ name }) => name.toUpperCase());
    return names;
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

// Immediately Invoked Function Expression (IIFE) using async/await
(async () => {
  const result = await processUserData();
  print('Adult User Names:', result);
})();

This code demonstrates a mix of asynchronous handling and modern JavaScript syntax to fetch and process user data.