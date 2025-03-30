const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
    return null;
  }
};

const processItems = (items) => {
  return items
    .filter(item => item.isActive)
    .map(({ id, name, attributes }) => ({
      id,
      name: name.toUpperCase(),
      attributeKeys: Object.keys(attributes),
    }))
    .reduce((acc, { id, name, attributeKeys }) => {
      acc[id] = { name, attributeKeys };
      return acc;
    }, {});
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(url);
  if (data) {
    const processedData = processItems(data);
    print('Processed Data:', processedData);

    const getNames = new Proxy(processedData, {
      get(target, prop) {
        return prop in target ? target[prop].name : 'Name not found';
      }
    });

    print('Name for ID 1:', getNames[1]);
    print('Name for ID 5:', getNames[5]);
    print('Name for ID 100:', getNames[100]);
  }
})();
