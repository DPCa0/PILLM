 

 
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: "Alice", age: 30 }, preferences: { color: "blue" } });
    }, 1000);
  });
}

 
import { delay, fetchData } from './utility.js';

class User {
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }

  greet() {
    print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

class Application {
  async run() {
    print("Fetching data...");
    const { user, preferences } = await fetchData();
    
    const currentUser = new User(user);
    currentUser.greet();
    
    await delay(500);
    print(`My favorite color is ${preferences.color}.`);
  }
}

 
const app = new Application();
app.run();

Save the above code in two separate files, `utility.js` and `main.js`. Then, you can execute `main.js` in an environment that supports ES modules, like Node.js with appropriate flags or modern browsers.