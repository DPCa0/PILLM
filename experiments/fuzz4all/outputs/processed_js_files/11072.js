class User {
  #password;
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = this.#encryptPassword(password);
  }

  #encryptPassword(password) {
    return [...password].map(char => char.charCodeAt(0) + 2).join('');
  }

  authenticate(passwordAttempt) {
    return this.#encryptPassword(passwordAttempt) === this.#password;
  }

  get userInfo() {
    return {
      name: this.name,
      email: this.email
    };
  }
}

const users = new Proxy([], {
  set(target, property, value) {
    if (value instanceof User) {
      print(`Adding user: ${value.name}`);
      target[property] = value;
      return true;
    }
    throw new Error("Only instances of User can be added");
  }
});

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

(async () => {
  const user1 = new User("Alice", "alice@example.com", "secret123");
  const user2 = new User("Bob", "bob@example.com", "mypass456");

  users.push(user1);
  users.push(user2);

  print(user1.authenticate("secret123"));  
  print(user2.userInfo);  

  const data = await fetchData("https://jsonplaceholder.typicode.com/posts");
  print(data ? "Fetched data successfully" : "Failed to fetch data");
})();
