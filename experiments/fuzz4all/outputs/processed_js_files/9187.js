 
function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property "${prop}" doesn't exist.`);
      return null;
    }
  }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

// Utilize Promises with async/await and ES6 Modules (Assumed this code is in a module file)
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

// Using Symbol for unique property keys
const uniqueKey = Symbol('unique');
const obj = {
  [uniqueKey]: 'This is a unique value'
};

// Main function to utilize above features
(async function main() {
  // Generator example
  print('Using generator:');
  for (const num of range(1, 5)) {
    print(num);
  }

  // Proxy example
  print('Using Proxy:');
  print(proxy.a); // 1
  print(proxy.c); // Property "c" doesn't exist. -> null

   
  try {
    print('Fetching data:');
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(data);
  } catch (error) {
    console.error('Error in fetching data:', error);
  }

   
  print('Using Symbol:');
  print(obj[uniqueKey]);  
})();
