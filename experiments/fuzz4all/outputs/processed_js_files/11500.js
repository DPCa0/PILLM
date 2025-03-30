class User {
  #privateName;  

  constructor(name, age) {
    this.#privateName = name;
    this.age = age;
  }

  get name() {
    return this.#privateName;
  }

  set name(newName) {
    if (newName.length > 0) {
      this.#privateName = newName;
    }
  }

  async greet() {
    const greeting = await new Promise((resolve) => {
      setTimeout(() => resolve(`Hello, ${this.#privateName}!`), 1000);
    });
    print(greeting);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json());
  return data;
};

(async () => {
  const [user, data] = await Promise.all([new User('Alice', 30), fetchData()]);

  user.greet();

  print(`User Info: Name: ${user.name}, Age: ${user.age}`);
  print(`Fetched Data: ${JSON.stringify(data)}`);

  for await (const num of [1, 2, 3]) {
    print(num);
    await delay(500);
  }
})();
