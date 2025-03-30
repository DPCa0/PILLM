 

 
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, data: `Data for ID: ${id}` });
      } else {
        reject('Invalid ID');
      }
    }, 1000);
  });
}

 
function* dataGenerator(ids) {
  for (const id of ids) {
    yield fetchData(id);
  }
}

 
async function processData(ids) {
  const gen = dataGenerator(ids);
  const results = [];
  
  for (const promise of gen) {
    try {
       
      const { id, data } = await promise;
      print(`Processed ${data}`);
      results.push({ id, data });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
  return results;
}

 
processData([1, 2, -1, 3])
  .then(results => console.log('Final Results:', results))
  .catch(err => console.error('Error in processing:', err));
