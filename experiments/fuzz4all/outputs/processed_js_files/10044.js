 
const userReferences = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
     
    userReferences.set(this, { loginCount: 0 });
  }

  login() {
    const userData = userReferences.get(this);
    userData.loginCount += 1;
    print(`${this.name} has logged in ${userData.loginCount} times.`);
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property "${property}":`, target[property]);
      return target[property];
    } else {
      console.error(`Property "${property}" not found.`);
    }
  }
};

 
const secret = Symbol('secret');

class Admin extends User {
  constructor(name, secretCode) {
    super(name);
    this[secret] = secretCode;
     
    return new Proxy(this, handler);
  }

  revealSecret() {
    print(`${this.name}'s secret code is ${this[secret]}`);
  }
}

// Async function using async/await and Promises
async function simulateLogins(user, times) {
  print(`Simulating ${times} logins for ${user.name}...`);
  for (let i = 0; i < times; i++) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Delay to simulate real logins
    user.login();
  }
}

// Main execution
(async () => {
  const alice = new Admin('Alice', '1234');
  await simulateLogins(alice, 3);
  alice.revealSecret();

   
  print(alice.someUnknownProperty);
})();
