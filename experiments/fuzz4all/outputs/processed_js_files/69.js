class User {
  #password;
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  static async fetchRandomQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data.content;
  }

  validatePassword(password) {
    return this.#password === password;
  }

  static *generateUsernames(base, limit) {
    for (let i = 1; i <= limit; i++) {
      yield `${base}${i}`;
    }
  }

  async greet() {
    const quote = await User.fetchRandomQuote();
    print(`Hello, ${this.username}! Here's a quote for you: "${quote}"`);
  }
}

(async () => {
  // Create a new user
  const user = new User('Alice', 'secret');

  // Validate password
  print(user.validatePassword('secret')); // true
  print(user.validatePassword('wrong')); // false

  // Generate usernames
  const generator = User.generateUsernames('User', 3);
  print(generator.next().value);  
  print(generator.next().value);  
  print(generator.next().value);  

   
  await user.greet();
})();
