 
const complexIterable = {
  [Symbol.iterator]: function* () {
    yield* ['apple', 'banana', 'cherry', ...Array.from({ length: 3 }, (_, i) => `fruit-${i}`)];
  }
};

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const fruitBasket = new Proxy({
  addFruit(fruit) {
    this.fruits.push(fruit);
  },
  removeFruit(fruit) {
    this.fruits = this.fruits.filter(f => f !== fruit);
  },
  fruits: []
}, handler);

 
async function manageFruits() {
  const initialFruits = [...complexIterable];

   
  await new Promise(resolve => setTimeout(resolve, 500));

  fruitBasket.addFruit('mango');
  fruitBasket.addFruit('orange');

  for (const fruit of initialFruits) {
    fruitBasket.addFruit(fruit);
  }

  print('Fruit Basket:', fruitBasket.fruits);

  fruitBasket.removeFruit('banana');
  print('Updated Fruit Basket:', fruitBasket.fruits);
}

manageFruits();
