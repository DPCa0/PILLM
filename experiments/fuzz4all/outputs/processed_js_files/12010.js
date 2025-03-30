const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data.map(({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    value: value * Math.PI,
  }));
};

const displayData = (data) => {
  const container = document.querySelector('#dataContainer');
  container.innerHTML = data
    .map(({ id, name, value }) => `<div>ID: ${id}, Name: ${name}, Value: ${value.toFixed(2)}</div>`)
    .join('');
};

const executePipeline = async () => {
  const url = 'https://api.example.com/data';
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData(rawData);
    displayData(processedData);
  }
};

document.querySelector('#fetchButton').addEventListener('click', executePipeline);
