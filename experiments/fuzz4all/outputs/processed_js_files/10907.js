class User {
  #password;   

  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  static #hashPassword(password) {
    return [...password].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  validatePassword(inputPassword) {
    return User.#hashPassword(inputPassword) === this.#password;
  }

  get profile() {
    return `Username: ${this.username}`;
  }
}

async function fetchUserData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

(async () => {
  const userData = await fetchUserData();
  const user = new User(userData.username, User.#hashPassword('securePassword123'));

  const gen = idGenerator();
  print(`Generated ID: ${gen.next().value}`);
  print(user.profile);
  print(`Password is valid: ${user.validatePassword('securePassword123')}`);
})();
