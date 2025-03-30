 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return Reflect.get(target, prop);
    }
    console.warn(`Property ${prop} does not exist.`);
    return undefined;
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const printUserInfo = ({ name, age }) => {
  print(`User Info - Name: ${name}, Age: ${age}`);
};

 
async function main() {
   
  user.name = 'Bob';
  print(user.name);
  
   
  await fetchData();
  
   
  printUserInfo(user);
  
   
  const [result1, result2] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/3').then(res => res.json())
  ]);
  
  print('Concurrent fetch results:', result1, result2);
}

main();
