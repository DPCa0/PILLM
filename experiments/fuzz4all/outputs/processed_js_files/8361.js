 

class Api {
  static fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Alice', age: 30 },
          { id: 2, name: 'Bob', age: 25 },
          { id: 3, name: 'Charlie', age: 35 },
        ]);
      }, 1000);
    });
  }
}

class User {
  constructor({ id, name, age }) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  static greet() {
    print('Welcome to the user database!');
  }

  getUserInfo = () => `${this.name}, age ${this.age}`;
}

(async () => {
  User.greet();
  
  try {
    const data = await Api.fetchData();
    const users = data.map((userData) => new User(userData));

    users.forEach(({ getUserInfo }) => {
      print(getUserInfo());
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
