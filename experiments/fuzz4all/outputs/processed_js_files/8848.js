 

 
export function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
import { range, fetchData } from './utility.js';

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Getting property ${prop}`);
      return obj[prop];
    }
    return `Property ${prop} not found`;
  }
};

const proxiedObj = new Proxy({a: 1, b: 2}, handler);

async function processData() {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Data fetched:', data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
  
  for (let num of range(0, 5)) {
    print(num);
  }

  print(proxiedObj.a);   
  print(proxiedObj.c);   
}

processData();
