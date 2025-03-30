class User {
  #password;  
  
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }
  
  validatePassword(password) {
    return this.#password === password;
  }
}

async function fetchUserData(username) {
   
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ username: username, data: `Data for ${username}` });
    }, 1000);
  });
}

const cache = new WeakMap();

async function getUserData(username) {
  if (cache.has(username)) {
    print('Returning cached data');
    return cache.get(username);
  }

  const userData = await fetchUserData(username);
  cache.set(username, userData);
  print('Fetched new data');
  return userData;
}

function* usernameGenerator() {
  yield 'Alice';
  yield 'Bob';
  yield 'Charlie';
}

(async function() {
  const usernames = usernameGenerator();

  for (const name of usernames) {
    const user = new User(name, 'password123');
    print(`User: ${user.username}`);

    if (user.validatePassword('password123')) {
      const data = await getUserData(user.username);
      print(data);
    } else {
      print('Invalid password');
    }
  }
})();
