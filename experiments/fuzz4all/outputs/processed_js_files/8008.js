const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data
    .filter(item => item.active)
    .map(({ id, name, attributes }) => ({
      id,
      name: name.toUpperCase(),
      attributes: {
        ...attributes,
        calculated: attributes.value1 * attributes.value2
      }
    }))
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
};

(async () => {
  try {
    const dataUrl = 'https://api.example.com/data';
    const data = await fetchData(dataUrl);
    const processedData = processData(data);
    print(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
