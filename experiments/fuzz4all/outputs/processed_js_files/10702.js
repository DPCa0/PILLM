 
function multiply(factor, ...args) {
  return args.map(n => n * factor);
}

 
function* fibonacci(limit) {
  let a = 0, b = 1, temp;
  while (limit--) {
    yield a;
    temp = a;
    a = b;
    b = temp + b;
  }
}

 
async function fetchFibonacci(limit) {
  const fib = [];
  const gen = fibonacci(limit);
  for (let i = 0; i < limit; i++) {
    const result = await new Promise(resolve => setTimeout(() => resolve(gen.next().value), 100));
    fib.push(result);
  }
  return fib;
}

 
(async () => {
  print("Fetching Fibonacci numbers...");
  const fibNumbers = await fetchFibonacci(10);
  print("Fibonacci numbers:", fibNumbers);

  print("Doubled Fibonacci numbers:", multiply(2, ...fibNumbers));
})();

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return property in target ? target[property] : 42;
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.a = 10;
print(obj.a);
print(obj.b);

 
class MathUtil {
  static cube(x) {
    return x ** 3;
  }
}

print("Cubed value:", MathUtil.cube(3));
