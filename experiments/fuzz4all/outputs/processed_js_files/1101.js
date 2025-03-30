const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const processData = (data) => {
  const result = data.map(({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    doubledValue: value * 2,
  }));
  return result.filter(({ doubledValue }) => doubledValue > 50);
};

const displayData = (data) => {
  data.forEach(({ id, name, doubledValue }) => {
    print(`ID: ${id}, Name: ${name}, Doubled Value: ${doubledValue}`);
  });
};

const main = async () => {
  try {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    const processedData = processData(data);
    displayData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();

 
const target = { message: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => {
    print(`Property ${prop} accessed.`);
    return prop in obj ? obj[prop] : `Property ${prop} does not exist.`;
  },
};

const proxy = new Proxy(target, handler);
print(proxy.message);
print(proxy.nonExistent);
