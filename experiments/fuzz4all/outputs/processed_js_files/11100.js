 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const data = await fetchData(url);
    
     
    const [firstPost] = data.map(({ id, title, body }) => ({
      id, title, body
    }));

     
    const key = 'firstPost';
    const postsObj = { [key]: firstPost };

     
    print(`Fetched Post:\nID: ${postsObj.firstPost.id}\nTitle: ${postsObj.firstPost.title}\nBody: ${postsObj.firstPost.body}`);
    
     
    for (const [key, value] of Object.entries(postsObj.firstPost)) {
      print(`${key}: ${value}`);
    }
  } catch (error) {
     
    console.error(`Error fetching data: ${error.message}`);
  }
})();
