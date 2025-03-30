 
import fs from 'fs';
import https from 'https';

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

 
const userHandler = {
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[key] = value;
    return true;
  }
};

const user = new Proxy({}, userHandler);

try {
  user.name = 'John Doe';
  user.age = 30;  
  user.age = 'thirty';  
} catch (error) {
  console.error(error.message);
}

 
const apiURLs = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

Promise.allSettled(apiURLs.map(url => fetchData(url)))
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        print('Fetched data:', result.value);
      } else {
        console.error('Error fetching data:', result.reason);
      }
    });
  });

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

for (let num of fibonacciGenerator(10)) {
  print(num);
}

 
const trackedObjects = new WeakSet();

class TrackedObject {
  constructor(name) {
    this.name = name;
    trackedObjects.add(this);
  }
}

const obj1 = new TrackedObject('Object 1');
print(trackedObjects.has(obj1));  

 
fs.promises.writeFile('output.json', JSON.stringify({ data: 'Sample Data' }))
  .then(() => console.log('Data written