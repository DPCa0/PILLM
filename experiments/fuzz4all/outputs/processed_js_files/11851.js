const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const processData = (data) => {
  return data
    .filter(item => item.active)
    .map(({ id, name, details: { info } }) => ({ id, name, info }))
    .reduce((acc, { id, name, info }) => ({
      ...acc,
      [id]: { name, info }
    }), {});
};

(async () => {
  const url = 'https://api.example.com/data';
  try {
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    print('Processed Data:', processedData);

    const [firstKey, ...otherKeys] = Object.keys(processedData);
    print('First processed item:', processedData[firstKey]);

    for (const key of otherKeys) {
      print(`Processed item ${key}:`, processedData[key]);
    }
  } catch (error) {
    console.error('Error in data processing:', error);
  }
})();
