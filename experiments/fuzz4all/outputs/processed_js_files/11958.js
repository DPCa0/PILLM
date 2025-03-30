 
const handler = {
  get(target, prop, receiver) {
    print(`GET ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`SET ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const target = {};
const proxy = new Proxy(target, handler);

proxy.a = 10;  
print(proxy.a);  

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str.toUpperCase() + (values[i] || ''), '');
}

const name = 'world';
print(tag`Hello, ${name}!`);

 
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const numbers = range(1, 5);
for (const num of numbers) {
  print(num);
}
