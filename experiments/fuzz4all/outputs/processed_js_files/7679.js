 

 
async function* fetchDataInChunks(url) {
  const chunks = [1, 2, 3];  
  for (let chunk of chunks) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield fetch(`${url}?chunk=${chunk}`).then(response => response.json());
  }
}

 
const dataHandler = {
  get: function(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(...arguments);
  }
};

(async function() {
  try {
    const url = 'https://api.example.com/data';
    let aggregatedData = [];
    
     
    for await (const dataChunk of fetchDataInChunks(url)) {
      print('Chunk received:', dataChunk);
      aggregatedData = aggregatedData.concat(dataChunk);
    }

     
    const proxiedData = new Proxy(aggregatedData, dataHandler);

     
    print('First item in aggregated data:', proxiedData[0]);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
