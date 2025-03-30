 

class RandomUser {
  constructor() {
    this.apiURL = 'https://randomuser.me/api/';
  }

  async *getUsers(count) {
    for (let i = 0; i < count; i++) {
      const response = await fetch(this.apiURL);
      const data = await response.json();
      yield data.results[0];
    }
  }
}

 
const userHandler = {
  get(target, prop, receiver) {
    if (prop === 'fullName') {
      return `${target.name.first} ${target.name.last}`;
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
async function displayUsers(count) {
  const userGenerator = new RandomUser();
  const gen = userGenerator.getUsers(count);
  const results = [];

  for await (const user of gen) {
    const proxiedUser = new Proxy(user, userHandler);
    print(`Name: ${proxiedUser.fullName}, Email: ${proxiedUser.email}`);
    results.push(proxiedUser);
  }

  return results;
}

 
(async () => {
  try {
    print('Fetching random users...');
    await displayUsers(3);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();
