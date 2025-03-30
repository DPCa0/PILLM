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
    super.speak();
    print(`${this.name} barks.`);
  }
}

function createProxy(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
      } else {
        print(`Property ${prop} not found`);
        return undefined;
      }
    },
    set(target, prop, value, receiver) {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(...arguments);
    }
  });
}

const dog = new Dog('Rex');
const proxiedDog = createProxy(dog);

proxiedDog.speak();

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

const apiURL = 'https://jsonplaceholder.typicode.com/posts/1';
fetchData(apiURL);
