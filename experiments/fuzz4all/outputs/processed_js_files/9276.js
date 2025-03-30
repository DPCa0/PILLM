 
async function fetchData() {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
      Math.random() > 0.5 
        ? resolve({ data: 'Fetched Data Successfully!' }) 
        : reject(new Error('Data Fetch Failed!'));
    }, 1000);
  });
}

 
async function* dataRetriever(maxAttempts) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      print(`Attempt ${attempt}: Trying to fetch data...`);
      const result = await fetchData();
      yield result.data;  
      break;  
    } catch (error) {
      console.error(`Attempt ${attempt}: ${error.message}`);
      if (attempt === maxAttempts) throw new Error('Max attempts reached.');
    }
  }
}

 
(async () => {
  const maxAttempts = 3;
  const retriever = dataRetriever(maxAttempts);

  try {
    for await (const data of retriever) {
      print(`Data Received: ${data}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
