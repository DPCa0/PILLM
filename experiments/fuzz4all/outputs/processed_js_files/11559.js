 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

async function logNumbers(generator) {
  for (const num of generator) {
    if (num > 5) break;  
    print(`Logging number: ${num}`);
    await delay(1000);  
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'message') {
      return `Intercepted message: ${target[prop]}`;
    }
    return target[prop];
  }
};

const data = { message: 'Hello, Proxy!' };
const proxy = new Proxy(data, handler);

print(proxy.message);

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4]);
const numMap = new Map([...uniqueNumbers].map(num => [num, num * num]));

for (const [num, square] of numMap) {
  print(`Number: ${num}, Square: ${square}`);
}

 
(async () => {
  const generator = numberGenerator();
  await logNumbers(generator);
})();
