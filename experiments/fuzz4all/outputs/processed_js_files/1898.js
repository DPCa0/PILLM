 
async function fetchAndProcessData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

     
    const data = await response.json();

     
    const [{ id, title, body }] = data;

     
    const postMap = new Map();
    postMap.set(id, { title, body });

     
    for (const [key, value] of postMap.entries()) {
      print(`Post ID: ${key}`);
      print(`Title: ${value.title}`);
      print(`Body: ${value.body}`);
    }

     
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
    print('Data processed successfully after a delay!');

     
    print(`Processed a total of ${data.length} posts.`);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
fetchAndProcessData();
