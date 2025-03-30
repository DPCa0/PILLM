 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
});

 
async function* dataStream() {
  const result = await fetchData();
  for (const item of result.data) {
    yield item * 2;
  }
}

 
(async function processData() {
  for await (const item of dataStream()) {
    print(`Processed Value: ${item}`);
  }
})();

 
const target = { message: 'Hello, world!' };
const handler = {
  get: (obj, prop) => {
    print(`Accessed property "${prop}" with value: ${obj[prop]}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Changed property "${prop}" from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
print(proxy.message);   
proxy.message = 'Hello, Proxy!';   

 
const text = "hello world hello JavaScript world";
const wordFreq = new Map();

text.split(' ').forEach(word => {
  wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
});

 
for (const [word, count] of wordFreq) {
  print(`Word: "${word}" appears ${count} times.`);
}

 
const user = { name: 'Alice', age: 30 };
Reflect.set(user, 'age', 31);
print(`User's new age: ${Reflect.get(user, 'age')}`);

// Create a class with private fields and methods
class Greeter {
  #greeting = 'Hello';

  #getGreeting() {
    return this.#greeting;
  }

  greet() {
    print(this.#getGreeting(), 'world!');
  }
}

const greeter =