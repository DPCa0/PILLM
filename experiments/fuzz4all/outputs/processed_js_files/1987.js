 
const { EventEmitter } = require('events');

 
const person = new Proxy({ name: 'Alice', age: 25 }, {
  get(target, prop) {
    print(`Accessed property "${prop}": ${target[prop]}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
async function* asyncNumbers() {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

 
(async () => {
  for await (let num of asyncNumbers()) {
    print('Async Number:', num);
  }
})();

 
const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
  print(`Hello, ${name}!`);
});

 
eventEmitter.emit('greet', person.name);

 
const extendedPerson = { ...person, occupation: 'Engineer' };
print('Extended Person:', extendedPerson);

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');

 
const user = { settings: { theme: 'dark' } };
const userTheme = user.settings?.theme ?? 'light';
print('User Theme:', userTheme);
