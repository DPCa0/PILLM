 
async function fetchData(urls) {
  try {
     
    const responses = await Promise.all(urls.map(url => fetch(url)));
    
     
    const jsonPromises = [...responses].map(response => response.json());
    
     
    const dataArray = await Promise.all(jsonPromises);
    
     
    const [data1, data2, data3] = dataArray;
    
     
    print(`Data from first URL: ${data1?.name || "No data"}`);
    print(`Data from second URL: ${data2?.name || "No data"}`);
    print(`Data from third URL: ${data3?.name || "No data"}`);
    
     
    const uniqueNames = new Set(dataArray.map(data => data?.name).filter(Boolean));
    print("Unique names from all data:", uniqueNames);
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
fetchData([
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
]);
