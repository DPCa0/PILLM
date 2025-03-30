 
(async () => {
  const simulateAsyncOperation = (value, delay) => 
    new Promise(resolve => setTimeout(() => resolve(value), delay));

  const fetchData = async () => {
    try {
      const data = await Promise.all([
        simulateAsyncOperation({ id: 1, name: 'Alice' }, 1000),
        simulateAsyncOperation({ id: 2, name: 'Bob' }, 500),
        simulateAsyncOperation({ id: 3, name: 'Charlie' }, 800)
      ]);

      const processedData = data
        .map(item => ({ ...item, name: item.name.toUpperCase() }))
        .filter(item => item.id !== 2)
        .reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {});

      print(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
})();
