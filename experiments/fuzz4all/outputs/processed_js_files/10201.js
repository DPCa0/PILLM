 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

 
const user = {
  name: 'Alice',
  age: 25
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    print(`Property "${prop}" has been accessed`);
    return target[prop];
  }
});

 
function greetUser({ name, age }) {
  print(`Hello, ${name}! You are ${age} years old.`);
}

 
async function performTasks() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const tasks = urls.map(url => fetchData(url));
  const results = await Promise.allSettled(tasks);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Task ${index + 1} succeeded with data:`, result.value);
    } else {
      console.warn(`Task ${index + 1} failed with reason:`, result.reason);
    }
  });
}

 
print(double(5));  
print(triple(5));  
print(userProxy.name);  

greetUser(user);

performTasks();
