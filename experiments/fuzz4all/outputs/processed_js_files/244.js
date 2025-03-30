 
class MagicNumber {
  #secret;  

  constructor(value) {
    this.#secret = value;
  }

  get secret() {
     
    return this.#secret;
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'getRandom') {
      return () => Math.random() * target.magicNumber.secret;
    }
    return Reflect.get(target, prop);
  }
};

const magicNumber = new MagicNumber(42);
const magicObject = new Proxy({ magicNumber }, handler);

function* numberGenerator(start = 0) {
  let count = start;
  while (true) {
    yield count++;
  }
}

const generator = numberGenerator(1);
const { create, freeze } = Object;

const complexObject = freeze(
  create(
    {
      randomFactor() {
        return magicObject.getRandom();
      }
    },
    {
      count: {
        get() {
          return generator.next().value;
        }
      }
    }
  )
);

print(`Random Factor: ${complexObject.randomFactor()}`);
print(`Current Count: ${complexObject.count}`);
print(`Next Count: ${complexObject.count}`);
