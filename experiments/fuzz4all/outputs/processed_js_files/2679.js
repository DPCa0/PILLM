(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

   
  const processData = (data) => {
    const uniqueNamesSet = new Set(data.map(({ name }) => name));
    const nameLengthMap = new Map();

    for (let name of uniqueNamesSet) {
      nameLengthMap.set(name, name.length);
    }

    return [...nameLengthMap.entries()].sort((a, b) => a[1] - b[1]);
  };

   
  const { logResults } = await import('./logResults.js');

   
  const data = await fetchData('https://jsonplaceholder.typicode.com/users');
  if (data) {
    const results = processData(data);
    logResults(results);
  }
})();

 
export const logResults = (results) => {
  print('Sorted name lengths:');
  results.forEach(([name, length]) => {
    print(`${name}: ${length}`);
  });
};
