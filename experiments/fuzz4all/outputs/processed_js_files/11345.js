const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
};

const processData = async (data) => {
  const results = await Promise.all(
    data.map(async item => {
      const details = await fetchData(`https: 
      return { ...item, ...details };
    })
  );
  return results.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

(async () => {
  try {
    const data = await fetchData('https://api.example.com/items');
    const categorizedData = await processData(data);
    print(categorizedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
