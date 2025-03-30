 

 
async function fetchData(url) {
   
  const response = await fetch(url);
   
  const data = await response.json();
  return data;
}

 
async function processData() {
  try {
     
    const { userId, id, title } = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
     
    print(`User ID: ${userId}, ID: ${id}, Title: "${title}"`);
  } catch (error) {
     
    console.error('Error fetching or processing data:', error);
  }
}

 
processData();
