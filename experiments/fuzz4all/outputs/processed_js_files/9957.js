const fetch = require('node-fetch');

 
const handler = {
  get: (target, prop) => (typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop]),
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const user = new Proxy(
  {
    firstName: 'John',
    lastName: 'Doe',
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    greet() {
      print(`Hello, my name is ${this.fullName}`);
    },
  },
  handler
);

 
(async () => {
  try {
    user.firstName = 'Jane';
    user.greet();

    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = await fetch(url);
    const { userId, title } = await response.json();

    print(`Fetched data: User ID - ${userId}, Title - ${title}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
