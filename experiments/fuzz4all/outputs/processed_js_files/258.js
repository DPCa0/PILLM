 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve(['alpha', 'beta', 'gamma', 'delta']), 1000);
});

 
const processData = (data) => {
  return data
    .map(item => item.toUpperCase())
    .reduce((acc, current) => `${acc}-${current}`);
};

 
const main = async () => {
  print("Fetching data...");
  const data = await fetchData();
  print("Data fetched:", data);

  const processedData = processData(data);
  print("Processed Data:", processedData);

   
  const uniqueData = [...new Set(data.concat(['alpha', 'zeta']))];
  print("Unique Data:", uniqueData);

   
  print("First element (optional chaining):", uniqueData[0]?.toLowerCase() ?? 'No data');
};

 
(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error:", error);
  }
})();
