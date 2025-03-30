 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const processData = (data) => {
  return data.map(({ id, name, email }) => ({ id, name, email }));
};

const displayData = (data) => {
  data.forEach(({ id, name, email }) => {
    print(`ID: ${id}, Name: ${name}, Email: ${email}`);
  });
};

const main = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData(rawData);
    displayData(processedData);
  }
};

main();
