class FibonacciGenerator {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }
  
  *generate(n) {
    let a = 0, b = 1, i = 0;
    while (i <= n) {
      yield a;
      [a, b] = [b, this.memo.get(i) || (a + b)];
      this.memo.set(i, a);
      i++;
    }
  }
}

async function fetchFibonacciSum(n) {
  const generator = new FibonacciGenerator().generate(n);
  let sum = 0;
  for await (let num of generator) {
    sum += num;
  }
  return sum;
}

const n = 10;
fetchFibonacciSum(n).then(sum => print(`Sum of first ${n} Fibonacci numbers: ${sum}`));

const double = n => n * 2;
const square = n => n * n;

const compose = (...funcs) => x => funcs.reduceRight((value, func) => func(value), x);

const doubleThenSquare = compose(square, double);
print(doubleThenSquare(5));  

 
const user = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(target, prop) {
    if (prop === 'age') {
      return `${Reflect.get(target, prop)} years old`;
    }
    return Reflect.get(target, prop);
  }
};

const proxiedUser = new Proxy(user, handler);
print(proxiedUser.name);  
print(proxiedUser.age);  
