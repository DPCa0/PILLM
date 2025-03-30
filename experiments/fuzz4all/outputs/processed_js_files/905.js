 

const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = ({ items }) => {
   
  return items.map(({ id, name }) => ({ id, name }));
};

const performTask = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const data = await fetchData(url);

    const processedData = processData({ items: data });
    
     
    const dataSet = new Set(processedData.map(item => item.id));
    const dataMap = new Map(processedData.map(item => [item.id, item.name]));

     
    for (const [id, name] of dataMap.entries()) {
      if (dataSet.has(id)) {
        print(`ID: ${id}, Name: ${name}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

performTask();
