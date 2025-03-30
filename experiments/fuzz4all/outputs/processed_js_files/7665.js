 
 

async function fetchData(url) {
  try {
     
    const response = await fetch(url);

     
    if (!response.ok) throw new Error('Network response was not ok');

     
    const { json } = response;
    const data = await json();

     
    const { title, body } = data;
    print(`Title: ${title}\nBody: ${body}`);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  await fetchData(url);
})();
