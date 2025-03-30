 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return property in target ? target[property] : new CustomError('Property does not exist');
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const original = { name: 'JavaScript', level: 'Advanced' };
const proxy = new Proxy(original, handler);

 
function* generatorFunction() {
  yield 'Hello';
  yield 'world';
  yield '!';
}

 
const asyncFunction = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return data.json();
};

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
const mappedValues = new Map();
uniqueValues.forEach(value => mappedValues.set(value, value * 2));

 
function tag(strings, ...values) {
  print(strings);
  print(values);
  return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
}

const taggedMessage = tag`Numbers: ${[...uniqueValues]}`;

 
const { name, level } = proxy;
const [first, ...rest] = [...generatorFunction()];
const newArr = [...uniqueValues, ...rest];

 
proxy.name;
proxy.missingProp;
proxy.level = 'Expert';

(async () => {
  try {
    print(await asyncFunction());
  } catch (error) {
    console.error(error);
  }
})();

print(mappedValues);
print(taggedMessage);
print(name, level, first, rest, newArr);
