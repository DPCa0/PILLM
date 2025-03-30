 

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibProxy = new Proxy(fibonacciGenerator(), {
  get(target, prop, receiver) {
    if (prop === 'next') {
      print(`Accessing Fibonacci number`);
    }
    return Reflect.get(target, prop, receiver);
  }
});

 
async function getFibonacciNumbers(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    result.push(fibProxy.next().value);
  }
  return result;
}

 
async function main() {
  try {
    print("Fetching Fibonacci numbers...");
    const fibNumbers = await getFibonacciNumbers(10);
    print("Fibonacci numbers:", fibNumbers);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
