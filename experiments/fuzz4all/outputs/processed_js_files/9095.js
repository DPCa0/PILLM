 
class Person {
  constructor(name) {
    this.name = name;
  }

  async greet() {
    const greeting = await this.getGreeting();
    print(`${greeting}, ${this.name}!`);
  }

  getGreeting() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Hello'), 1000);
    });
  }
}

const names = ['Alice', 'Bob', 'Charlie'];

 
const people = names.map(name => new Person(name));

 
function* greeterQueue() {
  for (const person of people) {
    yield person;
  }
}

const queue = greeterQueue();

 
const queueHandler = {
  get: function(target, property) {
    if (property === 'nextGreet') {
      const nextPerson = target.next();
      if (!nextPerson.done) {
        nextPerson.value.greet();
      } else {
        print('All greetings completed.');
      }
    }
  }
};

 
const proxyQueue = new Proxy(queue, queueHandler);

 
proxyQueue.nextGreet;
proxyQueue.nextGreet;
proxyQueue.nextGreet;
proxyQueue.nextGreet;   
