 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');

  const data = await response.json();
  
   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist`);
      }
    }
  };
  
  const proxiedData = new Proxy(data, handler);
  
   
  const processedData = proxiedData.items?.map(item => item.value) ?? [];
  
   
  return [...new Set(processedData)];
}

 
(async () => {
  try {
     
    const url = `https: 
    
    const uniqueValues = await fetchData(url);
    print('Unique values:', uniqueValues);
    
     
    const [firstValue, ...restValues] = uniqueValues;
    print('First value:', firstValue);
    print('Rest of the values:', restValues);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
