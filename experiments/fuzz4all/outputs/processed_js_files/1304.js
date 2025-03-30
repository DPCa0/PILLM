 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const obj = new Proxy({ greeting: "Hello, world!" }, handler);

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    print("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
fetchData("https://jsonplaceholder.typicode.com/todos/1");

 
const fib = fibonacci();

 
print(obj.greeting);
obj.greeting = "Hi, universe!";

 
for (let i = 0; i < 5; i++) {
  print(`Fibonacci number ${i + 1}: ${fib.next().value}`);
}

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting() {
  await delay(2000);
  print("This message is delayed by 2 seconds!");
}

delayedGreeting();
