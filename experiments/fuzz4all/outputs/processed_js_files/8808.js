const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data
    .filter(({ active }) => active)
    .reduce((acc, { id, value }) => {
      acc[id] = (acc[id] || 0) + value;
      return acc;
    }, {});
};

const runComplexOperation = async (url) => {
  try {
    const data = await fetchData(url);

    const results = processData(data);
    print('Processed Results:', results);

    const sortedResults = Object.entries(results)
      .sort(([, aValue], [, bValue]) => bValue - aValue)
      .map(([id, value]) => ({ id, value }));

    const resultMap = new Map(sortedResults.map(item => [item.id, item.value]));
    resultMap.forEach((value, key) => print(`ID: ${key}, Value: ${value}`));
    
    return resultMap;
  } catch (error) {
    console.error('Error:', error);
  }
};

runComplexOperation('https://api.example.com/data');
