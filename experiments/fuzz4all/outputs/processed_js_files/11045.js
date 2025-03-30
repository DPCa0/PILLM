 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: 'Sample Data' });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: (target, property) => {
    return property in target ? target[property] : 'Property does not exist';
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const originalObject = { a: 1, b: 2 };
const proxyObject = new Proxy(originalObject, handler);

 
(async () => {
  try {
    print('Fetching Data...');
    const response = await fetchData('https://api.example.com/data');
    print('Received:', response.data);

    const numbers = numberGenerator();
    print('Generated Numbers:', numbers.next().value, numbers.next().value, numbers.next().value);

    proxyObject.c = 3;  
    print('Proxy object:', proxyObject.a, proxyObject.b, proxyObject.c, proxyObject.d);
  } catch (error) {
    console.error(error);
  }
})();
