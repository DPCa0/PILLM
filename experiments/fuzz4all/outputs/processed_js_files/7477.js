const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ users }) => {
  const data = users.map(({ id, name }) => ({ id, name: name.toUpperCase() }));
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
  return sortedData;
};

const renderData = (data) => {
  data.forEach(({ id, name }) => print(`User ID: ${id}, Name: ${name}`));
};

const main = async () => {
  try {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processedData = processData({ users: apiData });
    renderData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
