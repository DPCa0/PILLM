Certainly! Here's a complex JavaScript program that utilizes advanced features such as async/await, Promise chaining, ES6 classes, and destructuring:

// Define an asynchronous function to fetch user data
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

// Create a class to handle user data
class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  displayInfo() {
    print(`User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`);
  }
}

// Async function to process and display user data
async function processUsers() {
  try {
    // Fetch users and convert them to User instances
    const usersData = await fetchData('https: 
    const users = usersData.map(user => new User(user));

     
    users.forEach(user => user.displayInfo());

     
    const [{ name: firstName }, { email: secondEmail }] = users;
    print(`First user's name is ${firstName}`);
    print(`Second user's email is ${secondEmail}`);

  } catch (error) {
    console.error('Error fetching or processing users:', error);
  }
}

 
processUsers();

This script fetches user data from a mock API, processes it into a `User` class, and then displays user information using destructuring and other advanced JavaScript techniques.