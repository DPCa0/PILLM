 
(async () => {
  const { greet } = await import('./greetModule.js');
  greet('Hello from dynamic import!');
})();

 
const handler = {
  get(target, property) {
    print(`Property '${property}' accessed with value: ${target[property]}`);
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);
print(user.name);
print(user.age);

 
function* idGenerator() {
  let id = 1;
  while(true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);
print(gen.next().value);

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
function timeLog(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    console.time(name);
    const result = originalMethod.apply(this, args);
    console.timeEnd(name);
    return result;
  };
  return descriptor;
}

class MathOps {
  @timeLog
  add(a, b) {
    return a + b;
  }
}

const math = new MathOps();
print(math.add(5, 10));

 
const privateProps = new WeakMap();

class SecretHolder {
  constructor(secret) {
    privateProps.set(this, { secret });
  }

  revealSecret() {
    print(privateProps.get(this).secret);
  }
}

const secretHolder = new SecretHolder('The cake is a lie!');
secretHolder.revealSecret();
