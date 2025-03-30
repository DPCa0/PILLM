(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = (data) => {
    return data.map(({ id, name }) => ({ id, name })).reduce((acc, curr) => {
      acc[curr.id] = curr.name.toUpperCase();
      return acc;
    }, {});
  };

  const delayedLog = (data, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        print('Processed Data:', data);
        resolve();
      }, delay);
    });
  };

  const main = async () => {
    try {
      const data = await fetchData('https://jsonplaceholder.typicode.com/users');
      const processedData = processData(data);
      await delayedLog(processedData, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  main();
})();
