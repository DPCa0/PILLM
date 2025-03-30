 
const fetchGreeting = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(`Greeting: ${data.greeting}`);
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  }
};

const obj = new Proxy({ message: 'Hello, world!' }, handler);
print(obj.message);  

 
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
const fibSequence = [...fibonacci(10)];
print('Fibonacci Sequence:', fibSequence);

 
fetchGreeting('https://api.example.com/greet');

 
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = Array.from(new Set(numbers));
print('Unique numbers:', uniqueNumbers);
