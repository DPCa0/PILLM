 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property '${property}': ${target[property]}`);
      return target[property];
    } else {
      console.error(`Property '${property}' does not exist.`);
    }
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({}, handler);

 
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 

 
user.name = "Alice";
print(user.name);
print(user.age);   

 
const fib = fibonacci();
print(fib.next().value);   
print(fib.next().value);   
print(fib.next().value);   

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
