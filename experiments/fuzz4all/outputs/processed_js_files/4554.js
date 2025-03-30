 

 
function delayPromise() {
  return new Promise((resolve) => {
    const delay = Math.random() * 1000;
    setTimeout(() => resolve(`Resolved after ${delay.toFixed(0)} ms`), delay);
  });
}

 
async function* asyncGenerator() {
  const results = [delayPromise(), delayPromise(), delayPromise()];
  for (const promise of results) {
    const result = await promise;
    yield result;
  }
}

 
const asyncHandler = {
  get: (target, prop) => {
    if (prop === Symbol.asyncIterator) {
      print('Iterating through async generator...');
    }
    return target[prop];
  },
};

(async () => {
  const generator = new Proxy(asyncGenerator(), asyncHandler);
  for await (const result of generator) {
    print(result);
  }
})();

 
function calculateSum(...numbers) {
  const [first, second, ...rest] = numbers;
  return first + second + rest.reduce((acc, val) => acc + val, 0);
}

print('Sum:', calculateSum(5, 10, 15, 20, 25));  

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, index) => acc + str + (values[index] ? values[index] : ''), '');
}

const name = 'World';
print(tag`Hello, ${name}! Welcome to ${'JavaScript'} advanced features.`);
