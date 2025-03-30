const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ id, name, details: { age, country } }) => ({
  id,
  displayName: `${name} (${age} years old from ${country})`,
});

const runComplexProgram = async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = data.map(processData);
    
    const filteredData = processedData.filter(({ id }) => id % 2 === 0);
    
    const enhancedData = filteredData.reduce((acc, { id, displayName }) => {
      acc[id] = { displayName, timestamp: new Date().toISOString() };
      return acc;
    }, {});
    
    console.table(enhancedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

runComplexProgram();
