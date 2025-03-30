 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: function (target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(...arguments);
    }
    return `Property ${prop} doesn't exist!`;
  }
};

const proxy = new Proxy({ message: 'Hello, Proxy!' }, handler);

// An asynchronous function using async/await to fetch data
async function fetchData() {
  try {
    const response = await fetch('https: 
    const data = await response.json();
    return data.slice(0, 5);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
   
  print(proxy.message);
  print(proxy.nonExistentProp);

   
  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  
  print(gen.next().value);  

   
  const data = await fetchData();
  console.table(data);
})();
