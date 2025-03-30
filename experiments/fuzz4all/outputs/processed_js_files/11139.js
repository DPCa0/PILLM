 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
}

 
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : `Property "${prop}" not found`;
  }
};

const dynamicObject = new Proxy({}, handler);

 
class Fibonacci {
  constructor() {
    this[Symbol.iterator] = this.generatorFunction();
  }
  
  *generatorFunction() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  try {
    const results = await Promise.all(urls.map(url => fetchData(url)));
    const [{data: data1}, {data: data2}] = results;
    
     
    dynamicObject.data1 = data1;
    dynamicObject.data2 = data2;
    
    print(dynamicObject.data1);  
    print(dynamicObject.nonExistent);  

     
    const fib = new Fibonacci();
    print([...fib].slice(0, 10));  
  } catch (error) {
    console.error(error);
  }
})();
