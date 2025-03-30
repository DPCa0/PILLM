 
async function fetchDataAndProcess() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
     
    let data = (await response.json())?.slice(0, 5) ?? [];
    
     
    const processedData = data
      .filter(post => post.userId === 1)  
      .map(({ id, title }) => ({ id, title: title.toUpperCase() }))  
      .reduce((acc, { id, title }) => {
        acc[id] = title;  
        return acc;
      }, {});
    
     
    print(`Processed Data: ${JSON.stringify(processedData, null, 2)}`);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
(async () => {
  await fetchDataAndProcess();
})();
