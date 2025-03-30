Certainly! Below is a complex JavaScript program that uses advanced features such as asynchronous programming with Promises, async/await, destructuring, the spread operator, and classes.

class UserProfile {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  toString() {
    return `User(${this.id}): ${this.name} - ${this.email}`;
  }
}

const mockFetchUserData = (id) => {
  const users = {
    1: { id: 1, name: 'Alice', email: 'alice@example.com' },
    2: { id: 2, name: 'Bob', email: 'bob@example.com' },
    3: { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      users[id] ? resolve(users[id]) : reject('User not found');
    }, 1000);
  });
};

const logUserProfile = async (id) => {
  try {
    const userData = await mockFetchUserData(id);
    const userProfile = new UserProfile(...Object.values(userData));
    print(userProfile.toString());
  } catch (error) {
    console.error(error);
  }
};

const userIds = [1, 2, 3, 4];
userIds.forEach(logUserProfile);

This program uses a `UserProfile` class to represent a user. It fetches user data asynchronously with a mock function `mockFetchUserData`, and logs each user profile in the `logUserProfile` function. The spread operator and `Object.values` are used to unpack user data into the class constructor. Asynchronous error handling is done with try-catch in an `async` function.