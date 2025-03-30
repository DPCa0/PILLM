 
(async () => {
  if (Math.random() > 0.5) {
    const { greet } = await import('./greetingModule.js');
    greet();
  } else {
    print('Did not meet the threshold to greet!');
  }
})();

 
const targetObject = {
  name: 'JavaScript',
  type: 'Programming Language'
};

const handler = {
  get(target, property) {
    print(`Property '${property}' accessed`);
    return Reflect.get(target, property);
  }
};

const proxy = new Proxy(targetObject, handler);

print(proxy.name);

 
async function* fetchData() {
  let data = [1, 2, 3, 4, 5];
  for (let item of data) {
    yield new Promise((resolve) => {
      setTimeout(() => resolve(item), 1000);
    });
  }
}

(async () => {
  for await (const num of fetchData()) {
    print(`Fetched data: ${num}`);
  }
})();

 
class SecretKeeper {
  #secret;
  
  constructor(secret) {
    this.#secret = secret;
  }
  
  revealSecret() {
    return `The secret is ${this.#secret}`;
  }
}

const keeper = new SecretKeeper('JavaScript is versatile');
print(keeper.revealSecret());

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const set = new Set();
set.add('value1');
set.add('value2');
set.add('value2');  

print('Map:', map);
print('Set:', set);

 
const simulateAsyncTask = (message, delay) => 
  new Promise(resolve => setTimeout(() => resolve(message), delay));

(async () => {
  const result1 = await simulateAsyncTask('Task 1 complete', 1000);
  print(result1);
  const result2 = await simulateAsyncTask('Task 2 complete', 2000);
  print(result2);
  const result3 = await simulateAsyncTask('Task 3 complete', 1000);
  print(result3);
})();
