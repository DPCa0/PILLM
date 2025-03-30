 
async function fetchData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  try {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    
    const results = await Promise.all(fetchPromises);

    const dataMap = new Map(results.map(({ id, title }) => [id, title]));

    for (const [id, title] of dataMap) {
      print(`Post ${id}: ${title}`);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
