 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const processData = async (...urls) => {
  try {
    const results = await Promise.all(urls.map(url => fetchData(url)));
    
    for (const { title, body, userId, ...rest } of results) {
      print(`User ${userId} has posted: "${title}" - ${body}`);
      print('Additional Data:', rest);
    }
  } catch (error) {
    console.error(`Failed to process data: ${error.message}`);
  }
};

 
processData(
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
);
