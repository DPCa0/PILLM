const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const asyncOperation = async (value) => new Promise((resolve) => 
  setTimeout(() => resolve(value + 10), 1000));

const promiseHandler = async (value) => {
  try {
    const result = await asyncOperation(value);
    print(`Result after async operation: ${result}`);
    return result;
  } catch (error) {
    console.error('Error in async operation', error);
  }
};

const multiply = factor => value => value * factor;
const add = increment => value => value + increment;
const logValue = value => (print(`Current value: ${value}`), value);

const complexFunction = compose(
  promiseHandler,
  logValue,
  multiply(2),
  add(5),
);

complexFunction(10).then(result => print(`Final result: ${result}`));
