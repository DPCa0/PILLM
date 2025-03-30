Certainly! Below is a complex JavaScript program utilizing advanced features such as Promises, async/await, generators, and destructuring:

 

 
const fetchData = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `data_for_${id}` });
    }, 1000);
  });

 
function* dataGenerator(ids) {
  for (const id of ids) {
    yield fetchData(id);
  }
}

 
async function processData(ids) {
  const gen = dataGenerator(ids);
  let result = gen.next();

  while (!result.done) {
    const { id, data } = await result.value;
    print(`Processed data for ID: ${id}, Data: ${data}`);
    result = gen.next();
  }
}

 
(async function main() {
  const ids = [1, 2, 3, 4, 5];  
  await processData(ids);
})();

This program simulates an asynchronous sequence where data is fetched for a list of IDs using a generator function, and it processes the data using an `async` function with `await`.