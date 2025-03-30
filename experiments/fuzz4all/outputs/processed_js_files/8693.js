 
import { readFileSync } from 'fs';

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const targetObject = {
  message: 'Hello, world!',
  date: new Date()
};

const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}...`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}...`);
    return Reflect.set(...arguments);
  }
};

const proxiedObject = new Proxy(targetObject, handler);

print(proxiedObject.message);
proxiedObject.message = 'Hello, universe!';

 
const { message, ...rest } = { ...proxiedObject, additional: 'Extra data' };
print(message, rest);

 
(async ({ data1, data2 }) => {
  print('Inside IIFE:', data1, data2);
})({ data1: 'Sample1', data2: 'Sample2' });

 
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);

const set = new Set(['a', 'b', 'c']);
const [first, ...restItems] = Array.from(set);
print(first, restItems);

 
class Base {
  static description() {
    return 'I am a Base class';
  }
}

class Derived extends Base {
  static description() {
    return `I am a Derived class, inheriting from: ${super.description()}`;
  }
}

print(Derived.description());

 
const data = readFileSync('example.txt', 'utf-8');
print(data);
