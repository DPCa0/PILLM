 

const getJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = async () => {
  try {
    const data = await Promise.all([
      getJSON('https://api.example.com/resource1'),
      getJSON('https://api.example.com/resource2')
    ]);

     
    const [{ result1 }, { result2 }] = data;
    
     
    const combinedResults = { ...result1, ...result2 };

     
    const uniqueValues = [...new Set(Object.values(combinedResults))];

    print(uniqueValues);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

processData();
