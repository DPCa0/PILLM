 
'use strict';

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const data = { name: 'Alice', age: 30 };

 
const observedData = new Proxy(data, handler);

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}<em>${values[i] || ''}</em>`, '');
}

const userName = 'Bob';
const age = 25;
print(highlight`Welcome, ${userName}. You are ${age} years old.`);

 
async function* numbersAsyncGenerator() {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield i;
  }
}

(async function() {
  for await (const num of numbersAsyncGenerator()) {
    print(`Async number: ${num}`);
  }
})();

 
(async function() {
  if (Math.random() > 0.5) {
    const { sqrt } = await import('mathjs');
    print(`Dynamic import result: ${sqrt(16)}`);
  } else {
    print('Math not imported');
  }
})();

 
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    print(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex');
dog.speak();

 
observedData.name = 'Charlie';
print(observedData.name);

 
const userSettings = { theme: null };
print(userSettings.theme ?? 'Default theme');
print(userSettings.notifications?.email ?? 'No notifications settings');
