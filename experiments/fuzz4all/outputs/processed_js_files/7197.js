 

class RandomNumberGenerator {
  constructor(max) {
    this.max = max;
  }

  *generate() {
    while (true) {
      yield Math.floor(Math.random() * this.max);
    }
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(...arguments);
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  }
};

const proxiedGenerator = new Proxy(new RandomNumberGenerator(100), handler);

async function getRandomNumberAsync(gen) {
  let result = gen.generate().next().value;
  return new Promise(resolve => setTimeout(() => resolve(result), 1000));
}

(async () => {
  try {
    print('Generating random numbers with delay:');
    for (let i = 0; i < 5; i++) {
      const number = await getRandomNumberAsync(proxiedGenerator);
      print(`Random Number ${i + 1}: ${number}`);
    }
  } catch (error) {
    console.error(error.message);
  }
})();
