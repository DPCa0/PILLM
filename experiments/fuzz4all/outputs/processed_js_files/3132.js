 
async function fetchDataAndProcess(urls) {
   
  const fetchSimulation = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(`Data from ${url}`);
      } else {
        reject(`Failed to fetch ${url}`);
      }
    }, 1000);
  });

  try {
     
    const dataPromises = urls.map(url => fetchSimulation(url));
    const results = await Promise.allSettled(dataPromises);

     
    const successfulResults = results
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);

    print("Successfully fetched data:");
    successfulResults.forEach(data => print(data));

     
    return successfulResults.map(data => `Processed: ${data}`);
  } catch (error) {
    console.error("Error processing fetch data", error);
  }
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
fetchDataAndProcess(urls).then(processedData => print("Final Processed Data:", processedData));
