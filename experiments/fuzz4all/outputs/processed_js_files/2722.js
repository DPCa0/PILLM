 
async function fetchDataAndProcess(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    
     
    const data = await response.json();
    
     
    const transformedData = data.map(item => {
      const { id, name, age } = item;
       
      return { ...item, details: `Name: ${name}, Age: ${age}` };
    });

     
    const aggregatedData = transformedData.reduce((acc, curr) => {
      acc[curr.id] = curr.details;
      return acc;
    }, {});

     
    print(`Processed Data: ${JSON.stringify(aggregatedData, null, 2)}`);

  } catch (error) {
     
    console.error(`Error fetching or processing data: ${error.message}`);
  }
}

 
(async () => {
  const dataUrl = 'https://api.example.com/data';
  await fetchDataAndProcess(dataUrl);
})();
