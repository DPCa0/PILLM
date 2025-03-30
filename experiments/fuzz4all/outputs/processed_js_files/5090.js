class Shape {
  constructor(name) {
    this.name = name;
  }
  display() {
    print(`Shape: ${this.name}`);
  }
}

function *fibonacciGen(limit) {
  let a = 0, b = 1, count = 0;
  while(count < limit) {
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

const asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function() {
  const circle = new Shape('Circle');
  circle.display();

  print('Fibonacci Sequence:');
  for (const num of fibonacciGen(10)) {
    print(num);
    await asyncTimeout(500);
  }
})();

const uniqueSymbol = Symbol('unique');

const obj = {
  [uniqueSymbol]: 'secret',
  normalProperty: 'accessible'
};

print('Accessing Symbol Property:');
print(obj[uniqueSymbol]);
print(obj.normalProperty);

const complexOperation = async (input, transformer = x => x * 2) => {
  await asyncTimeout(1000);
  return transformer(input);
};

(async function() {
  const result = await complexOperation(10, x => x ** 3);
  print('Complex Operation Result:', result);
})();
