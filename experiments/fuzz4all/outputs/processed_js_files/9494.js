 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* fibonacciSequence() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
(async () => {
   
  const [fib1, fib2, fib3] = fibonacciSequence();
  print(`First 3 Fibonacci numbers: ${fib1}, ${fib2}, ${fib3}`);

   
  const data = await fetchData('https://api.github.com');
  print('API Data:', data);

   
  print(user.name);  
  user.age = 31;           
  print(user.age);

   
  print(`User: ${user.name}, Age: ${user.age}`);
})();
