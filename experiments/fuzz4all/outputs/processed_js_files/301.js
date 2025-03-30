 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 2000);
  });
};

 
function* fibonacciGenerator() {
  let [prev, current] = [0, 1];
  while (true) {
    [prev, current] = [current, prev + current];
    yield current;
  }
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get(target, property) {
    print(`Property '${property}' accessed`);
    return target[property];
  },
  set(target, property, value) {
    print(`Property '${property}' set to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
   
  const { a, b } = proxyObject;
  print(`Values from proxy object: a = ${a}, b = ${b}`);

   
  const data = await fetchData('https://api.example.com/data');
  print(data);

   
  const fibonacci = fibonacciGenerator();
  for (let i = 0; i < 5; i++) {
    print(`Fibonacci number ${i + 1}: ${fibonacci.next().value}`);
  }

   
  const numbers = [1, 2, 3];
  const doubled = [...numbers].map(num => num * 2);
  print(`Doubled numbers: ${doubled.join(', ')}`);
})();
