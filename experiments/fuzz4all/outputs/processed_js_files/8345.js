(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = async () => {
    try {
      const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
      const processedData = data
        .filter(({ userId }) => userId === 1)
        .map(({ id, title, body }) => ({ id, title: title.toUpperCase(), bodyLength: body.length }));

      return processedData;
    } catch (error) {
      console.error('Failed to process data:', error);
    }
  };

  const logProcessedData = async () => {
    const processedData = await processData();
    if (processedData) {
      processedData.forEach(({ id, title, bodyLength }) => {
        print(`Post ID: ${id}, Title: ${title}, Body Length: ${bodyLength}`);
      });
    }
  };

  await logProcessedData();
})();
