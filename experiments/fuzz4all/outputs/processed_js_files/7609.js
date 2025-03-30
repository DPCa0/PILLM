 
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

async function main() {
  try {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(dataUrl);

    const { title, body, ...rest } = data[0];  
    print(`Title: ${title}\nBody: ${body}`);

    const ids = [...range(1, 5)];  
    print(`Generated IDs: ${ids.join(', ')}`);
    
    const promises = ids.map(id => fetchData(`${dataUrl}/${id}`));
    const results = await Promise.all(promises);

    results.forEach(({ id, title }) => {
      print(`Fetched Post ${id}: ${title}`);
    });
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

main();
