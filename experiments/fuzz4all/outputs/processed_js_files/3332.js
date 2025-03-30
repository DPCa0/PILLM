 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
function* dataProcessor(dataArray) {
  for (const data of dataArray) {
    yield processData(data);
  }
}

 
const processData = (data) => ({
  id: data.id,
  name: data.name.toUpperCase(),
});

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const rawData = await fetchData(url);

    const dataGen = dataProcessor(rawData);
    for (let processedData of dataGen) {
      print(processedData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
