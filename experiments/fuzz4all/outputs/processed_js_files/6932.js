 

 
function* fetchUserData() {
  yield { id: 1, name: 'Alice' };
  yield { id: 2, name: 'Bob' };
  yield { id: 3, name: 'Charlie' };
}

 
async function processData(generator) {
  let results = [];
  for (let userData of generator) {
    let result = await new Promise((resolve) => {
      setTimeout(() => resolve({ ...userData, processed: true }), 1000);
    });
    results.push(result);
  }
  return results;
}

 
const resultsHandler = {
  get: function(target, prop) {
    print(`Accessed property: ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} does not exist`;
  }
};

 
(async () => {
  const userDataGenerator = fetchUserData();
  const rawResults = await processData(userDataGenerator);

   
  const results = new Proxy(rawResults, resultsHandler);

   
  print(results[0]);
  print(results[2]);
  print(results[5]);  
})();
