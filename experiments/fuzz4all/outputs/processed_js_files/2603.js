 
async function* fetchWithDelay(urls) {
  for (const url of urls) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield fetch(url).then(response => response.json());
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return prop in obj ? obj[prop] : 42;  
  },
  set: () => {
    console.error('Overwriting is not allowed.');
    return false;
  }
};

 
const myObject = new Proxy({ a: 1, b: 2 }, handler);

 
function highlight(strings, ...values) {
  return strings.reduce((prev, current, i) => 
    `${prev}${current}<strong>${values[i] || ''}</strong>`, ''
  );
}

const user = 'Alice';
print(highlight`Hello, ${user}! Welcome to the ${'future'}.`);

 
(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
  for await (const data of fetchWithDelay(urls)) {
    print('Fetched data:', data);
  }
})();

 
print('Value of a:', myObject.a);
myObject.a = 10;
print('Value of c (default):', myObject.c);
