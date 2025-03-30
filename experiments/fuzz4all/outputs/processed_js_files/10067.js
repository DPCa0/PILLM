 
"use strict";

 
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    print(`${this.name} makes a sound.`);
  }
}

 
class Dog extends Animal {
  speak() {
    print(`${this.name} barks.`);
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Property '${prop}' accessed with value: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property '${prop}' does not exist.`);
      return undefined;
    }
  },
  set: function(target, prop, value) {
    if (prop === 'name' && typeof value === 'string') {
      print(`Setting '${prop}' to '${value}'`);
      target[prop] = value;
      return true;
    } else {
      print(`Cannot set '${prop}' to '${value}'`);
      return false;
    }
  }
};

 
let myDog = new Dog('Rex');
myDog = new Proxy(myDog, handler);

 
function* randomMessageGenerator() {
  const messages = ["Hello", "Woof", "Growl"];
  while (true) {
    yield messages[Math.floor(Math.random() * messages.length)];
  }
}

const messageGen = randomMessageGenerator();

 
async function showRandomMessages(times) {
  for (let i = 0; i < times; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    print(messageGen.next().value);
  }
}

 
myDog.speak();
myDog.name = 'Buddy';
myDog.speak();

showRandomMessages(3);
