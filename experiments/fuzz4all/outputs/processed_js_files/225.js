 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
function* fibonacciGenerator(limit) {
  let a = 0, b = 1, count = 0;
  while (count < limit) {
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

 
const targetObject = { name: "CodeMaster", level: 42 };
const handler = {
  get: (obj, prop) => {
    print(`Property ${prop} accessed, value: ${obj[prop]}`);
    return obj[prop];
  }
};
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  try {
    const fibonacciSequence = [...fibonacciGenerator(10)];
    print("Fibonacci Sequence:", fibonacciSequence);

    print("Accessing proxy object properties:");
    print(proxy.name);
    print(proxy.level);

    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print("Fetched data:", data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
