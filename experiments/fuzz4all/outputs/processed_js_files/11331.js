 

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}, and I am ${this.age} years old.`;
  }
}

const fetchUserData = (userId) => new Promise((resolve) => {
  setTimeout(() => {
    const users = {
      1: new User('Alice', 25),
      2: new User('Bob', 30),
      3: new User('Charlie', 35)
    };
    resolve(users[userId]);
  }, 1000);
});

const main = async () => {
  const userIds = [1, 2, 3];
  const users = await Promise.all(userIds.map(fetchUserData));

  const [firstUser, ...restUsers] = users;

  print(firstUser.greet());
  restUsers.forEach(user => print(user.greet()));

  const mergedUserInfo = {
    ...firstUser,
    hobbies: ['reading', 'traveling'],
    job: 'Developer'
  };

  print(`Merged User Info: ${JSON.stringify(mergedUserInfo)}`);
};

main();
