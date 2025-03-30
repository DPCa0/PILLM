 
 

async function fetchData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
     
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
}

async function displayData() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
   
  const posts = await fetchData(apiUrl);

  if (posts) {
     
    const [{ title, body }] = posts;

     
    print(`Title: ${title}\nBody: ${body}`);
  }
}

displayData();

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runDelayedTasks() {
  print('Task 1: Starting');
  await delay(1000);  
  print('Task 1: Completed');

  print('Task 2: Starting');
  await delay(1000);  
  print('Task 2: Completed');
}

runDelayedTasks();
