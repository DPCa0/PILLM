 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Some fetched data' }), 1000);
  });
};

 
function* messageGenerator(data) {
  yield `Received Data: ${data}`;
  yield 'Processing Data...';
  yield 'Data processed successfully!';
}

 
const dataHandler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
};

 
(async () => {
   
  const result = await fetchData();

   
  const proxyData = new Proxy(result, dataHandler);

   
  print(`Fetched Data: ${proxyData.data}`);

   
  const generator = messageGenerator(proxyData.data);

   
  for (let message of generator) {
    print(message);
  }
})();
