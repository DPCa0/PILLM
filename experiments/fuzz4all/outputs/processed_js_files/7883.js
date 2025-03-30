 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { name: 'Alice', age: 30 }, score: 42 } });
    }, 1000);
  });
};

 
const processData = async () => {
  const { data: { user: { name, age }, score } } = await fetchData();
  return { name, age, score };
};

 
const dataHandler = {
  get: (target, prop) => {
    if (prop === 'score') {
      return target[prop] * 2;  
    }
    return target[prop];
  }
};

 
(async () => {
  const data = await processData();
  const proxiedData = new Proxy(data, dataHandler);
  
  print(`User: ${proxiedData.name}, Age: ${proxiedData.age}, Score: ${proxiedData.score}`);
})();
