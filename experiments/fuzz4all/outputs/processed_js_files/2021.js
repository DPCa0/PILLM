 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property "${prop}" does not exist`;
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = {
  name: 'AdvancedJS',
  version: 1.0
};

const proxyObject = new Proxy(targetObject, handler);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const fibSequence = fibonacciGenerator();

 
(async () => {
  print('Hello, world!');
  
   
  print(proxyObject.name);
  proxyObject.language = 'JavaScript';
  
   
  print('Fibonacci:', fibSequence.next().value);
  print('Fibonacci:', fibSequence.next().value);
  
   
  await fetchData('https://api.github.com');
})();
