 

 
const fetchData = (url) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: `Data from ${url}` }), 1000)
  );

 
const withLogging = (fn) => async (...args) => {
  print(`Calling function with arguments: ${args}`);
  const result = await fn(...args);
  print(`Function returned: ${result.data}`);
  return result;
};

 
const processSources = async (sources) => {
  const results = await Promise.all(
    sources.map(async (source) => {
      const response = await fetchData(source);
      return { source, data: response.data };
    })
  );

   
  const [{ data: firstSourceData }, ...rest] = results;
  print(`First source data: ${firstSourceData}`);

  return results;
};

 
const processSourcesWithLogging = withLogging(processSources);

 
processSourcesWithLogging(["https://api.example.com/1", "https://api.example.com/2"]);
