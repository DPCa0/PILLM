 

 
 
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

 
export const doubleArray = arr => arr.map(x => x * 2);
export const filterOdds = arr => arr.filter(x => x % 2 === 0);

 
import { add, subtract } from './mathOperations.js';
import { doubleArray, filterOdds } from './arrayHelpers.js';

 
const fetchData = async () => {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    print('Fetched Data:', data.slice(0, 3));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...rest] = numbers;
print('First:', one, 'Second:', two, 'Rest:', rest);

const obj1 = { name: 'Alice', age: 25 };
const obj2 = { job: 'Engineer', country: 'Wonderland' };
const combinedObject = { ...obj1, ...obj2 };
print('Combined Object:', combinedObject);

 
const greet = (name) => `Hello, ${name}! Welcome to advanced JavaScript features.`;
print(greet('Alice'));

 
const uniqueNumbers = new Set([1, 2, 3, 1, 2]);
print('Unique Numbers:', [...uniqueNumbers]);

const mapExample = new Map();
mapExample.set('key1', 'value1');
mapExample.set('key2', 'value2');
print('Map Example:', mapExample.get('key1'));

 
const squaredNumbers = numbers.map(num => num * num);
print('Squared Numbers:', squaredNumbers);

const sum = numbers.reduce((total, num) => total + num, 0);
print('Sum of Numbers:', sum);

 
fetchData();
