 
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* fibonacciGenerator(limit, delay) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    await wait(delay);
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
(async () => {
  const fibGen = fibonacciGenerator(10, 500);
  for await (const number of fibGen) {
    const [d1, d2, d3] = number.toString().padStart(3, '0').split('').map(Number);
    print(`Fibonacci number: ${number}, Digits: ${d1}, ${d2}, ${d3}`);
  }
})();

 
const logger = {
  get(target, property) {
    if (property in target) {
      print(`Accessing ${property}: ${target[property]}`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist`);
    }
  },
};

const user = new Proxy({ name: 'Alice', age: 30 }, logger);

print(user.name);  
print(user.age);   
print(user.gender);  
