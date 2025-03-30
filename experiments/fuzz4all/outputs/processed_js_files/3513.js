 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: `Data from ${url}` };
      Math.random() > 0.5 ? resolve(data) : reject('Fetch error');
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    print(`Property accessed: ${prop}`);
    return prop in target ? target[prop] : 'Property not found';
  }
};

const user = new Proxy({ name: 'John', age: 30 }, handler);

 
(function() {
  print(greet`Hello, ${user.name}. You are ${user.age} years old.`);
})();

function greet(strings, ...values) {
  return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
}

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4]);
const userMap = new Map();
userMap.set('name', 'John Doe');
userMap.set('role', 'Developer');

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    print(`Fetched: ${data.message}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  print('Unique Numbers:', [...uniqueNumbers]);
  print('User Map:', userMap);
})();
