 

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      print(`Property '${property}' doesn't exist, creating new entry.`);
      target[property] = Symbol(property);
      return target[property];
    }
  }
};

const dynamicObject = new Proxy({}, handler);
print(dynamicObject.existingProperty); // undefined
print(dynamicObject.newProperty); // Symbol(newProperty)

// Promise chaining and async/await with error handling
const asyncTask = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve('Success!') : reject('Failure!');
  }, 1000);
});

(async () => {
  try {
    const result = await asyncTask();
    print(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    print('Operation complete');
  }
})();

// Generator function with delegation and iteration
function* generatorFunc() {
  yield* [1, 2, 3];
  yield 'Hello';
  yield* [4, 5];
}

const gen = generatorFunc();
for (const value of gen) {
  print(value);
}

// Using Map and Set data structures
const map = new Map();
map.set('name', 'John Doe');
map.set('age', 30);

const set = new Set([1, 2, 3, 4, 5]);

map.forEach((value, key) => print(`Map key: ${key}, value: ${value}`));
set.forEach(value => print(`Set value: ${value}`));

// Destructuring with default values and rest operator
const person = { firstName: 'Jane', lastName: 'Doe', country: 'Unknown' };
const { firstName, lastName, age = 25, ...rest } = person;

print(firstName, lastName, age, rest);
