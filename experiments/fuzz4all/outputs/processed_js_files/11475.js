 

 
async function fetchData(url) {
  const responseProxy = new Proxy(fetch(url), {
    get: (target, prop) => {
      if (prop === 'then') {
        return target.then.bind(target);
      }
      return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  });

  const response = await responseProxy;
  const data = await response.json();
  return data;
}

 
function* generateFibonacci(n) {
  let [a, b] = [0, 1];
  while (n-- > 0) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
async function runProgram() {
  try {
    const dataPromise = fetchData('https://jsonplaceholder.typicode.com/todos/1');
    const fibGen = generateFibonacci(10);

    const [data, fibonacciSequence] = await Promise.all([dataPromise, [...fibGen]]);
    print('Fetched Data:', data);
    print('Fibonacci Sequence:', fibonacciSequence);
  } catch (error) {
    console.error('Error:', error);
  }
}

runProgram();
