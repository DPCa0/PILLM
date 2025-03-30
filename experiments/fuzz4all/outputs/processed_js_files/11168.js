 
async function* primeGenerator() {
  let num = 2;
  const isPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };
  while (true) {
    if (isPrime(num)) yield num;
    num++;
    await new Promise(resolve => setTimeout(resolve, 10));  
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
const operations = new Map();
operations.set('double', x => x * 2);
operations.set('square', x => x ** 2);

 
const performOperation = ({ operation, number }, ...extraArgs) => {
  if (operations.has(operation)) {
    print(operations.get(operation)(number), ...extraArgs);
  } else {
    print('Invalid operation');
  }
};

 
(async () => {
  const primeIter = primeGenerator();
  print(`First prime: ${(await primeIter.next()).value}`);
  
  performOperation({ operation: 'double', number: 4 }, 'Extra', 'Args');
  
  user.name;  
  
  for (let i = 0; i < 3; i++) {
    print(`Prime ${i+2}: ${(await primeIter.next()).value}`);
  }
})();
