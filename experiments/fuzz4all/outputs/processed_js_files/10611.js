const complexFeatureDemo = async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  };

   
  const processMultipleDataSources = async (urls) => {
    try {
      const data = await Promise.all(urls.map(fetchData));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

   
  const printResults = ({ results = [], title = "Default Title" }) => {
    print(`-- ${title} --`);
    results.forEach(({ name, height }) => print(`Name: ${name}, Height: ${height}`));
  };

   
  const processResults = (rawData) => {
    const uniqueResults = new Set();
    const resultMap = new Map();
    
    rawData.flat().forEach(item => {
      if (!uniqueResults.has(item.name)) {
        uniqueResults.add(item.name);
        resultMap.set(item.name, item);
      }
    });
    
    return [...resultMap.values()];
  };

   
  const urls = [
    'https://swapi.dev/api/people/?page=1',
    'https://swapi.dev/api/people/?page=2'
  ];
  
   
  const rawData = await processMultipleDataSources(urls);
  if (rawData) {
    const processedData = processResults(rawData.map(data => data.results));
    printResults({ results: processedData, title: "Star Wars Characters" });
  }
};

 
complexFeatureDemo().catch(console.error);
