const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processAndMapData = (data) => {
  return data.flatMap(({ items }) => items)
             .filter(item => item.active)
             .map(({ id, name, details: { info } }) => ({
               id,
               name: name.toUpperCase(),
               info,
               processedDate: new Date().toISOString(),
             }));
};

const composeFunctions = (...fns) => (arg) =>
  fns.reduceRight((prev, fn) => fn(prev), arg);

const logData = (processedData) => {
  print('Processed Data:', JSON.stringify(processedData, null, 2));
};

(async () => {
  try {
    const pipeline = composeFunctions(logData, processAndMapData, fetchData);
    await pipeline('https://api.example.com/data');
  } catch (error) {
    console.error('Error:', error);
  }
})();
