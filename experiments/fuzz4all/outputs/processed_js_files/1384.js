 

const fetchData = async () => {
  const apiResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await apiResponse.json();
  return json;
};

const transformData = data =>
  data.map(({ id, title }) => ({
    id,
    title: title.toUpperCase(),
    description: `${title} - ${new Date().toLocaleDateString()}`,
  }));

const displayData = data => {
  data.forEach(({ id, title, description }) => {
    print(`Post ID: ${id}\nTitle: ${title}\nDescription: ${description}\n`);
  });
};

(async () => {
  try {
    const data = await fetchData();
    const transformedData = transformData(data);
    displayData(transformedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
