const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const manipulateData = (data) => {
  return data
    ?.map(({ id, title }) => ({ id, title: title.toUpperCase() }))
    .filter((item) => item.id % 2 === 0);
};

const logData = (data) => {
  console.group('Processed Data');
  data.forEach(({ id, title }) => print(`ID: ${id}, Title: ${title}`));
  console.groupEnd();
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(url);
  const processedData = manipulateData(rawData);
  logData(processedData);
})();
