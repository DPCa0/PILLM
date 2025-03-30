 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) resolve(`Data from ${url}`);
      else reject('URL not provided');
    }, 1000);
  });
};

 
(async () => {
  try {
     
    const [url1, url2] = ['https://api.example.com/endpoint1', 'https://api.example.com/endpoint2'];

     
    const results = await Promise.all([
      fetchData(url1),
      fetchData(url2)
    ]);

     
    const formattedResults = results.map((result, index) => `Result ${index + 1}: ${result}`);
    
     
    for (const [index, result] of formattedResults.entries()) {
      print(`Formatted ${index + 1}: ${result}`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }

   
  const config = { featureFlag: null };
  print(`Feature is ${config.featureFlag?.enabled ?? 'not enabled'}`);
})();
