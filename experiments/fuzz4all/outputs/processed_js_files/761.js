 
const fibonacci = (n, [a, b] = [0, 1]) =>
  n <= 0 ? a : fibonacci(n - 1, [b, a + b]);

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}' with value: ${target[prop]}`);
      return target[prop];
    }
    throw new ReferenceError(`Property '${prop}' not found.`);
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to value: ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const config = new Proxy(
  {
    server: { host: 'localhost', port: 8080 },
    database: { name: 'testDB', user: 'admin' },
  },
  handler
);

 
function sql(strings, ...keys) {
  return strings.reduce((result, str, i) => result + str + (keys[i] || ''), '');
}

const host = config.server.host;
const dbName = config.database.name;
const query = sql`SELECT * FROM ${dbName} WHERE host='${host}'`;

print(query);  

 
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

for (const [key, value] of map.entries()) {
  print(`Key: ${key}, Value: ${value}`);
}

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getData();

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = numberGenerator();
console.log