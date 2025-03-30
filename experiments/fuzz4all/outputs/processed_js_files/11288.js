 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
function* counter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} not found, returning default value`);
      return 'default';
    }
  }
};

const proxy = new Proxy({ a: 1, b: 2 }, handler);

 
const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

 
const double = x => x * 2;
const square = x => x * x;

 
const doubleThenSquare = compose(square, double);

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);

     
    const gen = counter();
    print('Counter 1:', gen.next().value);
    print('Counter 2:', gen.next().value);

     
    print('Proxy a:', proxy.a);
    print('Proxy nonExistent:', proxy.nonExistent);

     
    print('Double then square 3:', doubleThenSquare(3));
  } catch (error) {
    console.error('Error:', error);
  }
})();
