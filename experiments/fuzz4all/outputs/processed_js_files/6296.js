 
async function complexFeatureExample() {
   
  const fetchData = (id) =>
    new Promise((resolve) => setTimeout(() => resolve({ id, value: Math.random() * 100 }), 500));

   
  async function fetchAllData(ids) {
    const promises = ids.map((id) => fetchData(id));
    return Promise.all(promises);
  }

   
  async function processAndReduceData(ids) {
    const allData = await fetchAllData(ids);
    print('Fetched Data:', allData);

     
    const transformedData = allData.map((item) => ({ ...item, value: item.value * 2 }));

     
    const aggregatedValue = transformedData.reduce((acc, item) => acc + item.value, 0);

    return aggregatedValue;
  }

   
  const ids = Array.from({ length: 5 }, (_, i) => i + 1);

  try {
    const result = await processAndReduceData(ids);
    print('Aggregated Result:', result);
  } catch (error) {
    console.error('Error during processing:', error);
  }
}

complexFeatureExample();
