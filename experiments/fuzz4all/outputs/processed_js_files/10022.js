class User {
  #name;
  static #counter = 0;

  constructor(name) {
    this.#name = name;
    this.id = User.#generateId();
  }

  static #generateId() {
    return ++this.#counter;
  }

  getName() {
    return this.#name;
  }

  static async fetchData() {
     
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: 'User Data' }), 1000)
    );
  }

  static async *generateAsyncSequence() {
    for (let i = 1; i <= 3; i++) {
      yield await new Promise((resolve) => setTimeout(() => resolve(i), 1000));
    }
  }
}

(async () => {
  const user1 = new User('Alice');
  const user2 = new User('Bob');

  print(`User 1: ${user1.getName()}, ID: ${user1.id}`);
  print(`User 2: ${user2.getName()}, ID: ${user2.id}`);

  print('Fetching data...');
  const data = await User.fetchData();
  print(data);

  print('Generating async sequence:');
  for await (const num of User.generateAsyncSequence()) {
    print(num);
  }
})();
