Certainly! Here's a JavaScript program that utilizes advanced features such as async/await, Promises, and destructuring in a complex way:

// Simulate a network request using a Promise
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ userId: 1, username: 'john_doe' }), 2000)
  );

// Async function using await to handle Promises
async function getUserData() {
  print('Fetching user data...');
  const userData = await fetchData();
  return userData;
}

// Function that processes user data
function processUserData({ userId, username }) {
  print(`Processing data for user #${userId}`);
  return new Promise((resolve, reject) => {
    if (username) {
      // Simulate some processing delay
      setTimeout(() => resolve(`Username processed: ${username}`), 1000);
    } else {
      reject('No username provided.');
    }
  });
}

// IIFE to orchestrate async operations and handle results
(async () => {
  try {
    const userData = await getUserData();
    const result = await processUserData(userData);
    print(result);
  } catch (error) {
    console.error('Error:', error);
  }
})();

This program demonstrates fetching data asynchronously, processing it, and handling any potential errors using async/await, Promises, and destructuring syntax.