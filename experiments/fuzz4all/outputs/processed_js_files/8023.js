 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const reactiveHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const reactiveObject = new Proxy({ name: 'World', count: 0 }, reactiveHandler);

 
(async function main() {
   
  print(`Hello, ${reactiveObject.name}!`);
  reactiveObject.name = 'JavaScript Enthusiast';

   
  print('First 5 Fibonacci numbers:');
  for (let num of fibonacci(5)) {
    print(num);
  }

   
  const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(apiURL);
  print('Fetched Data:', data);

   
  reactiveObject.count += 1;
  print(`Count is now: ${reactiveObject.count}`);
})();
