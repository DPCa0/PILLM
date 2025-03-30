const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  const { info, results } = data;
  const filteredData = results
    .filter(({ name, status }) => status === 'Alive')
    .map(({ id, name, species }) => ({ id, name, species }));

  return { info, filteredData };
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const logData = debounce((data) => {
  print('Processed Data:', data);
}, 200);

(async () => {
  try {
    const url = 'https://rickandmortyapi.com/api/character/';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    logData(processedData);
  } catch (error) {
    console.error('Fetching or Processing Error:', error);
  }
})();
