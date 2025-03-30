 
 

 

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

async function processData() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  try {
    const users = await fetchData(apiUrl);

     
    users.forEach(({ id, name, email }) => {
      print(`ID: ${id}, Name: ${name}, Email: ${email}`);
    });
  } catch (error) {
    console.error('Processing failed:', error);
  }
}

 
(async () => {
  await processData();
})();
