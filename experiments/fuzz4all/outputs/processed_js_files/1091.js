 
const calculate = (op, ...numbers) => numbers.reduce((acc, num) => op(acc, num));

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Operation: ${target.name}, Numbers: ${argumentsList.join(', ')}`);
    return target(...argumentsList);
  }
};

 
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

 
const loggedAdd = new Proxy(add, handler);
const loggedMultiply = new Proxy(multiply, handler);

 
const asyncOperation = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(calculate(loggedAdd, 1, 2, 3, 4)), 1000);
  });
  
  const sum = await promise;
  print(`Sum: ${sum}`);

  const product = calculate(loggedMultiply, 1, 2, 3, 4);
  print(`Product: ${product}`);
};

 
Promise.all([asyncOperation(), asyncOperation()]).then(() => {
  print('All operations completed');
});
