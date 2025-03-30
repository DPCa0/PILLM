 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

 
const processData = (data) => {
  return data
    .filter(({ completed }) => completed)  
    .map(({ id, title }) => ({ taskId: id, description: title }))  
    .reduce((acc, task) => {
      acc[task.taskId] = task.description;
      return acc;
    }, {});  
};

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
    const processedData = processData(data);
    
     
    print(`Processed Data:\n${JSON.stringify(processedData, null, 2)}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
})();
