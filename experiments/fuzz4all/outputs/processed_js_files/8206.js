 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
  });
}

 
async function processData() {
  const { data } = await fetchData();
  return data.map(num => num * 2);
}

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
(async () => {
  const processedData = await processData();
  const proxy = new Proxy(processedData, handler);

   
  print(`Processed Data: ${[...proxy].join(', ')}`);
})();
