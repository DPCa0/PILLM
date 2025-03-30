const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data }) => {
   
  return data.map(({ id, attributes: { name, value } }) => ({
    id,
    name,
    value: value * 2  
  }));
};

(async () => {
  try {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const data = await Promise.all(urls.map(fetchData));
    const [result1, result2] = data.map(processData);

     
    const uniqueNames = [...new Set([...result1, ...result2].map(item => item.name))];

     
    print(uniqueNames ?? 'No names found');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
