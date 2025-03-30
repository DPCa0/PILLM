const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching error:', error);
    return null;
  }
};

const processData = async (url) => {
  const data = await fetchData(url);
  if (!data) return;

  const filteredData = data
    .filter(item => item.value > 10)
    .map(({ id, value }) => ({ id, value }))
    .reduce((acc, { id, value }) => {
      acc[id] = value;
      return acc;
    }, {});

  print('Processed Data:', filteredData);
};

const debouncedProcessData = (() => {
  let timeout;
  return (url, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => processData(url), delay);
  };
})();

const url = 'https://api.example.com/data';
debouncedProcessData(url, 500);

 
const targetObject = {};
const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return prop in obj ? obj[prop] : 37;
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);
proxy.newProp = 42;   
print(proxy.newProp);   
