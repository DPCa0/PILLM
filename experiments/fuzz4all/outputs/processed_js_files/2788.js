 

 
function* generatorFunction() {
  yield new Promise((resolve) => setTimeout(() => resolve('First Step'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Second Step'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Third Step'), 1000));
}

 
async function handleGenerator(gen) {
  for await (let step of gen) {
    print(step);
  }
}

 
const targetObject = {
  value: 42,
};

const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed`);
    return target[prop];
  },
};

const proxiedObject = new Proxy(targetObject, handler);

 
async function main() {
   
  const [first, second, ...rest] = [10, 20, 30, 40, 50];
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

   
  const message = `Hello, value is ${proxiedObject?.value ?? 'undefined'}`;
  print(message);

   
  const gen = generatorFunction();
  await handleGenerator(gen);

   
  const results = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then((res) => res.json()),
  ]);

  print('Results:', results);
}

main().catch(console.error);
