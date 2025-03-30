 
async function* fetchData(urls) {
  for (let url of urls) {
    yield await fetch(url).then(response => response.json());
  }
}

function processData(data) {
   
  const [{ id, title, ...rest }, ...others] = data;
  print("First Item Processed:", { id, title });
  
   
  const merged = { ...rest, additionalInfo: "Sample Info" };
  print("Merged Data:", merged);
  
   
  const updatedData = others.map(item => ({ ...item, processed: true }));
  print("Other Items Processed:", updatedData);
  
   
  return `Processing complete for ${data.length} items.`;
}

(async () => {
   
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  
  try {
    const generator = fetchData(urls);
    const results = [];

    for await (let data of generator) {
      results.push(data);
    }

     
    const message = processData(results);
    print(message);
  } catch (error) {
     
    console.error("Error fetching data:", error);
  }
})();
