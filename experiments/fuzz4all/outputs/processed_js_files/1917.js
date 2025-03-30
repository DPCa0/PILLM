Certainly! Here's a JavaScript program that utilizes some advanced features such as Promises, async/await, destructuring, and spread/rest operators. This program simulates fetching user data and processing it:

// Simulated API call to fetch user data
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 34 },
        { id: 3, name: 'Charlie', age: 22 }
      ]);
    }, 1000);
  });
};

// Async function to process user data
const processUserData = async () => {
  try {
    // Destructuring assignment to extract user data
    const users = await fetchUserData();
    const [firstUser, ...restUsers] = users;

    // Logging using template literals
    print(`First user: ${firstUser.name}, Age: ${firstUser.age}`);

    // Using rest operator to gather remaining users
    print('Other users:', restUsers.map(({ name, age }) => ({ name, age })));

    // Spread operator to clone and modify objects
    const updatedUsers = restUsers.map(user => ({
      ...user,
      age: user.age + 1,  // Increment age by 1
    }));
    
    print('Updated users:', updatedUsers);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

 
processUserData();

This script demonstrates modern JavaScript features to handle asynchronous operations and manipulate data efficiently.