 
const fetchData = async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(500);
  return { data: [1, 2, 3, 4, 5] };
};

 
function* dataGenerator(dataArray, chunkSize) {
  for (let i = 0; i < dataArray.length; i += chunkSize) {
    yield dataArray.slice(i, i + chunkSize);
  }
}

 
const processData = async () => {
  try {
    const response = await fetchData();
    const { data } = response;
    
     
    const gen = dataGenerator(data, 2);
    
     
    const results = await Promise.all(Array.from(gen, async chunk => {
       
      const processedChunk = chunk.map(num => num * 2);
      await new Promise(res => setTimeout(res, 100));  
      print(`Processed chunk: ${processedChunk}`);
      return processedChunk;
    }));
    
    print('Final processed data:', results.flat());
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
processData();
