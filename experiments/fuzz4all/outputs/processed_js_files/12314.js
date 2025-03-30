 
const uniqueSymbol = Symbol('uniqueIdentifier');

 
const handler = {
  get: (target, property) => {
    if (property === 'greet') {
      return target[property] + ', have a great day!';
    }
    return target[property];
  }
};

const targetObject = {
  [uniqueSymbol]: 42,
  greet: 'Hello'
};

const proxyObject = new Proxy(targetObject, handler);

 
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

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);
})();

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<strong>${values[i]}</strong>` : '';
    return result + string + value;
  }, '');
}

const name = 'World';
const message = highlight`Hello, ${name}!`;
print(message);

 
function* fibonacci(n) {
  let a = 0, b = 1, i = 0;
  while (i < n) {
    yield a;
    [a, b] = [b, a + b];
    i++;
  }
}

const fibSequence = fibonacci(5);
for (const num of fibSequence) {
  print('Fibonacci:', num);
}
