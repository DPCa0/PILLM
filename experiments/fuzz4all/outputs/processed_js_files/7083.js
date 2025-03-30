 

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const processData = async (url) => {
  try {
    const rawData = await fetchData(url);
    
     
    const { results } = rawData;
    
     
    const uniqueEntries = new Set(results.map(item => item.name));

     
    const dataMap = new Map();
    uniqueEntries.forEach(name => {
      const entry = results.find(item => item.name === name);
      if (entry) {
        dataMap.set(name, { id: entry.id, details: entry.details });
      }
    });

     
    const processedDataPromises = Array.from(dataMap.values()).map(async ({ id, details }) => {
       
      const additionalInfo = await new Promise(resolve => setTimeout(() => resolve(`Extra info for ${id}`), 500));
      return { id, details, additionalInfo };
    });

     
    const processedData = await Promise.all(processedDataPromises);

     
    print('Processed Data:', processedData);
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData('https://api.example.com/data');
