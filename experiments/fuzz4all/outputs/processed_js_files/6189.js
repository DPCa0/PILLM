 

 
async function fetchData(url) {
  return await fetch(url).then(response => response.json());
}

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield item;
  }
}

 
class DataProcessor {
  static processData(data) {
    const processedData = [];
    for (const item of data) {
      const { id, value } = item;  
      processedData.push({ id, value: value * 2 });
    }
    return processedData;
  }
}

 
function logData(...dataObjects) {
  dataObjects.forEach(obj => print(obj));
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);
    
    const generator = dataGenerator(data);
    const dataBatch = [];
    let result = generator.next();
    
    while (!result.done) {
      dataBatch.push(result.value);
      result = generator.next();
    }
    
    const processedData = DataProcessor.processData(dataBatch.slice(0, 5));  
    logData(...processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
