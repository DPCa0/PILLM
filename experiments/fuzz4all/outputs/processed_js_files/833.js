 

function* numberGenerator() {
  for (let i = 0; i < 3; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), 1000));
  }
}

async function processNumbers() {
  const numbers = numberGenerator();
  for await (const num of numbers) {
    print(`Generated number: ${num}`);
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}" with value "${target[prop]}"`);
      return target[prop];
    } else {
      throw new Error(`Property "${prop}" not found`);
    }
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.name = "Advanced JavaScript";
print(obj.name);

processNumbers().then(() => print('All numbers processed.'));
