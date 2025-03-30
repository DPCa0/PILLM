 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async (endpoint) => {
  try {
    const data = await fetchData(endpoint);
    const { results, ...meta } = data;

    const processedResults = results.map(({ id, ...otherProps }) => ({
      id,
      ...otherProps,
      processedAt: new Date().toISOString(),
    }));

    return { processedResults, meta };
  } catch (error) {
    console.error('Error processing data:', error);
    return null;
  }
};

 
(async () => {
  const url = 'https://api.example.com/data';

   
  const { processedResults: results, meta: metadata } = await processData(url) || {};

   
  if (results) {
    results.forEach(({ processedAt, ...data }) => {
      print(`Processed at: ${processedAt}`, data);
    });
  }

   
  print('Metadata:', metadata?.info);
})();
