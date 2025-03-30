const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async (data) => {
  const mapData = new Map(data.map(({ id, value }) => [id, value]));
  const transformedData = Array.from(mapData.entries()).reduce(
    (acc, [id, value]) => ({
      ...acc,
      [id]: value * 2,
    }),
    {}
  );
  return new Proxy(transformedData, {
    get: (target, prop) => (prop in target ? target[prop] : `No value for ${prop}`),
  });
};

const url = 'https://api.example.com/data';
(async () => {
  try {
    const data = await fetchData(url);
    const processed = await processData(data);
    print(processed[1]);  
    print(processed.nonExistingId);  
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
