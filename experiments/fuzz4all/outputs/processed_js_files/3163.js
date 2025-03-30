 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* dataStreamer() {
  for (let i = 0; i < 5; i++) {
    await delay(500);
    yield `Data chunk ${i + 1}`;
  }
}

 
const handler = {
  get: (target, property, receiver) => {
    if (property === 'next') {
      print('Accessing next data chunk...');
    }
    return Reflect.get(target, property, receiver);
  }
};

(async () => {
  const streamer = dataStreamer();
  const proxiedStreamer = new Proxy(streamer, handler);
  
  for await (const chunk of proxiedStreamer) {
    print(chunk);
  }
})();

 
(() => {
  const secret = 'This is a secret';
  print(`Within IIFE: ${secret}`);
})();

 
const createPerson = (name, age) => ({
  name,
  age,
  greet() {
    print(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
});

const person = createPerson('Alice', 30);
person.greet();

 
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);
print(`Sum: ${sum(1, 2, 3, 4)}`);

 
const numbers = [1, 2, 3, 3, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
print(`Unique numbers: ${uniqueNumbers}`);
