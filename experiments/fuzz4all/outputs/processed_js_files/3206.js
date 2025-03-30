class UserProfile {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get profile() {
    return `Name: ${this.#name}, Age: ${this.#age}`;
  }

  updateProfile({ name, age } = {}) {
    if (name) this.#name = name;
    if (age) this.#age = age;
  }
}

function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30 });
    }, 1000);
  });
}

async function main() {
  const { name, age } = await fetchUserData();

  const user = new UserProfile(name, age);
  print(user.profile);

   
  const handler = {
    set(target, prop, value) {
      print(`Property '${prop}' set to ${value}`);
      target[prop] = value;
      return true;
    },
  };

  const proxiedUser = new Proxy(user, handler);
  proxiedUser.updateProfile({ age: 31 });
  print(proxiedUser.profile);
}

main();

 
async function* generateUserAges() {
  const ages = [25, 26, 27];
  for (const age of ages) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    yield age;
  }
}

(async () => {
  for await (const age of generateUserAges()) {
    print(`Generated age: ${age}`);
  }
})();
