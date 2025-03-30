 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ id: 1, value: 'Hello, World!' }), 1000);
});

 
function* promiseGenerator() {
  yield fetchData();
  yield fetchData();
}

 
async function consumeGenerator(generator) {
  const results = [];
  for (const promise of generator()) {
    results.push(await promise);
  }
  return results;
}

 
async function processData() {
  const dataMap = new Map();
  const results = await consumeGenerator(promiseGenerator);

  for (const { id, value } of results) {
    dataMap.set(id, value.toUpperCase());
  }

   
  for (const [id, value] of dataMap) {
    print(`ID: ${id}, Value: ${value}`);
  }
}

processData();
