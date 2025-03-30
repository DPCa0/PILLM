const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
  return data
    .map(({ id, name }) => ({ id, name }))
    .filter(({ id }) => id % 2 === 0)
    .reduce((acc, { id, name }) => {
      acc.push({ id, name: name.toUpperCase() });
      return acc;
    }, []);
};

const logResults = (results) => {
  results.forEach(({ id, name }) => print(`ID: ${id}, Name: ${name}`));
};

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(url);
    const processedData = processData(data);
    logResults(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
