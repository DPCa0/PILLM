const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return await response.json();
};

const processData = (data) => {
  const result = data.map(({ id, title }) => ({ id, title }));
  return new Proxy(result, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      }
      if (prop === 'first') {
        return target[0];
      }
      if (prop === 'last') {
        return target[target.length - 1];
      }
      return `Property "${prop}" not found.`;
    },
  });
};

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processedData = processData(data);

    print('First Entry:', processedData.first);
    print('Last Entry:', processedData.last);
    print('Non-existent Property:', processedData.nonExistent);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
