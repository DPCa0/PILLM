Certainly! Here's a JavaScript program that utilizes advanced features such as Promises, async/await, and destructuring:

// Sample data
const userData = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 34 },
  { id: 3, name: 'Charlie', age: 22 }
];

// Simulate an asynchronous data fetch
const fetchUserData = () => new Promise(resolve => setTimeout(() => resolve(userData), 1000));

const processData = async () => {
  try {
    print('Fetching user data...');
    
    // Await the promise resolution and destructure the array
    const [firstUser, secondUser, ...others] = await fetchUserData();
    
    // Destructuring objects
    const { name: firstName, age: firstAge } = firstUser;
    const { name: secondName } = secondUser;
    
    print(`First User: ${firstName}, Age: ${firstAge}`);
    print(`Second User: ${secondName}`);
    print('Other Users:', others);
    
    // Using Map to manipulate data
    const ages = userData.map(({ age }) => age);
    print('Ages:', ages);

    // Using Reduce for aggregation
    const totalAge = ages.reduce((acc, age) => acc + age, 0);
    print('Total Age:', totalAge);
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();

This program simulates fetching user data asynchronously and processes it using various JavaScript advanced features.