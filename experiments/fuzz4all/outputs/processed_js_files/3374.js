 
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');

 
async function generateSecureToken() {
  const randomBytesAsync = util.promisify(crypto.randomBytes);
  const buffer = await randomBytesAsync(32);
  return buffer.toString('hex');
}

 
const user = {
  name: 'Alice',
  age: 25
};

const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed with value: ${target[prop]}`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxyUser = new Proxy(user, handler);

 
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  set fullName(name) {
    const [firstName, lastName] = name.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

 
const { name: userName } = proxyUser;
const updatedUser = { ...user, country: 'Wonderland' };

 
(async () => {
  try {
    print('Generating secure token...');
    const token = await generateSecureToken();
    print(`Secure token: ${token}`);

    print(`User name: ${userName}`);
    
    const person = new Person('Bob', 'Builder');
    print(`Person's full name: ${person.fullName}`);
    
    person.fullName = 'Charlie Chaplin';
    print(`Updated Person's full name: ${person.fullName}`);
    
    print(`Updated User with country: ${JSON.stringify(updatedUser)}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
