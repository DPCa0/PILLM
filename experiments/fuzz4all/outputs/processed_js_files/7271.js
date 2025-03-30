class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  *[Symbol.iterator]() {
    yield* Object.values(this);
  }
}

const users = [
  new User("Alice", 30),
  new User("Bob", 24),
  new User("Charlie", 35),
];

const getAverageAge = (users) => {
  const totalAge = users.reduce((acc, user) => acc + user.age, 0);
  return totalAge / users.length;
};

const asyncFunction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
};

(async () => {
  print("Starting async operation...");
  print(await asyncFunction());

  print("Iterating through user objects:");
  for (const user of users) {
    print([...user]);
  }

  print(`Average age of users: ${getAverageAge(users)}`);
})();
