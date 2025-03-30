 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
      if (url === 'https://api.example.com/data') {
        resolve({ id: 1, name: 'Example Data' });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

 
async function getData(url) {
  try {
    const data = await fetchData(url);
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* sequenceGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const targetObject = {
  message: 'Hello, Proxy!'
};

const handler = {
  get(target, property) {
    print(`Property "${property}" has been accessed.`);
    return target[property];
  },
  set(target, property, value) {
    print(`Property "${property}" is being set to "${value}".`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
(async () => {
   
  await getData('https://api.example.com/data');

   
  const seq = sequenceGenerator(1, 5);
  for (const num of seq) {
    print('Generated number:', num);
  }

   
  print(proxy.message);
  proxy.message = 'Hello, advanced JavaScript!';
  print(proxy.message);
})();
