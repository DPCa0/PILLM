 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
  for (let i = 1; i <= 5; i++) {
    await delay(100);
    yield i;
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property "${prop}" is not available`;
    }
  }
};

const enhancedObject = new Proxy({
  greet: name => `Hello, ${name}!`,
  multiply: (a, b) => a * b,
}, handler);

const main = async () => {
  print(enhancedObject.greet('world'));
  print(enhancedObject.multiply(2, 3));
  print(enhancedObject.unknownProp);

  print('Asynchronous Generator Output:');
  for await (const value of asyncGenerator()) {
    print(value);
  }
};

 
function highlight(strings, ...values) {
  return strings.reduce((prev, current, i) => {
    return `${prev}${current}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const name = 'Alice';
const activity = 'coding';
print(highlight`This is ${name}, and she loves ${activity}!`);

main();
