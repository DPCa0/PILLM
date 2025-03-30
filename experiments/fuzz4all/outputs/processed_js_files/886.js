 

 
const fetchDataAndProcess = async (url) => {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const processedData = new Map();
    for (const item of data) {
       
      const { id, value } = item;
      processedData.set(id, value);
    }

     
    const uniqueValues = new Set(processedData.values());

     
    return [...uniqueValues];
  } catch (error) {
     
    console.error(`Fetch operation failed: ${error.message}`);
  }
};

 
const exampleUrl = 'https://jsonplaceholder.typicode.com/posts';

 
(async () => {
  const uniqueValues = await fetchDataAndProcess(exampleUrl);
  if (uniqueValues) {
     
    for (const value of uniqueValues) {
      print(value);
    }
  }
})();
