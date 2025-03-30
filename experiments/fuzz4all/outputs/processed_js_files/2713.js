 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processData = ({ results, ...metadata }) => {
  print('Metadata:', metadata);
  results.forEach(({ name: { first, last }, email }) => {
    print(`Name: ${first} ${last}, Email: ${email}`);
  });
};

const fetchAndProcessData = async () => {
  const url = 'https://randomuser.me/api/?results=5';
  const data = await fetchData(url);
  if (data) {
    processData(data);
  }
};

fetchAndProcessData();
