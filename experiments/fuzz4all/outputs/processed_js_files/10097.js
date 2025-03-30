 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const processData = ({ id, name, attributes: { height, weight } }) => {
  return `ID: ${id}, Name: ${name}, Height: ${height}, Weight: ${weight}`;
};

const main = async () => {
  const dataMap = new Map();
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  try {
    await Promise.all(
      urls.map(async (url) => {
        const data = await fetchData(url);
        dataMap.set(data.id, processData(data));
      })
    );

    for (const [key, value] of dataMap.entries()) {
      print(`Key: ${key}, Value: ${value}`);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

main();
