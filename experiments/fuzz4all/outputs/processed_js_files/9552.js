 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof prop === 'string' && !isNaN(prop)) {
       
      return [...Array(Number(prop))].map(() => target.generator.next().value);
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
async function fetchDataAndProcess(url, processFunc) {
  const response = await fetch(url);
  const data = await response.json();
  return processFunc(data);
}

 
const proxyObj = new Proxy({ generator: numberGenerator() }, handler);

 
(async () => {
  print("Generated numbers:", proxyObj[5]);  

  try {
    const processedData = await fetchDataAndProcess('https://jsonplaceholder.typicode.com/todos/1', (data) => {
      return { title: data.title.toUpperCase(), completed: data.completed };
    });
    print("Processed Data:", processedData);  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
