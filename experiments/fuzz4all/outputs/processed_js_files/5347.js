 

 
async function fetchDataFromApis() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  try {
     
    const results = await Promise.allSettled(
      urls.map(url => fetch(url).then(res => res.json()))
    );

     
    const data = results.reduce((acc, result, index) => {
      if (result.status === 'fulfilled') {
        acc[`post${index + 1}`] = result.value;
      } else {
        acc[`post${index + 1}`] = { error: 'Failed to fetch' };
      }
      return acc;
    }, {});

    print(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const dataHandler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  }
};

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

(async () => {
  await fetchDataFromApis();

  const proxyData = new Proxy({ a: 1, b: 2, c: 3 }, dataHandler);
  print(proxyData.a);
  print(proxyData.b);
  print(proxyData.nonExistent);

  const fib = fibonacciGenerator();
  print(fib.next().value);  
  print(fib.next().value);  
  print(fib.next().value);  
  print(fib.next().value);  
  print(fib.next().value);  
})();
