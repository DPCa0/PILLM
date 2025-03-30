 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property "${property}": ${target[property]}`);
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist on target object.`);
      return undefined;
    }
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function* fibonacci(n) {
  let a = 0, b = 1, current = 0;
  for (let i = 0; i < n; i++) {
    yield current;
    [a, b] = [b, a + b];
    current = a;
  }
}

 
function sumAndMultiply(...nums) {
  const [first, second, ...rest] = nums;
  const sum = rest.reduce((acc, val) => acc + val, 0);
  return {
    sum: first + second + sum,
    multiply: first * second * sum
  };
}

 
(async () => {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);

     
    print(person.name);   
    person.age = 31;            
    print(person.age);    
    print(person.height);  

     
    const fibSequence = fibonacci(10);
    print([...fibSequence]);

     