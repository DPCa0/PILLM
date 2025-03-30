 
import { readFile } from 'fs/promises';

 
async function fetchFileContent(filePath) {
  try {
     
    const { default: chalk } = await import('chalk');

     
    const data = await readFile(filePath, 'utf8');

     
    print(chalk.greenBright`File content:\n${data}`);
  } catch (err) {
     
    console.error(err?.message ?? 'An error occurred');
  }
}

 
function* fibonacciGenerator(n) {
  let [prev, curr] = [0, 1];
  while (n-- > 0) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibonacciProxy = new Proxy(fibonacciGenerator(10), {
  get(target, prop, receiver) {
    if (prop === Symbol.iterator) {
      return function () {
        return this;
      }.bind(receiver);
    }
    return Reflect.get(target, prop, receiver);
  },
});

print('Fibonacci Sequence:');
for (const num of fibonacciProxy) {
  print(num);
}

 
const privateData = new WeakMap();
class SecretKeeper {
  constructor(secret) {
    privateData.set(this, secret);
  }
  revealSecret() {
    print(`The secret is: ${privateData.get(this)}`);
  }
}

const secretKeeper = new SecretKeeper('42 is the answer');
secretKeeper.revealSecret();

 
fetchFileContent('./sample.txt');
