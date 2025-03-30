 
function* fibonacciGenerator(max) {
  let [prev, curr] = [0, 1];
  while (curr <= max) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

async function* dataStream(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
   
  for await (const data of dataStream(urls)) {
    print('Fetched data:', data);
  }

   
  const fibGen = fibonacciGenerator(100);
  for (const num of fibGen) {
    print('Fibonacci:', num);
  }
  
   
  const target = { message: "Hello, Proxy!" };
  const handler = {
    get: (obj, prop) => {
      if (prop === 'message') {
        return `${obj[prop]} - intercepted`;
      }
      return obj[prop];
    }
  };
  
  const proxy = new Proxy(target, handler);
  print(proxy.message);  

   
  const uniqueSym = Symbol('uniqueProp');
  const symObj = {
    [uniqueSym]: "This is a unique property",
    normalProp: "This is a normal property"
  };

  print(symObj[uniqueSym]);  
  print(symObj.normalProp);  
})();
