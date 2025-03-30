 
function* fibonacciGenerator(max) {
  let a = 0, b = 1;
  while (a <= max) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
async function factorialAsync(n) {
  if (n < 0) return Promise.reject("Negative input");
  if (n === 0) return 1;
  return n * await factorialAsync(n - 1);
}

 
(async () => {
  const maxFibonacci = 50;
  const fibSet = new Set([...fibonacciGenerator(maxFibonacci)]);
  print("Fibonacci Set:", fibSet);

  const factorialNumber = 5;
  try {
    const factorialResult = await factorialAsync(factorialNumber);
    print(`Factorial of ${factorialNumber}:`, factorialResult);
  } catch (error) {
    console.error("Error in factorial calculation:", error);
  }
})();

 
const handler = {
  get: function(target, prop, receiver) {
    const origMethod = target[prop];
    return function(...args) {
      print(`Called method: ${prop} with arguments:`, args);
      return origMethod.apply(this, args);
    };
  }
};

const mathOperations = {
  add: (x, y) => x + y,
  multiply: (x, y) => x * y
};

const proxiedMath = new Proxy(mathOperations, handler);

print("Addition Result:", proxiedMath.add(2, 3));
print("Multiplication Result:", proxiedMath.multiply(4, 5));

 
const user = { firstName: "John", lastName: "Doe", age: 30 };
const { firstName: name = "Anonymous", age = 18 } = user;
print(`User: ${name}, Age: ${age}`);
