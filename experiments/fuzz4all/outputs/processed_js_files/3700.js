 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    if (typeof value === 'number') {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(...arguments);
    } else {
      throw new CustomError('Only numbers are allowed');
    }
  }
};

const target = { x: 10 };
const proxy = new Proxy(target, handler);

 
try {
  proxy.x = 20;  
  print(proxy.x);  
  proxy.y = 'Hello';  
} catch (e) {
  if (e instanceof CustomError) {
    console.error(e.message);  
  }
}

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Fetched Data!'), 1000);
  });
}

(async function() {
  print('Fetching data...');
  const data = await fetchData();
  print(data);  
})();

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibGen = fibonacciGenerator(10);
for (let num of fibGen) {
  print(num);  
}
