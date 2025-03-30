 
import fetch from 'node-fetch';

 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

     
    const { userId, title } = data;

     
    print(`User ID: ${userId}\nTask: ${title}`);

     
    const numbers = [10, 20, 30, 40, 50];
    const [first, ...rest] = numbers;
    const sum = rest.reduce((acc, val) => acc + val, first);

    print(`Sum of numbers: ${sum}`);

     
    const map = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);

    for (let [key, value] of map) {
      print(`Map Entry - ${key}: ${value}`);
    }

     
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

     
    async function* asyncGenerator() {
      let i = 0;
      while (i < 3) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
      }
    }

    for await (let num of asyncGenerator()) {
      print(`Async generator output: ${num}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
