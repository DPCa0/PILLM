 
 

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
}

async function displayData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);

  if (data) {
     
    data.slice(0, 5).forEach(({ id, title, body }) => {
      print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body}\n`);
    });
  }
}

displayData();
