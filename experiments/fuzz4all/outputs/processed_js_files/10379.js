 
const handler = {
  get(target, prop) {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const targetObject = { a: 10, b: 20 };
const proxy = new Proxy(targetObject, handler);

 
proxy.a;   
proxy.b = 30;   

 
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    [a, b] = [b, a + b];
    yield a;
  }
}

 
const fibSeq = fibonacci();
print(fibSeq.next().value);  
print(fibSeq.next().value);  
print(fibSeq.next().value);  

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const createAsyncFunction = async (url) => {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
createAsyncFunction('https://jsonplaceholder.typicode.com/todos/1');

 
const userDetails = ({ name, age = 30 }) => {
  print(`Name: ${name}, Age: ${age}`);
};

 
userDetails({ name: 'Alice' });  

 
const logNumbers = (...numbers) => {
  print(...numbers);
};

 
logNumbers(1, 2, 3, 4, 5);  
