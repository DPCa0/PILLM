const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const processData = async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

  try {
    const results = await Promise.all(urls.map(url => fetchData(url)));
    const combinedData = results.flatMap(item => item.results);
    
    const refinedData = combinedData.reduce((acc, cur) => {
      acc[cur.category] = acc[cur.category] || [];
      acc[cur.category].push(cur);
      return acc;
    }, {});

    Object.entries(refinedData).forEach(([key, values]) => {
      print(`Category: ${key}`);
      console.table(values);
    });
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();
