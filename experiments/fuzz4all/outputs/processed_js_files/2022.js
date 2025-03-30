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

const handler = {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      print(`Property ${property} does not exist.`);
      return null;
    }
  }
};

const dog = new Proxy(new Dog('Rex'), handler);

function* generateNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const numbers = generateNumbers();
const logNumbers = async () => {
  for await (let n of numbers) {
    print(n);
    if (n >= 5) break;
  }
};

async function main() {
  dog.speak();
  print(dog.age);  
  await logNumbers();
}

main();
