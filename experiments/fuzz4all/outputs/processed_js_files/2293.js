 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject('Error: No URL provided');
      }
    }, 1000);
  });
};

 
async function processData(urls) {
  try {
     
    const results = await Promise.all(urls.map(url => fetchData(url)));

     
    const [firstResult, ...restResults] = results.map(({ data }) => data);

    print(`First result: ${firstResult}`);
    print('Other results:', ...restResults);

     
    const transformedResults = results.map(({ data }) => data.toUpperCase());

    print('Transformed Results:', transformedResults);
  } catch (error) {
    console.error(error);
  }
}

 
processData(['https://api.example.com/resource1', 'https://api.example.com/resource2']);
