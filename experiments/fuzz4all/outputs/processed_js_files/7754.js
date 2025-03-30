 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggerProxy = obj => new Proxy(obj, {
  get(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  }
});

 
function* numberGenerator() {
  yield* [1, 2, 3, 4, 5];
}

const [one, two, ...others] = numberGenerator();
print(`Numbers: ${one}, ${two}, [${others.join(', ')}]`);

 
const transformArray = arr => arr.map(x => x * 2);

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, index) => `${acc}${str}<b>${values[index] || ''}</b>`, '');
}

 
async function main() {
  readline.question('What is your name? ', async name => {
    const user = loggerProxy({ name });
    print(highlight`Hello, ${user.name}! Let's wait a moment...`);
    await delay(2000);
    print('Thanks for waiting! Here is some transformed data:');
    print(transformArray([1, 2, 3, 4, 5]));
    readline.close();
  });
}

 
main();
