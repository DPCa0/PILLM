 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();

     
    const processedData = data.map(({ id, title, completed }) => ({
      id,
      description: `${title} - ${completed ? 'Completed' : 'Pending'}`,
    }));

     
    const uniqueIds = new Set(processedData.map(item => item.id));

     
    const handler = {
      get(target, prop) {
        print(`Accessing ${prop}`);
        return target[prop];
      },
    };

    const proxiedData = new Proxy(processedData, handler);

     
    for (const [index, { description }] of Object.entries(proxiedData)) {
      print(`Item ${index}: ${description}`);
    }

    print(`Unique IDs count: ${uniqueIds.size}`);
  } catch (error) {
    console.error('Fetch operation failed: ', error);
  }
}

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  await fetchData(apiUrl);
})();
