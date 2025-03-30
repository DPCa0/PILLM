 
const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

 
class Counter {
  #count = 0;  

  increment() {
    this.#count++;
    return this;
  }

  decrement() {
    this.#count--;
    return this;
  }

  getCount() {
    return this.#count;
  }
}

 
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

(async function execute() {
  const counter = new Counter();

  print("Initial count:", counter.getCount());

   
  counter.increment().increment().decrement();

  print("Count after operations:", counter.getCount());

   
  const result = sum(1, 2, 3, 4, 5);
  print("Sum:", result);

   
  print("Generating numbers:");
  for await (const num of asyncNumberGenerator()) {
    print(num);
  }

   
  const target = { a: 1, b: 2 };
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property "${prop}" with value ${obj[prop]}`);
      return obj[prop];
    }
  };

  const proxy = new Proxy(target, handler);
  print("Proxy access:", proxy.a, proxy.b);
})();
