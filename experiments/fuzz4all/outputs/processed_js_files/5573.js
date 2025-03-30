 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async (urls) => {
  try {
    const dataPromises = urls.map(async (url) => {
      const data = await fetchData(url);
      return data;
    });

    const allData = await Promise.all(dataPromises);

    const filteredData = allData.filter((data) => data.active).map(({ id, name, active }) => ({
      id,
      name,
      isActive: active,
    }));

    print(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
];

processData(urls);
