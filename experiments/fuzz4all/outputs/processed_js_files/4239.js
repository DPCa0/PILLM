class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks.`;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRandomNumber() {
  return new Promise(resolve => {
    setTimeout(() => resolve(Math.random()), 1000);
  });
}

(async () => {
  const dog = new Dog("Buddy", 3, "Golden Retriever");
  print(dog.speak());
  
  const numbers = await Promise.all([getRandomNumber(), getRandomNumber(), getRandomNumber()]);
  print("Random Numbers:", numbers);
  
  print("Delaying for 2 seconds...");
  await delay(2000);
  print("Done!");

  const fruitBasket = {
    apple: 27,
    orange: 15,
    banana: 8,
  };

  const maxFruit = Object.entries(fruitBasket).reduce(
    (acc, [fruit, count]) => (count > acc[1] ? [fruit, count] : acc),
    ['', 0]
  );

  print(`The fruit with the maximum count is ${maxFruit[0]} with ${maxFruit[1]} items.`);
})();
