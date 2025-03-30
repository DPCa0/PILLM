 
import fetch from 'node-fetch';

 
const ID = Symbol('id');

 
class User {
  #name;
  constructor(name, id) {
    this.#name = name;
    this[ID] = id;
  }

  getName() {
    return this.#name;
  }

  getId() {
    return this[ID];
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return target[property];
  },
};

const user = new Proxy(new User('Alice', 123), handler);

(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();

     
    const { name: apiName } = data;

     
    print(`User from API: ${apiName ?? 'Unknown'}`);

     
    const bigNumber = BigInt('9007199254740991');

     
    print(`Local User: ${user.getName()} with ID: ${user.getId()}`);
    print(`BigInt operation: ${bigNumber + BigInt(user.getId())}`);

     
    const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
    const numbersArray = [...uniqueNumbers];
    print(`Unique Numbers: ${numbersArray}`);

     
    print(`API User Name: ${data?.name ?? 'No Name Found'}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
