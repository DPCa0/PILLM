 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
}

 
const defaultUser = {
  name: 'Anonymous',
  age: 0,
  location: 'Unknown'
};

const userHandler = {
  get(target, property) {
    return property in target ? target[property] : defaultUser[property];
  }
};

 
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}

 
const compose = (f, g) => (...args) => f(g(...args));

const double = x => x * 2;
const increment = x => x + 1;

const doubleThenIncrement = compose(increment, double);

 
function log(strings, ...values) {
  print(strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, ''));
}

 
(async () => {
  const user = new Proxy({ name: 'John Doe' }, userHandler);
  const idGen = idGenerator();
  
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    log`Fetched data: ${JSON.stringify(data)}`;
  } catch (error) {
    log`Error: ${error.message}`;
  }
  
  print('User Name:', user.name);  
  print('User Location:', user.location);  
  print('Next ID:', idGen.next().value);  
  print('Next ID:', idGen.next().value);  
  print('Double then Increment (5):', doubleThenIncrement(5));  
})();
