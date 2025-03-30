 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: 'Hello, World!' }), 1000);
});

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed.`);
    return target[property];
  }
};

 
function* numberGenerator(start = 0) {
  let num = start;
  while (true) {
    yield num++;
  }
}

 
(async () => {
   
  const dataPromise = fetchData();
  
   
  const proxyObj = new Proxy(await dataPromise, handler);

   
  print(proxyObj.data);

   
  const numGen = numberGenerator();
  print(`Next number: ${numGen.next().value}`);
  print(`Next number: ${numGen.next().value}`);
})();
