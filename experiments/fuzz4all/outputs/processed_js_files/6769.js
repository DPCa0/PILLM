 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const logger = new Proxy({}, {
  get(target, property) {
    print(`Property "${property}" was accessed`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Property "${property}" was set to ${value}`);
    return Reflect.set(target, property, value);
  }
});

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
function measureTime(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    print(`Execution time for ${key}: ${end - start}ms`);
    return result;
  };
  return descriptor;
}

class Example {
  @measureTime
  compute(n) {
    return [...Array(n).keys()].reduce((sum, x) => sum + x, 0);
  }
}

(async function() {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(apiURL);
  
  logger.apiData = data;  

  const generator = numberGenerator();
  print(generator.next().value);  
  print(generator.next().value);  
  
  const example = new Example();
  print(example.compute(100000));  
})();
