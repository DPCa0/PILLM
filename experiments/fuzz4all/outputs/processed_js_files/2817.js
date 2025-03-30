Certainly! Here's a JavaScript program that uses advanced features such as async/await, Promises, arrow functions, destructuring, spread/rest operators, and ES6 classes.

class User {
  constructor(name) {
    this.name = name;
  }

  async fetchData(endpoint) {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  }

  getUserInfo() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ age: 25, city: 'New York' }), 1000);
    });
  }
}

const fetchUserData = async (user) => {
  const [apiData, userInfo] = await Promise.all([
    user.fetchData('https: 
    user.getUserInfo(),
  ]);

  return { ...apiData, ...userInfo };
};

const main = async () => {
  try {
    const user = new User('John Doe');
    const { id, name, username, email, ...rest } = await fetchUserData(user);

    console.log(`User Info:
      ID: ${id}
      Name: ${name}
      Username: ${username}
      Email: ${email}
      Extra: ${JSON.stringify(rest)}
    `);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

main();

This program creates a `User` class with methods to fetch data from an API and simulate fetching user information. It uses advanced JavaScript features to combine data from two asynchronous operations and logs the merged information.