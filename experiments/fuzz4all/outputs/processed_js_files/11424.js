 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = ({ userId, id, title }) => {
  return `${userId}-${id}: ${title.toUpperCase()}`;
};

const displayData = async (url) => {
  try {
    const data = await fetchData(url);
    data.forEach(item => {
      const result = processData(item);
      print(result);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2'
];

urls.forEach(url => displayData(url));
