class UserProfile {
  #password;

  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.#password = Symbol("securePassword");
  }

  static fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error("Error fetching data:", error));
  }

  async authenticate(inputPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        inputPassword === this.#password.toString()
          ? resolve("Authenticated")
          : reject("Authentication Failed");
      }, 1000);
    });
  }

  get profile() {
    return { name: this.name, email: this.email };
  }
}

(async () => {
  const user = new UserProfile("Alice", "alice@example.com");
  print(user.profile);

  try {
    const data = await UserProfile.fetchData("https://jsonplaceholder.typicode.com/users/1");
    print("Fetched Data:", data);

    await user.authenticate("Symbol(securePassword)");
    print("User authenticated successfully");
  } catch (error) {
    console.error(error);
  }
})();
