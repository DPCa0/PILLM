 
import { randomBytes } from 'crypto';

 
const simulateNetworkRequest = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 500;  
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(`Fetched data from ${url}`);
      } else {
        reject(new Error(`Failed to fetch data from ${url}`));
      }
    }, delay);
  });
};

 
const fetchData = async (url) => {
  try {
    print(`Starting request to ${url}`);
    const response = await simulateNetworkRequest(url);
    print(response);
  } catch (error) {
    console.error(error);
  }
};

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
const fetchPromises = urls.map((url) => fetchData(url));

 
Promise.allSettled(fetchPromises)
  .then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        print('Success:', result.value);
      } else {
        print('Error:', result.reason);
      }
    });
    print('All requests completed');
  })
  .catch((error) => {
    console.error('Error in Promise.allSettled:', error);
  });

 
function* randomByteGenerator() {
  while (true) {
    yield randomBytes(1).toString('hex');
  }
}

 
const byteGenerator = randomByteGenerator();

 
print('Random bytes:');
for (let i = 0; i < 5; i++) {
  print(byteGenerator.next().value);
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return `Property ${prop} has