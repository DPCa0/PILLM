 

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const obj = new Proxy({}, handler);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
class Secret {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

  reveal() {
    return this.#secret;
  }
}

 
obj.newProperty = 'Hello Proxy!';  
print(obj.newProperty);  

fetchData('https://jsonplaceholder.typicode.com/posts/1');

const fibSequence = fibonacci(5);
for (let value of fibSequence) {
  print('Fibonacci:', value);
}

const mySecret = new Secret('TopSecret');
print('Revealed Secret:', mySecret.reveal());
